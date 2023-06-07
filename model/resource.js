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
const Notes = model("Notes", noteSchema);
const Tasks = model("Tasks", taskSchema);

module.exports = { Videos, Notes, Tasks };
