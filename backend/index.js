const mongoose = require("mongoose");
const app = require("./app")
const config = require("./config");

let server;

//db connection
mongoose.connect(config.mongoURI).then((data) => {
  console.log(`Mongodb connected with server: ${data.connection.host}`);
  server = app.listen(config.PORT, () => {
    console.log(`Server is working on http://localhost:${config.PORT}`);
  });
});

const unexpectedErrorHandler = (error) => {
  console.log(error);
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Handling Uncaught Exception
process.on("uncaughtException", unexpectedErrorHandler);
// Unhandled Promise Rejection
process.on("unhandledRejection", unexpectedErrorHandler);