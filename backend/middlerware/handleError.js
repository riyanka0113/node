const APIError = require("../config/error");
const { code } = require("../config/response");

const wrapper = ((fn) => { return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next) })

const handleErrors = (
  err, _req, res, _next
) => {
  if (err instanceof APIError) {
    return res.status(err.getcode()).json({
      success: false,
      message: err.message,
    });
  } else {
    return res.status(code.INTERNAL).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { wrapper, handleErrors }