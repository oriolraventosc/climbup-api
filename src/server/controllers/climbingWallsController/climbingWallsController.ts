import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import debugCreator from "debug";
import ClimbingWall from "../../../database/models/climbingWalls/climbingWalls.js";
import CustomError from "../../customError/customError.js";
import routes from "../../routes/routes.js";
import pagination from "../../../utils/pagination.js";

const debug = debugCreator(`${routes.debug}climbingWalls controller:`);

// eslint-disable-next-line complexity
export const loadAllClimbingWalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { activity, installation, location, limit } = req.query;
  const limitNumber = limit || 6;
  try {
    if (activity === "" && installation !== "" && location === "") {
      const climbingWalls = await ClimbingWall.find({
        installations: installation,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation === "" && location === "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation !== "" && location === "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
        installations: installation,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity === "" && installation === "" && location === "") {
      const climbingWalls = await ClimbingWall.find();
      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity === "" && installation !== "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        installations: installation,
        city: location,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation === "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
        city: location,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation !== "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
        installations: installation,
        city: location,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity === "" && installation === "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        city: location,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: [],
        climbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }
  } catch {
    const error = new CustomError(
      "We couldn't load any climbing wall due to an internal server error",
      500,
      "We couldn't load any climbing wall due to an internal server error"
    );
    next(error);
  }
};

export const loadClimbingWall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    const error = new CustomError(
      "There is no climbing wall",
      400,
      "There is no climbing wall"
    );
    next(error);
  }

  try {
    const climbingWall = await ClimbingWall.findById(id);
    res
      .status(200)
      .json({ privateClimbingWalls: [], climbingWalls: [], climbingWall });
    debug(chalk.blueBright(`${climbingWall.name} climbing wall found!`));
  } catch {
    const error = new CustomError(
      "We couldn't find any climbing wall due to an internal server error",
      500,
      "We couldn't find any climbing wall due to an internal server error"
    );
    next(error);
  }
};

// eslint-disable-next-line complexity
export const loadUserClimbingWalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { activity, installation, location, limit } = req.query;

  try {
    const limitNumber = limit || 6;
    if (activity === "" && installation !== "" && location === "") {
      const climbingWalls = await ClimbingWall.find({
        installations: installation,
        owner: userId,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation === "" && location === "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
        owner: userId,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation !== "" && location === "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
        installations: installation,
        owner: userId,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity === "" && installation === "" && location === "") {
      const climbingWalls = await ClimbingWall.find({ owner: userId });
      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity === "" && installation !== "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        installations: installation,
        city: location,
        owner: userId,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation === "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        owner: userId,
        activities: activity,
        city: location,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity !== "" && installation !== "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        activities: activity,
        installations: installation,
        city: location,
        owner: userId,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }

    if (activity === "" && installation === "" && location !== "") {
      const climbingWalls = await ClimbingWall.find({
        city: location,
        owner: userId,
      });

      if (!climbingWalls) {
        res.status(200).json({
          privateClimbingWalls: [],
          climbingWalls: [],
          climbingWall: {},
        });
        debug(chalk.blueBright(`0 climbing walls found!`));
        return;
      }

      res.status(200).json({
        privateClimbingWalls: pagination(climbingWalls, Number(limitNumber)),
        climbingWalls: [],
        climbingWall: {},
      });
      debug(chalk.blueBright(`${climbingWalls.length} climbing walls found!`));
    }
  } catch {
    const error = new CustomError(
      "Error loading your climbing walls",
      500,
      "Error loading your climbing walls"
    );
    next(error);
  }
};
