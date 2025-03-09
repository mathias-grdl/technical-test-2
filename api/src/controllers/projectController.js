const ProjectObject = require("../models/projectModel");

const SERVER_ERROR = "SERVER_ERROR";
const PROJECT_ALREADY_EXISTS = "PROJECT_ALREADY_EXISTS";

async function getProjects(req, res) {
  try {
    const data = await ProjectObject.find({ ...req.query, organisation: req.user.organisation }).sort("-last_updated_at");
    return res.status(200).send({ ok: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function getProjectById(req, res) {
  try {
    const data = await ProjectObject.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ ok: false, code: "PROJECT_NOT_FOUND" });
    }
    return res.status(200).send({ ok: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function createProject(req, res) {
  try {
    const data = await ProjectObject.create({ ...req.body, organisation: req.user.organisation });
    return res.status(200).send({ data, ok: true });
  } catch (error) {
    if (error.code === 11000) return res.status(409).send({ ok: false, code: PROJECT_ALREADY_EXISTS });
    console.log(error);
    return res.status(500).send({ ok: false, code: SERVER_ERROR });
  }
}

async function updateProject(req, res) {
  try {
    const obj = req.body;
    const data = await ProjectObject.findByIdAndUpdate(req.params.id, obj, { new: true });
    res.status(200).send({ ok: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

async function deleteProject(req, res) {
  try {
    await ProjectObject.findOneAndRemove({ _id: req.params.id });
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
