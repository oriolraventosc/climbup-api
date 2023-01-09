import type { Request, Response, NextFunction } from "express";
import ClimbingWall from "../../../database/models/climbingWalls/climbingWalls";
import climbingWallMock from "../../../mocks/climbingWalls/climbingWall";
import CustomError from "../../customError/customError";
import { loadAllClimbingWalls } from "./climbingWallsController";

const next = jest.fn();
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a loadAllClimbingWalls controller", () => {
  describe("When it has 1 climbing wall", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {};
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it has 0 climbing walls", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {};
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue([]);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When a internal server error happens", () => {
    test("Then it should call it's next method with an error", async () => {
      const req: Partial<Request> = {};
      const error = new CustomError(
        "We couldn't load any climbing wall due to an internal server error",
        500,
        "We couldn't load any climbing wall due to an internal server error"
      );

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
