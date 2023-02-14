import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import { WatchTimeInstance } from "./watchTime";

export interface EpisodeAttributes {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
  courseId: number;
}
export interface EpisodeCreationAttributes
  extends Optional<EpisodeAttributes, "id" | "videoUrl" | "secondsLong"> {}

export interface EpisodeInstance
  extends Model<EpisodeAttributes, EpisodeCreationAttributes>,
    EpisodeAttributes {
  watchTime?: WatchTimeInstance;
}

export const Episode = sequelize.define<EpisodeInstance, EpisodeAttributes>(
  "Episode",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    synopsis: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    order: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    secondsLong: {
      type: DataTypes.INTEGER,
    },
    courseId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "courses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  }
);
