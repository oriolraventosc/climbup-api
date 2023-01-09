import morgan from "morgan";
import express from "express";
import { generalError, endpointUnknown } from "./middlewares/error.js";
import routes from "./routes/routes.js";
import climbingWallsRouter from "./router/climbingWallsRouter/climbingWallsRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use(routes.climbingWalls, climbingWallsRouter);

app.use(endpointUnknown);

app.use(generalError);

export default app;
