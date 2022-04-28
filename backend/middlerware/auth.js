
const { secret } = require("../config")
const { code, error } = require("../config/response");
const APIError = require("../config/error");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken")



const Auth = async (
  req,
  _res,
  next
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new APIError(error.UNAUTHORIZED, code.UNAUTHORIZED)
    } else {
      const data = jwt.verify(token, secret);

      const user = await userModel.findById(data.id)
      if (!user) {
        throw new APIError(error.UNAUTHORIZED, code.UNAUTHORIZED)
      }


      req.user = user;

      next();
    }
  } catch (error) {
    throw new APIError(error.INTERNAL, code.INTERNAL)
  }
};

module.exports = Auth