import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { categoryResourceOptions } from "./category";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: Course,
    options: categoryResourceOptions,
  },
];
