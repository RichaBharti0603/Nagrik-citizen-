const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!['user', 'officer'].includes(role)) {
    return res.status(400).json({ msg: "Invalid role" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.role !== role) {
      return res.status(400).json({ msg: "Invalid credentials or role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};
