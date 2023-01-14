import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/index";
import mongoose from "mongoose";
import app from "../../app";
import CustomError from "../../customError/customError";
import User from "../../../database/models/contact/contact";
import bcrypt from "bcrypt";
import {
  userMock,
  userWithoutEmailMock,
  userWithoutPasswordMock,
} from "../../../mocks/users/user";
import routes from "../../routes/routes";
import type { Request, Response, NextFunction } from "express";
import { register } from "../../controllers/usersController/usersController";

const next = jest.fn();

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

let server: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a POST '/register' endpoint", () => {
  describe("When it receives a request with a valid user data", () => {
    test("Then it should return an object with the properties 'name, email, password'", async () => {
      const status = 201;

      const hashedPassword = await bcrypt.hash(userMock.password, 10);
      User.create = jest
        .fn()
        .mockReturnValue({ ...userMock, password: hashedPassword });
      const response = await request(app)
        .post(`${routes.users}${routes.register}`)
        .send(userMock)
        .expect(status);

      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("password");
    });
  });

  describe("When it receives a request without a email", () => {
    test("Then it should return an object with the property 'error'", async () => {
      const status = 500;
      const error = new CustomError(
        '"email" is not allowed to be empty',
        500,
        '"email" is not allowed to be empty'
      );

      User.create = jest.fn().mockRejectedValue(error);
      const response = await request(app)
        .post(`${routes.users}${routes.register}`)
        .send(userWithoutEmailMock)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("When it receives a request without a password", () => {
    test("Then it should return an object with the property 'error'", async () => {
      const status = 500;
      const error = new CustomError(
        '"password" is not allowed to be empty',
        500,
        '"password" is not allowed to be empty'
      );

      User.create = jest.fn().mockRejectedValue(error);
      const response = await request(app)
        .post(`${routes.users}${routes.register}`)
        .send(userWithoutPasswordMock)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("When it receives a request and an internal server error happens", () => {
    test("Then it should return an object with the property 'error'", async () => {
      const status = 500;
      const error = new CustomError(
        "We couldn't create the user!",
        500,
        "We couldn't create the user!"
      );

      User.create = jest.fn().mockRejectedValue(error);
      const response = await request(app)
        .post(`${routes.users}${routes.register}`)
        .send(userMock)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });
});

describe("Given a POST '/login' endpoint", () => {
  describe("When it receives a request with a valid user", () => {
    test("Then it should return an object with a property 'accessToken'", async () => {
      const userdata = {
        email: "user@gmail.com",
        password: "climber",
      };
      const req: Partial<Request> = {
        body: userdata,
      };
      await register(req as Request, res as Response, next as NextFunction);
      const status = 200;
      const response = await request(app)
        .post(`${routes.users}${routes.login}`)
        .send(userdata)
        .expect(status);

      expect(response.body).toHaveProperty("accessToken");
    });

    test("Then it should return an object with a property 'error'", async () => {
      const userdata = {
        email: "user@gmail.com",
        password: "climber",
      };

      const status = 401;
      const response = await request(app)
        .post(`${routes.users}${routes.login}`)
        .send(userdata)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });

    test("Then it should return an object with a property 'error'", async () => {
      const userdata = {
        email: "user@gmail.com",
        password: "climber",
      };
      const error = new CustomError(
        "An error ocurred while logging in!",
        500,
        "An error ocurred while logging in!"
      );
      const status = 500;
      User.findOne = jest.fn().mockRejectedValue(error);
      const response = await request(app)
        .post(`${routes.users}${routes.login}`)
        .send(userdata)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });
});
