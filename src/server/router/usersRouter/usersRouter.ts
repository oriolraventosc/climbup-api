import express from "express";
import routes from "../../routes/routes.js";
import { validate } from "express-validation";
import userSchema from "../../schema/userSchema.js";
import {
  login,
  register,
} from "../../controllers/usersController/usersController.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post(routes.register, validate(userSchema), register);

usersRouter.post(routes.login, validate(userSchema), login);

export default usersRouter;
