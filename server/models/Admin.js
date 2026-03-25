import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true, 
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Must be at least 6 character long, got {value}'],
    max: 12
  },
});

export default mongoose.model("Admin", adminSchema);