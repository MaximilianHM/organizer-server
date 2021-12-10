const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  taskName: { type: String },
  status: { type: String }, // ! selector [enum]
  deadLine: { type: String }, // ! should be date
  description: { type: String },
  // SHOULD HAVE THE USER ID TO DELEGATE THE TASK?
});

const Task = model("Task", taskSchema);

module.exports = Task;
