import express from "express";
import { categoriesCcntroller } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
const router = express.Router();
router.get("/categories", categoriesCcntroller.index);
router.get("/categories/:id", categoriesCcntroller.show);

router.get("/courses/featured", coursesController.featured);
router.get("/courses/search", coursesController.search);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/:id", coursesController.show);
router.get("/episodes/stream", episodesController.stream);

export { router };
