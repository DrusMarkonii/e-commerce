const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const sequelize = require("./db");
require("dotenv").config();
const router = require("./routes/index");
const models = require("./models/models");
const errorHandler = require(".//middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5002;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working!....." });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on ${PORT} PORT....`));
  } catch (e) {
    console.log(e);
  }
};

start();
