const code = {
    INTERNAL: 500,
    NOT_FOUND: 404,
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
}

const error = {
    INTERNAL: "Internal Server Error",
    NOT_FOUND: "Not Found",
    BAD_REQUEST: "Bad Request",
    UNAUTHORIZED: "unauthorized",
    CONFLICT: "Conflict",
}

const specific = {
    USER: "user",
    ALREADY: "Already Register",
    BAD: "Bad Username/Password"
}

module.exports = { code, error, specific }