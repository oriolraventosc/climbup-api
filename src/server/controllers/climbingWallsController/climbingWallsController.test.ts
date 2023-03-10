import type { Request, Response, NextFunction } from "express";
import ClimbingWall from "../../../database/models/climbingWalls/climbingWalls";
import climbingWallMock from "../../../mocks/climbingWalls/climbingWall";
import CustomError from "../../customError/customError";
import {
  loadAllClimbingWalls,
  loadClimbingWall,
  loadUserClimbingWalls,
} from "./climbingWallsController";

const next = jest.fn();
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a loadAllClimbingWalls controller", () => {
  describe("When it has 1 climbing wall", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          activity: "",
          location: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "",
          location: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          location: "Rub??",
          installation: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          location: "Rub??",
          activity: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "Rub??",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: { location: "Rub??", activity: "", installation: "", limit: "6" },
      };
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
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          activity: "",
          location: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "",
          location: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          location: "Rub??",
          installation: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          location: "Rub??",
          activity: "",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "Rub??",
          limit: "6",
        },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: { location: "Rub??", activity: "", installation: "", limit: "6" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

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
      const req: Partial<Request> = {
        query: { location: "", installation: "", activity: "", limit: "6" },
      };
      const error = new CustomError(
        "We couldn't load any climbing wall due to an internal server error",
        500,
        "We couldn't load any climbing wall due to an internal server error"
      );

      ClimbingWall.find = jest.fn().mockRejectedValue(error);

      await loadAllClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a loadClimbingWall controller", () => {
  describe("When it is invoked without the id param", () => {
    test("Then it should call it's next method", async () => {
      const req: Partial<Request> = {
        params: {},
      };
      const error = new CustomError(
        "There is no climbing wall",
        400,
        "There is no climbing wall"
      );

      ClimbingWall.findById = jest.fn().mockRejectedValue(error);
      await loadClimbingWall(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it is invoked with the id param", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        params: { id: "12345678910" },
      };
      const status = 200;

      ClimbingWall.findById = jest.fn().mockReturnValue(climbingWallMock);
      await loadClimbingWall(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
  describe("When it is invoked with the id param and an internal server error happens", () => {
    test("Then it should call it's next method", async () => {
      const req: Partial<Request> = {
        params: { id: "12345678910" },
      };
      const error = new CustomError(
        "We couldn't find any climbing wall due to an internal server error",
        500,
        "We couldn't find any climbing wall due to an internal server error"
      );

      ClimbingWall.findById = jest.fn().mockRejectedValue(error);
      await loadClimbingWall(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a loadUserClimbingWalls controller", () => {
  describe("When it has 1 climbing wall", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          activity: "",
          location: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "",
          location: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          location: "Rub??",
          installation: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          location: "Rub??",
          activity: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "Rub??",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: { location: "Rub??", activity: "", installation: "", limit: "6" },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(climbingWallMock);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it has 0 climbing walls", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          activity: "",
          location: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "",
          location: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          location: "Rub??",
          installation: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          installation: "Cafeteria",
          location: "Rub??",
          activity: "",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: {
          activity: "Grupos",
          installation: "Cafeteria",
          location: "Rub??",
          limit: "6",
        },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        query: { location: "Rub??", activity: "", installation: "", limit: "6" },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const status = 200;

      ClimbingWall.find = jest.fn().mockReturnValue(null);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When a internal server error happens", () => {
    test("Then it should call it's next method with an error", async () => {
      const req: Partial<Request> = {
        query: { location: "", installation: "", activity: "", limit: "6" },
        params: { userId: "63c1aaf5a6eb84d57beb72b7" },
      };
      const error = new CustomError(
        "Error loading your climbing walls",
        500,
        "Error loading your climbing walls"
      );

      ClimbingWall.find = jest.fn().mockRejectedValue(error);

      await loadUserClimbingWalls(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a loadClimbingWall controller", () => {
  describe("When it is invoked without the id param", () => {
    test("Then it should call it's next method", async () => {
      const req: Partial<Request> = {
        params: {},
      };
      const error = new CustomError(
        "There is no climbing wall",
        400,
        "There is no climbing wall"
      );

      ClimbingWall.findById = jest.fn().mockRejectedValue(error);
      await loadClimbingWall(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it is invoked with the id param", () => {
    test("Then it should return a 200 status", async () => {
      const req: Partial<Request> = {
        params: { id: "12345678910" },
      };
      const status = 200;

      ClimbingWall.findById = jest.fn().mockReturnValue(climbingWallMock);
      await loadClimbingWall(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
