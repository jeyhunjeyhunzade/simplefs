const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Auth = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id,
        name: "lol",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return token;
  },
  /**
   * Authenticate Token
   */
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null)
      return res
        .sendStatus(401)
        .send({ auth: false, message: "No token provided." }); // if there isn't any token

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err)
        return res
          .sendStatus(403)
          .send({ auth: false, message: "Failed to authenticate token." });
      req.user = user;
      console.log("=====user===>", user);
      next(); // pass the execution off to whatever request the client intended
    });
  },
};

module.exports = Auth;
