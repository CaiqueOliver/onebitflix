import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { episodeService } from "../services/episodeService";

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    try {
      if (typeof videoUrl !== "string")
        throw new Error("videoUrl must be a string");
      const range = req.headers.range;
      episodeService.streamEpisodeToResponde(res, videoUrl, range);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = req.params.id;
    try {
      const watchTime = await episodeService.getWatchTime(
        userId,
        Number(episodeId)
      );
      return res.json(watchTime);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = Number(req.params.id);
    const { seconds } = req.body;
    try {
      const watchTime = await episodeService.setWatchTime({
        episodeId,
        userId,
        seconds,
      });
      return res.json(watchTime);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
