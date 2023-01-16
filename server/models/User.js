const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    todos: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Todo"
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);
module.exports = User;