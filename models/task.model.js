const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  taskName: { type: String },
  status: {
    type: String,
    enum: ["In progress", "Done", "Canceled"],
    default: "In progress",
  },
  deadLine: { type: Date },
  description: { type: String },
});

const Task = model("Task", taskSchema);

module.exports = Task;
