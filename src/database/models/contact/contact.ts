import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const User = model("User", userSchema, "users");

export default User;
