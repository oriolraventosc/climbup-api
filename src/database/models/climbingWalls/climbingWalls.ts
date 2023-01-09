import { Schema, model } from "mongoose";

const climbingWallSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  picture1: {
    required: false,
    type: String,
  },
  picture2: {
    required: false,
    type: String,
  },
  picture3: {
    required: false,
    type: String,
  },
  picture4: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  telephone: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  prices: {
    required: true,
    type: String,
  },
  installations: {
    required: false,
    type: Array,
  },
  schedule: {
    required: true,
    type: String,
  },
  activities: {
    required: false,
    type: Array,
  },
  website: {
    required: true,
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const ClimbingWall = model("ClimbingWall", climbingWallSchema, "climbingWalls");

export default ClimbingWall;