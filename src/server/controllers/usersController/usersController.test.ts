import type { Request, Response, NextFunction } from "express";
import User from "../../../database/models/contact/contact";
import {
  userMock,
  userWithoutEmailMock,
  userWithoutNameMock,
  userWithoutPasswordMock,
} from "../../../mocks/users/user";
import CustomError from "../../customError/customError";
import { register } from "./usersController";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given the users controller", () => {
  describe("When it is invoked with the register method", () => {
    test("Then it should return a 200 status", async () => {
      const status = 201;
      const req: Partial<Request> = {
        body: userMock,
      };

      User.create = jest.fn().mockReturnValue(userMock);
      await register(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call it's next method if there is no name", async () => {
      const error = new CustomError(
        "Missing credentials",
        401,
        "Missing credentials"
      );
      const req: Partial<Request> = {
        body: userWithoutNameMock,
      };

      User.create = jest.fn().mockRejectedValue(error);
      await register(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call it's next method if there is no email", async () => {
      const error = new CustomError(
        "Missing credentials",
        401,
        "Missing credentials"
      );
      const req: Partial<Request> = {
        body: userWithoutEmailMock,
      };

      User.create = jest.fn().mockRejectedValue(error);
      await register(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call it's next method if there is no password", async () => {
      const error = new CustomError(
        "Missing credentials",
        401,
        "Missing credentials"
      );
      const req: Partial<Request> = {
        body: userWithoutPasswordMock,
      };

      User.create = jest.fn().mockRejectedValue(error);
      await register(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call it's next method if an internal server error happens", async () => {
      const error = new CustomError(
        "We couldn't create the user!",
        500,
        "We couldn't create the user!"
      );
      const req: Partial<Request> = {
        body: userMock,
      };

      User.create = jest.fn().mockRejectedValue(error);
      await register(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
