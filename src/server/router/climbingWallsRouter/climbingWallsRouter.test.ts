import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/index";
import mongoose from "mongoose";
import app from "../../app";
import CustomError from "../../customError/customError";
import ClimbingWall from "../../../database/models/climbingWalls/climbingWalls";
import climbingWallMock from "../../../mocks/climbingWalls/climbingWall";
import routes from "../../routes/routes";
import enviroment from "../../../loadEnviroment";
import jwt from "jsonwebtoken";

let server: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

beforeEach(async () => {
  await ClimbingWall.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

const userId = 12345;

const userToken = jwt.sign(
  { email: "admin", id: userId.toString() },
  enviroment.jwtSecretKey
);

describe("Given a GET '/loadAllClimbingWalls' endpoint", () => {
  describe("When it receives a request and there is 1 climbing wall in the data base", () => {
    test("Then it should return an object with a climbingWalls property'", async () => {
      const status = 200;
      ClimbingWall.find = jest.fn().mockReturnValue([climbingWallMock]);

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadAllClimbingWalls}`)
        .query({ installation: "", activity: "", location: "", limit: 6 })
        .expect(status);

      expect(response.body).toHaveProperty("climbingWalls", [climbingWallMock]);
    });
  });

  describe("When it receives a request and there is 0 climbing wall in the data base", () => {
    test("Then it should return an empty climbingWalls property'", async () => {
      const status = 200;
      ClimbingWall.find = jest.fn().mockReturnValue([]);

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadAllClimbingWalls}`)
        .query({ installation: "", activity: "", location: "", limit: 6 })
        .expect(status);

      expect(response.body).toHaveProperty("climbingWalls", []);
    });
  });

  describe("When it receives a request and an internal server error happens", () => {
    test("Then it should return an empty climbingWalls property'", async () => {
      const status = 500;
      const error = new CustomError(
        "We couldn't load any climbing wall due to an internal server error",
        500,
        "We couldn't load any climbing wall due to an internal server error"
      );

      ClimbingWall.find = jest.fn().mockRejectedValue(error);

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadAllClimbingWalls}`)
        .query({ installation: "", activity: "", location: "", limit: 6 })
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });
});

describe("Given a GET '/loadClimbingWall' endpoint", () => {
  describe("When it receives a request with a id param '12345678910'", () => {
    test("Then it should return an object with a property climbingWall", async () => {
      const status = 200;
      ClimbingWall.findById = jest.fn().mockReturnValue({
        privateClimbingWalls: [],
        climbingWalls: [],
        climbingWall: climbingWallMock,
      });

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadClimbingWall}`)
        .expect(status);

      expect(response.body).toHaveProperty("climbingWall");
    });
  });

  describe("When it receives a request without a id param", () => {
    test("Then it should return an object with a property climbingWall", async () => {
      const status = 500;
      const error = new CustomError(
        "We couldn't find any climbing wall due to an internal server error",
        500,
        "We couldn't find any climbing wall due to an internal server error"
      );
      ClimbingWall.findById = jest.fn().mockRejectedValue(error);

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadClimbingWall}`)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });
});

describe("Given a GET 'loadUserClimbingWalls endpoint'", () => {
  describe("When it receives a request and an internal server error happens", () => {
    test("Then it should return an empty climbingWalls property'", async () => {
      const status = 500;
      const error = new CustomError(
        "Error loading your climbing walls",
        500,
        "Error loading your climbing walls"
      );

      ClimbingWall.find = jest.fn().mockRejectedValue(error);

      const response = await request(app)
        .get(
          `/climbingWalls/privateClimbingWalls/63c1aaf5a6eb84d57beb72b7?limit=6&activity&installation&location`
        )
        .set("Authorization", `Bearer ${userToken}`)
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("When it receives a request with a userId '63c1aaf5a6eb84d57beb72b7'", () => {
    test("Then it should return an object with the property 'privateClimbingWalls'", async () => {
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue([climbingWallMock]);

      const response = await request(app)
        .get(
          `/climbingWalls/privateClimbingWalls/63c1aaf5a6eb84d57beb72b7?limit=6&activity&installation&location`
        )
        .set("Authorization", `Bearer ${userToken}`)
        .expect(status);

      expect(response.body).toHaveProperty("privateClimbingWalls", [
        climbingWallMock,
      ]);
    });

    test("Then if there is no climbing wall it should return an object with the property 'privateClimbingWalls' with the value []", async () => {
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue([]);

      const response = await request(app)
        .get(
          `/climbingWalls/privateClimbingWalls/63c1aaf5a6eb84d57beb72b7?limit=6&activity&installation&location`
        )
        .set("Authorization", `Bearer ${userToken}`)
        .expect(status);

      expect(response.body).toHaveProperty("privateClimbingWalls", []);
    });
  });
});
