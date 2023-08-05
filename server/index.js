const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
const queries = require("./queries");
require("dotenv").config();
const Auth = require("./helpers/auth.js");

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
app.post("/login", queries.Users.loginUser);
app.post("/users", Auth.authenticateToken, queries.Users.createUser);
app.get("/users/:id", Auth.authenticateToken, queries.Users.getUserById);
app.get("/users", Auth.authenticateToken, queries.Users.getUsers);
app.patch("/users/block/:id", Auth.authenticateToken, queries.Users.blockUser);
app.patch(
  "/users/unblock/:id",
  Auth.authenticateToken,
  queries.Users.unBlockUser
);
app.delete("/users/:id", Auth.authenticateToken, queries.Users.deleteUser);

app.get("/", (_req, res) => {
  res.send("we are on home");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
