import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import debugCreator from "debug";
import ClimbingWall from "../../../database/models/climbingWalls/climbingWalls.js";
import CustomError from "../../customError/customError.js";
import routes from "../../routes/routes.js";

const debug = debugCreator(`${routes.debug}climbingWalls controller:`);

export const loadAllClimbingWalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const climbingWalls = await ClimbingWall.find();

    if (climbingWalls.length < 1) {
      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
      return;
    }

    res
      .status(200)
      .json({ privateClimbingWalls: [], climbingWalls, climbingWall: {} });
    debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
  } catch {
    const error = new CustomError(
      "We couldn't load any climbing wall due to an internal server error",
      500,
      "We couldn't load any climbing wall due to an internal server error"
    );
    next(error);
  }
};
