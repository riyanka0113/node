export enum code {
  INTERNAL = 500,
  NOT_FOUND = 404,
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export enum error {
  INTERNAL = "Internal Server Error",
  UNAUTHORIZED = "Unauthorized",
  NOT_FOUND = "Not Found",
  BAD_REQUEST = "Invalid",
  CONFLICT = "Already Exist",
}
export enum specific {
  PATH = "Path",
  name = "Please Enter Product Name",
  description = "Please Enter product Description",
  qty = "Please Enter product Quantity",
  price = "Please Enter product Unit Price",
}
