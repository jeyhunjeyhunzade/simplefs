const pool = require("../config");
const Auth = require("../helpers/auth");

const userStatus = {
  active: "ACTIVE",
  blocked: "BLOCKED",
};

const Users = {
  loginUser: async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send({ message: "Some values are missing" });
    }

    if (!Auth.isValidEmail(email)) {
      return response
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }

    try {
      const userQuery = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      userById = userQuery.rows[0];
      if (!userById) {
        return response.status(404).send("User can not be found.");
      }

      if (password !== userById.password) {
        return response.status(400).send("email and password does not match");
      }

      if (userById.status !== userStatus.active) {
        return response.status(403).send("User is blocked");
      }

      const token = Auth.generateToken(userById.id);
      return response.status(201).json({ userById, token });
    } catch (error) {
      console.log(error.message, "Error message: ", response.status);
    }
  },
  createUser: async (request, response) => {
    const { email, password, name } = request.body;
    if (!email || !password || !name) {
      return response.status(400).send({ message: "Some values are missing" });
    }

    if (!Auth.isValidEmail(email)) {
      return response
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }

    const hashPassword = Auth.hashPassword(password);
    try {
      const newUser = await pool.query(
        "INSERT INTO users ( email, password, name) VALUES ($1, $2) RETURNING *",
        [email, hashPassword, name]
      );
      response.status(201).json(newUser.rows[0]);
    } catch (error) {
      console.log(error.message, "response status: ", response.status);
    }
  },
  getUsers: async (_, response) => {
    try {
      const allUsers = await pool.query("SELECT * FROM users ORDER BY id ASC");
      response.status(200).json(allUsers.rows);
    } catch (error) {
      console.log(error.message, "response status: ", response.status);
    }
  },
  getUserById: async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const userById = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      response.status(200).json(userById.rows);
    } catch (error) {
      console.log(error.message, "response status: ", response.status);
    }
  },

  deleteUser: async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const deletedUser = pool.query("DELETE FROM users WHERE id = $1", [id]);
      response.status(200).send(`User deleted with ID: ${id}`);
    } catch (error) {
      console.log(error.message, "response status: ", response.status);
    }
  },

  blockUser: async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const blockedUser = await pool.query(
        "UPDATE users SET status = $1 WHERE id = $2",
        [userStatus.blocked, id]
      );
      response.status(200).send(`User blocked with ID: ${id}`);
    } catch (error) {
      console.log(error.message, "response status: ", response.status);
    }
  },

  unBlockUser: async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const blockedUser = await pool.query(
        "UPDATE users SET status = $1 WHERE id = $2",
        [userStatus.active, id]
      );
      response.status(200).send(`User unblocked with ID: ${id}`);
    } catch (error) {
      console.log(error.message, "response status: ", response.status);
    }
  },
};

module.exports = Users;
