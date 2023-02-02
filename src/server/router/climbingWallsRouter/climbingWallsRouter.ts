import routes from "../../routes/routes.js";
import express from "express";
import {
  loadAllClimbingWalls,
  loadUserClimbingWalls,
  loadClimbingWall,
} from "../../controllers/climbingWallsController/climbingWallsController.js";
import auth from "../../middlewares/Auth/Auth.js";

// eslint-disable-next-line new-cap
const climbingWallsRouter = express.Router();

climbingWallsRouter.get(routes.loadAllClimbingWalls, loadAllClimbingWalls);
climbingWallsRouter.get(routes.loadClimbingWall, loadClimbingWall);
climbingWallsRouter.get(
  routes.loadAllPrivateClimbingWalls,
  auth,
  loadUserClimbingWalls
);

export default climbingWallsRouter;
