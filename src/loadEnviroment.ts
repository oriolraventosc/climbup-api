import dotenv from "dotenv";

dotenv.config();

const enviroment = {
  debug: process.env.DEBUG,
  mongoDbUrl: process.env.MONGODB_URL,
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEy,
};

export default enviroment;
