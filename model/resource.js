const { Schema, SchemaTypes, model } = require("mongoose");

const videoSchema = new Schema(
  {
    originalname: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const noteSchema = new Schema(
  {
    originalname: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const taskSchema = new Schema(
  {
    // module: { type: SchemaTypes.ObjectId, ref: "Modules" },
    title: { type: String, required: true },
    activityList: [{ type: String, required: true }],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Videos = model("Video", videoSchema);
const Notes = model("Note", noteSchema);
const Tasks = model("Task", taskSchema);

module.exports = { Videos, Notes, Tasks };
