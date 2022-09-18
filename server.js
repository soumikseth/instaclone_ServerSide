const express = require("express");
const app = express();
const cors = require("cors");
const postInfo = require("./models/post_model");
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
require("dotenv").config();

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/instaclone10xSS")
  .then(() => {
    console.log("Successfully connected with DB instaclone10xSS ");
  })
  .catch((err) => console.log(err));

app.get("/postview", (req, res) => {
  postInfo
    .find({})
    .then((userData) => {
      console.log(userData);
      res.status(200).send(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/post", (req, res) => {
  console.log(req.body);
  postInfo.create(req.body).then(() => {
    res.status(200).redirect("/");
  });
});
app.get("/", (req, res) => {
  res.send("Backend Active :)");
});
