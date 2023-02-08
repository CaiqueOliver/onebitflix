import express from "express";
import { categoriesCcntroller } from "./controllers/categoriesController";
const router = express.Router();
router.get("/categories", categoriesCcntroller.index);
router.get("/categories/:id", categoriesCcntroller.show);

export { router };
