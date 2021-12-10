const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  categoryName: { type: String },
  usernameId: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Category = model("Category", categorySchema);

module.exports = Category;
