import Joi from "joi";

const userSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
    password: Joi.string().min(5),
  }),
};

export default userSchema;
