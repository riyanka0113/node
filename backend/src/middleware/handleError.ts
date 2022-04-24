import { NextFunction, Request, Response } from "express";
import { code, error, specific } from "../config/response";
import { APIError } from "../config/error";

//error handling(not need try catch block in controller)
export const use =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

//if path not found in route then throw this error
export const errorConverter = (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  const err = new APIError(
    `${specific.PATH} ${error.NOT_FOUND}`,
    code.NOT_FOUND
  );
  next(err);
};

//middlerware to return error response
export const handleErrors = (
  err: Error,
  _: Request,
  res: Response,
  _next: NextFunction
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
