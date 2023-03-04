const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const createRequest = require("./chainlink-EA.js").createRequest;
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.post("/", (req, res) => {
  createRequest(req.body, (req, res) => {
    res.status(status).json(result);
  });
});

const startServer = async () => {
  try {
    app.listen(8080, () => {
      console.log("server is running");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
