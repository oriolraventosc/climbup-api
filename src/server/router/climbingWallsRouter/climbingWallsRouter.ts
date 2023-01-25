import routes from "../../routes/routes.js";
import express from "express";
import {
  loadAllClimbingWalls,
  loadClimbingWall,
} from "../../controllers/climbingWallsController/climbingWallsController.js";

// eslint-disable-next-line new-cap
const climbingWallsRouter = express.Router();

climbingWallsRouter.get(routes.loadAllClimbingWalls, loadAllClimbingWalls);
climbingWallsRouter.get(routes.loadClimbingWall, loadClimbingWall);

export default climbingWallsRouter;
