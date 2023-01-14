import Joi from "joi";

const userSchema = {
  body: Joi.object({
    email: Joi.string().pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
    password: Joi.string().min(5),
  }),
};

export default userSchema;
