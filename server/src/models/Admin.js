import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    min: [6, "Must be at least 6 character long, got {value}"],
    max: 12,
  },
});

// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = bcrypt.hash(this.password, 10);
//   next();
// });

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


export default mongoose.model("Admin", adminSchema);
