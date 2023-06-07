const { Videos, Tasks, Notes } = require("../model/resource");
const CatchAsync = require("../utils/CatchAsync");
const fs = require("fs");

// Video Resource Logic

// Uploading Video Resource
const uploadVideo = CatchAsync(async (req, res, next) => {
  if (req.files) {
    let { video } = req.files;
    let vid = [];

    video.forEach((singleVideo) => {
      const { fieldname, encoding, mimetype, size, path, ...other } =
        singleVideo;
      vid.push(other);
    });

    let newVideo = await Videos.insertMany(vid);
    console.log(newVideo);

    res.status(201).json({
      status: "success",
      message: "video uploaded successfully",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "video not found",
    });
  }
});

// getting all the video resources
const getAllVideos = CatchAsync(async (req, res, next) => {
  let queryObj = {};
  if (req.query?.originalname) {
    queryObj.originalname = { $regex: req.query.originalname, $options: "i" };
  }

  let videos = await Videos.find(queryObj);
  res.status(200).json({
    status: "success",
    videos,
  });
});

// edit video
const editVideo = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { originalname } = req.body;

  const updatedVideo = await Videos.findByIdAndUpdate(
    { _id: id },
    { originalname },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    updatedVideo,
  });
});

// getting Single Video
const getSingleVideo = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const Video = await Videos.findById({ _id: id });

  res.status(200).json({
    status: "success",
    Video,
  });
});

// getting Single Video
const deleteVideo = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedVideo = await Videos.findByIdAndDelete({ _id: id });

  if (deletedVideo) {
    fs.unlink(`public/resources/video/${deletedVideo?.filename}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted Successfully form the filesystem");
      }
    });

    res.status(200).json({
      status: "success",
      deletedVideo,
      message: "Video deleted successfully",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "No Video with that ID's",
    });
  }
});

// deleting Multiple videos
const deleteMultipleVideos = CatchAsync(async (req, res, next) => {
  const { ids } = req.body;
  let pathList = [];

  //checking for the data types
  if (Array.isArray(ids)) {
    // looping to get every notes in the database to have their path to delete them from the filesystem
    ids.forEach(async (id) => {
      const Video = await Videos.findById({ _id: id });
      Video && pathList.push(Video.filename);
    });
  }

  // deleting them from the database
  const result = await Videos.deleteMany({ _id: { $in: ids } });

  // if we are successful deleting from the database we then delete the file from the filesystem
  if (result.deletedCount) {
    // looping over the note filename and removing them from the databases
    pathList.forEach((filePath) => {
      fs.unlink(`public/resources/video/${filePath}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${filePath} deleted Successfully form the filesystem`);
        }
      });
    });
    res.status(200).json({
      status: "success",
      message: "Videos deleted successfully",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "No Videos with those ID's to delete",
    });
  }
});

//---------------> Notes Resource Logic <----------//

// Note Uploading
const uploadNotes = CatchAsync(async (req, res, next) => {
  if (req.files) {
    let { note } = req.files;
    let notes = [];

    note.forEach((singleNote) => {
      const { fieldname, encoding, mimetype, size, path, ...other } =
        singleNote;
      notes.push(other);
    });

    let newNote = await Notes.insertMany(notes);
    console.log(newNote);

    res.status(201).json({
      status: "success",
      message: "Notes uploaded successfully",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Notes not found",
    });
  }
});

//getAllNotes
const getAllNotes = CatchAsync(async (req, res, next) => {
  let queryObj = {};

  if (req.query?.originalname) {
    queryObj.originalname = { $regex: req.query.originalname, $options: "i" };
  }

  let NoteList = await Notes.find(queryObj);
  res.status(200).json({
    status: "success",
    NoteList,
  });
});

//Edit Notes
const editNotes = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { originalname } = req.body;

  const updatedNotes = await Notes.findByIdAndUpdate(
    { _id: id },
    { originalname },
    { new: true }
  );
  if (updatedNotes) {
    res.status(200).json({
      status: "success",
      updatedNotes,
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "there is no Note with that ID's",
    });
  }
});

//getSingleNote
const getSingleNote = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const Note = await Notes.findOne({ _id: id });
  console.log(Note);
  res.status(200).json({
    status: "success",
    Note,
  });
});

//deleteSingleNote
const deleteNote = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedNote = await Notes.findByIdAndDelete({ _id: id });

  if (deletedNote) {
    fs.unlink(`public/resources/note/${deletedNote?.filename}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted Successfully form the filesystem");
      }
    });

    res.status(200).json({
      status: "success",
      deletedNote,
      message: "Note deleted successfully",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "No Note with that ID",
    });
  }
});

//deleteMultipleNote
const deleteMultipleNote = CatchAsync(async (req, res, next) => {
  const { ids } = req.body;
  let pathList = [];

  //checking for the data types
  if (Array.isArray(ids)) {
    // looping to get every notes in the database to have their path to delete them from the filesystem
    ids.forEach(async (id) => {
      const Note = await Notes.findById({ _id: id });
      Note && pathList.push(Note.filename);
    });
  }

  // deleting them from the database
  const result = await Notes.deleteMany({ _id: { $in: ids } });

  // if we are successful deleting from the database we then delete the file from the filesystem
  if (result.deletedCount) {
    // looping over the note filename and removing them from the databases
    pathList.forEach((filePath) => {
      fs.unlink(`public/resources/note/${filePath}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${filePath} deleted Successfully form the filesystem`);
        }
      });
    });
    res.status(200).json({
      status: "success",
      message: "Notes deleted successfully",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "No Notes with those ID's to delete",
    });
  }
});

//---------------> Tasks Resource Logic <----------//

// add a task controller function
const addTask = CatchAsync(async (req, res, next) => {
  const { title, activityList, description } = req.body;

  if (!title || !activityList || !description) {
    res.status(404).json({
      status: "failed",
      message: "can not add Incomplete data",
    });
  } else {
    const result = await Tasks.create({ title, activityList, description });

    res.status(200).json({
      status: "success",
      message: "Task added successfully",
      result,
    });
  }
});

// getAllTasks controller functions
const getAllTasks = CatchAsync(async (req, res, next) => {
  let queryObj = {};

  if (req.query?.title) {
    queryObj.title = { $regex: req.query.title, $options: "i" };
  }

  let taskList = await Tasks.find(queryObj);
  res.status(200).json({
    status: "success",
    taskList,
  });
});

//update Task controller functions
const updateTask = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, activityList, description } = req.body;

  const updatedTask = await Tasks.findByIdAndUpdate(
    { _id: id },
    { title, activityList, description },
    { new: true }
  );
  if (updatedTask) {
    res.status(200).json({
      status: "success",
      updatedTask,
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "there is no Task with that ID's",
    });
  }
});

//getSingleTask controller functions
const getSingleTask = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  const Task = await Tasks.findOne({ _id: id });
  console.log(Task);

  if (!Task) {
    res.status(404).json({
      message: "No Task with that ID",
    });
  } else {
    res.status(200).json({
      status: "success",
      Task,
    });
  }
});

// deleteSingleTask controller functions
const deleteTask = CatchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedTask = await Tasks.findByIdAndDelete({ _id: id });

  if (deletedTask) {
    res.status(200).json({
      status: "success",
      deletedTask,
      message: "Task deleted successfully",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "No Note with that ID",
    });
  }
});

//deleteMultiple Tasks controller function
const deleteMultipleTask = CatchAsync(async (req, res, next) => {
  const { ids } = req.body;
  // deleting them from the database
  const result = await Tasks.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount) {
    res.status(200).json({
      status: "success",
      message: "Tasks deleted successfully",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "No Tasks with those ID's to delete",
    });
  }
});

module.exports = {
  uploadVideo,
  getAllVideos,
  getSingleVideo,
  editVideo,
  deleteVideo,
  deleteMultipleVideos,
  // Note Controller Exporting Functions
  uploadNotes,
  getAllNotes,
  editNotes,
  getSingleNote,
  deleteNote,
  deleteMultipleNote,
  // Tasks Controller Exporting Functions
  addTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  deleteMultipleTask,
};
