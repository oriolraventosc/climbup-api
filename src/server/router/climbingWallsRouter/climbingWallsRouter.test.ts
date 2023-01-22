import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import connectToDatabase from "../../../database/index";
import mongoose from "mongoose";
import app from "../../app";
import CustomError from "../../customError/customError";
import ClimbingWall from "../../../database/models/climbingWalls/climbingWalls";
import climbingWallMock from "../../../mocks/climbingWalls/climbingWall";
import routes from "../../routes/routes";

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

describe("Given a GET '/loadAllClimbingWalls' endpoint", () => {
  describe("When it receives a request and there is 1 climbing wall in the data base", () => {
    test("Then it should return 'Drac de Pedra'", async () => {
      const status = 200;
      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadAllClimbingWalls}`)
        .query({ installation: "", activity: "", location: "" })
        .expect(status);

      expect(response.body).toHaveProperty("climbingWalls");
    });
  });

  describe("When it receives a request and there is 0 climbing wall in the data base", () => {
    test("Then it should return an empty climbingWalls property'", async () => {
      const status = 200;
      ClimbingWall.find = jest.fn().mockReturnValue([]);

      const response = await request(app)
        .get(`${routes.climbingWalls}${routes.loadAllClimbingWalls}`)
        .query({ installation: "", activity: "", location: "" })
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
        .query({ installation: "", activity: "", location: "" })
        .expect(status);

      expect(response.body).toHaveProperty("error");
    });
  });
});
