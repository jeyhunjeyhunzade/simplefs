const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
const db = require("./queries");
require("dotenv").config();
// const Auth = require("./helpers/auth.js");
//port
const port = 8000;

//middleware
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

//Users
app.post("/login", db.Users.loginUser);
app.post("/users", db.Users.createUser);
app.get("/users/:id", db.Users.getUserById);
app.get("/users", db.Users.getUsers);
app.put("/users/:id", db.Users.updateUser);
app.delete("/users/:id", db.Users.deleteUser);

app.get("/", (_req, res) => {
  res.send("we are on home");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
