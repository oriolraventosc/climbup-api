import type { Request, Response, NextFunction } from "express";
import enviroment from "../../../loadEnviroment";
import User from "../../../database/models/contact/contact";
import jwt from "jsonwebtoken";
import {
  userMock,
  userWithoutEmailMock,
  userWithoutPasswordMock,
} from "../../../mocks/users/user";
import CustomError from "../../customError/customError";
import { login, register } from "./usersController";
import bcrypt from "bcrypt";

const tokenPayload = {};

const token = jwt.sign(tokenPayload, enviroment.jwtSecretKey);

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
      const hashedPassword = await bcrypt.hash(userMock.password, 10);
      User.create = jest
        .fn()
        .mockReturnValue({ ...userMock, password: hashedPassword });
      await register(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
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

  describe("When it is invoked with the login method", () => {
    test("Then it should call it's method with a status 200 and the token as the json", async () => {
      const status = 201;

      const req: Partial<Request> = {
        body: { email: "admin@gmail.com", password: "admin" },
      };

      User.findOne = jest.fn().mockReturnValue(userMock);
      jwt.sign = jest.fn().mockReturnValueOnce(token);
      bcrypt.compare = jest.fn().mockReturnValueOnce(true);

      await login(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenLastCalledWith(status);
    });

    test("Then when wrong credentials it should call it's next method with a custom error", async () => {
      const customError = new CustomError(
        "Wrong credentials!",
        401,
        "Wrong credentials!"
      );
      const req: Partial<Request> = {
        body: { email: "asdaf", password: "asdaf" },
      };

      User.findOne = jest.fn().mockReturnValueOnce(null);
      await login(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });

    test("Then it should respond with a 500 status when an internal server error happens", async () => {
      const customError = new CustomError(
        "An error ocurred while logging in!",
        500,
        "An error ocurred while logging in!"
      );

      const req: Partial<Request> = {
        body: { email: "admin@gmail.com", password: "admin" },
      };

      User.findOne = jest.fn().mockRejectedValue(customError);
      await login(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
