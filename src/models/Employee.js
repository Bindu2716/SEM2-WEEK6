// src/models/Employee.js
import mongoose from 'mongoose';

// Define the Employee Schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
  },
  attendance: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent', 'On Leave'],
        default: 'Present',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on save
employeeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Employee model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
