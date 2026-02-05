import mongoose, { Schema } from "mongoose";

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});
