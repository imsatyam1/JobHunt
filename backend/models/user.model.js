import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowecase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: [6, 'Password must be  at least 6 character'],
    max: [12, 'Password not be grater than 12 character'],
    required: [true, "Password is required"],
  },
  workstatus: {
    type: String,
    enum: ['employee', 'recruiter'],
    required: true
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, 
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profilePhoto: { 
      type: String,
      default: ""
    }
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
