import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface Like {
  userId: number;
  courseId: number;
}
export interface LikeInstace extends Model<Like>, Like {}

export const Like = sequelize.define<LikeInstace, Like>("Like", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
