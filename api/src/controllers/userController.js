const UserObject = require("../models/userModel");
const AuthObject = require("../auth");
const { validatePassword } = require('../utils/validatePassword.js');

const UserAuth = new AuthObject(UserObject);

const SERVER_ERROR = "SERVER_ERROR";
const USER_ALREADY_REGISTERED = "USER_ALREADY_REGISTERED";
const PASSWORD_NOT_VALIDATED = "PASSWORD_NOT_VALIDATED";

async function signin(req, res) {
  return UserAuth.signin(req, res);
}

async function logout(req, res) {
  return UserAuth.logout(req, res);
}

async function signup(req, res) {
  return UserAuth.signup(req, res);
}

async function signinToken(req, res) {
  return UserAuth.signinToken(req, res);
}

async function getAvailableUsers(req, res) {
  try {
    const users = await UserObject.find({ availability: { $ne: "not available" }, organisation: req.user.organisation }).sort("-last_login_at");
    return res.status(200).send({ ok: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function getUserById(req, res) {
  try {
    const data = await UserObject.findOne({ _id: req.params.id });
    return res.status(200).send({ ok: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function createUser(req, res) {
  try {
    if (!validatePassword(req.body.password)) return res.status(400).send({ ok: false, user: null, code: PASSWORD_NOT_VALIDATED });

    const user = await UserObject.create({ ...req.body, organisation: req.user.organisation });

    return res.status(200).send({ data: user, ok: true });
  } catch (error) {
    if (error.code === 11000) return res.status(409).send({ ok: false, code: USER_ALREADY_REGISTERED });
    console.log(error);
    return res.status(500).send({ ok: false, code: SERVER_ERROR });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await UserObject.find({ ...req.query, organisation: req.user.organisation }).sort("-last_login_at");
    return res.status(200).send({ ok: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function updateUserById(req, res) {
  try {
    const obj = req.body;

    const user = await UserObject.findByIdAndUpdate(req.params.id, obj, { new: true });
    res.status(200).send({ ok: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function updateCurrentUser(req, res) {
  try {
    const obj = req.body;
    const data = await UserObject.findByIdAndUpdate(req.user._id, obj, { new: true });
    res.status(200).send({ ok: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function deleteUserById(req, res) {
  try {
    await UserObject.findOneAndRemove({ _id: req.params.id });
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

module.exports = {
  signin,
  logout,
  signup,
  signinToken,
  getAvailableUsers,
  getUserById,
  createUser,
  getAllUsers,
  updateUserById,
  updateCurrentUser,
  deleteUserById
};
