import { updateRecord } from "adminjs";
import { User } from "../models";
import { EpisodeInstance } from "../models/episode";
import { UserCreationAttributes } from "../models/user";

function filterLastEpisodes(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];
  const lastEpisodes = episodes.reduce((acc, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      acc.push(episode);
      return acc;
    }
    const episodeFromSameCourse = acc.find(
      (ep) => ep.courseId === episode.courseId
    );
    if (episodeFromSameCourse!.order > episode.order) return acc;

    const listWithoutEpisodeFromSameCourse = acc.filter(
      (ep) => ep.courseId !== episode.courseId
    );
    listWithoutEpisodeFromSameCourse.push(episode);
    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },

  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });
    return updatedUsers[0];
  },

  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      { password },
      {
        where: { id },
        returning: true,
        individualHooks: true,
      }
    );
    return updatedUsers[0];
  },

  getKeepWatchingList: async (id: number) => {
    const userWatching = await User.findByPk(id, {
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
          ["course_id", "courseId"],
        ],
        include: [
          {
            association: "Course",
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
            as: "course",
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });
    if (!userWatching) throw new Error("User not found");
    const keepWatchingList = filterLastEpisodes(userWatching.Episodes!);
    // @ts-ignore
    keepWatchingList.sort((a, b) =>
      a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1
    );
    return keepWatchingList;
  },
};
