const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').User;

const register = async (req, res) => {
  try {
    const { name, username, email, password, role, address, phoneNumber } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      address,
      phoneNumber
    });
    res.status(201).send({
      message: "Success creating new user",
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      address: user.address
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ error: "Unauthorized", message: "Invalid username/password" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ error: "Unauthorized", message: "Invalid username/password" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret-key', { expiresIn: 86400 });
    res.status(200).send({
      accessToken: token,
      name: user.name,
      role: user.role,
      id: user.id
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login };