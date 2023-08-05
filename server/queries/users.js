const pool = require("../config");
const Auth = require("../helpers/auth");

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

    // const hashPassword = Auth.hashPassword(password);

    try {
      const userQuery = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      userById = userQuery.rows[0];
      console.log("===userById===>", userById);
      if (password === userById.password) {
        const token = Auth.generateToken(userById.id);
        response.status(201).json({ userById, token });
      } else {
        response.status(400).send("Email and Password does not match");
      }
    } catch (error) {
      console.log(error.message, "Error message: ", response.status);
    }
  },

  createUser: async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
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
        "INSERT INTO users ( email, password) VALUES ($1, $2) RETURNING *",
        [email, hashPassword]
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

  updateUser: async (request, response) => {
    try {
      const id = parseInt(request.params.id);
      const { name, email } = request.body;
      const updatedUser = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3",
        [name, email, id]
      );
      response.status(200).send(`User updated with ID: ${id}`);
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
};

module.exports = Users;
