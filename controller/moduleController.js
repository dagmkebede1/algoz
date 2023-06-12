const Module = require("../model/curiculum");
const CatchAsync = require("../utils/CatchAsync");

// Creating a Modules
const createModule = CatchAsync(async (req, res, next) => {
  const { title, videoResources, notes, tasks } = req.body;

  const newModule = new Module({ title, videoResources, notes, tasks });
  const result = await newModule.save();

  res.status(201).json(result);
});
//getAllModules

const getAllModules = CatchAsync(async (req, res, next) => {
  const allModules = await Module.find();

  res.status(200).json(allModules);
});

//get a Single Module

const getSingleModule = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  let SingleModule = await Module.findById({ _id: id });

  res.status(200).json(SingleModule);
});

//updating a Module
const updateModule = CatchAsync(async (req, res, next) => {
  let { id } = req.params;
  const { title, videoResources, notes, tasks } = req.body;

  let updatedModule = await Module.findByIdAndUpdate(
    { _id: id },
    { title, videoResources, notes, tasks },
    { new: true }
  );

  res.status(200).json(updatedModule);
});

const deleteModule = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  let deletedModule = await Module.findByIdAndDelete({ _id: id });

  res.status(200).json({
    msg: "Module deleted successfully",
    deletedModule,
  });
});

module.exports = {
  createModule,
  getSingleModule,
  getAllModules,
  updateModule,
  deleteModule,
};
