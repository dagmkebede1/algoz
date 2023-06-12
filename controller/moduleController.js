const Module = require("../model/curiculum");
const CatchAsync = require("../utils/CatchAsync");

const createModule = CatchAsync(async (req, res, next) => {
  const { title, videoResources, notes, tasks } = req.body;

  const newModule = new Module({ title, videoResources, notes, tasks });
  const result = await newModule.save();

  res.status(201).json(result);
});

module.exports = { createModule };
