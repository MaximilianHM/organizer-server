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
  deadLine: { type: Date }, // ! should be date
  description: { type: String },
  // SHOULD HAVE THE USER ID TO DELEGATE THE TASK?
});

const Task = model("Task", taskSchema);

module.exports = Task;
