import enviroment from "../../loadEnviroment.js";
import chalk from "chalk";
import debugCreator from "debug";
import type { NextFunction, Request, Response } from "express";
import type CustomError from "../customError/customError.js";
import { ValidationError } from "express-validation";

const debug = debugCreator(`${enviroment.debug}middlewears`);

export const endpointUnknown = (req: Request, res: Response) => {
  res.status(404).json({ message: "Error not found the endpoint" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red(`Error ${error.message}`));
  const status = error.state ?? 500;
  let message = error.customMessage || "Opps...General Error";

  if (error instanceof ValidationError) {
    if (error.details.body) {
      message = error.details.body.map((error) => error.message).join("");
    }
  }

  res.status(status).json({ error: message });
  next();
};
