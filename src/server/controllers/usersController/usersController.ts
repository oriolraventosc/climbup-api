import type { Request, Response, NextFunction } from "express";
import type { UserStructure } from "../../../types/types.js";
import CustomError from "../../customError/customError.js";
import bcrypt from "bcrypt";
import User from "../../../database/models/contact/contact.js";
import debugCreator from "debug";
import routes from "../../routes/routes.js";
import chalk from "chalk";

const debug = debugCreator(`${routes.debug}users controller:`);

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body as UserStructure;
  try {
    if (!email || !name || !password) {
      const error = new CustomError(
        "Missing credentials",
        401,
        "Missing credentials"
      );
      next(error);
      return;
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const userToAdd = { name, email, password: hashedPassword };

    await User.create(userToAdd);

    res.status(201).json(userToAdd);
    debug(chalk.blueBright(`User ${name} created succesfully!`));
  } catch {
    const error = new CustomError(
      "We couldn't create the user!",
      500,
      "We couldn't create the user!"
    );
    next(error);
  }
};
