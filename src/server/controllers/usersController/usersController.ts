import type { Request, Response, NextFunction } from "express";
import type { UserStructure, UserTokenPayload } from "../../../types/types.js";
import CustomError from "../../customError/customError.js";
import bcrypt from "bcrypt";
import User from "../../../database/models/contact/contact.js";
import debugCreator from "debug";
import routes from "../../routes/routes.js";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import enviroment from "../../../loadEnviroment.js";

const debug = debugCreator(`${routes.debug}users controller:`);

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body as UserStructure;
  try {
    if (!email || !password) {
      const error = new CustomError(
        "Missing credentials",
        401,
        "Missing credentials"
      );
      next(error);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ newUser });
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as UserStructure;
  if (!email || !password) {
    const customError = new CustomError(
      "Missing credentials",
      401,
      "Missing credentials"
    );
    next(customError);
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const customError = new CustomError(
        "Wrong credentials!",
        401,
        "Wrong credentials!"
      );
      next(customError);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        "Wrong credentials!",
        401,
        "Wrong credentials!"
      );
      next(customError);
      return;
    }

    const tokenPayload: UserTokenPayload = {
      id: user._id.toString(),
      email,
    };
    const accessToken = jwt.sign(tokenPayload, enviroment.jwtSecretKey, {
      expiresIn: "3d",
    });
    res.status(200).json({ accessToken, id: user._id.toString() });
  } catch {
    const error = new CustomError(
      "An error ocurred while logging in!",
      500,
      "An error ocurred while logging in!"
    );
    next(error);
  }
};
