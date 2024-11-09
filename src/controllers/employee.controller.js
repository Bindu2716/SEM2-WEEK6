import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating tokens
import Employee from '../models/Employee.js'; // Import Employee model
import { registerEmployee } from '../service/employeeService.js'; // Import registerEmployee from service

// Controller for Employee Sign-up (Create new employee)
export const signUp = async (req, res) => {
  try {
    const employee = await registerEmployee(req.body);
    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller for Employee Login (Generate JWT token)
export const  loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ employeeId: employee._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set token expiration
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
};

// Controller for Employee Logout (Token removal on client side)
export const logoutEmployee = (req, res) => {
  // Logout is typically handled by client-side by removing the JWT token
  res.status(200).json({ message: 'Logout successful' });
};

// Controller for Updating Employee Profile
export const updateEmployeeProfile = async (req, res) => {
  const { employeeId } = req.params;
  const { name, profile } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { name, profile },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile', details: error.message });
  }
};

// Controller for Tracking Attendance
export const recordAttendance = async (req, res) => {
  const { employeeId } = req.params;
  const { status } = req.body;

  try {
    // Validate status
    if (!['Present', 'Absent', 'On Leave'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Record the attendance
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Add attendance record
    employee.attendance.push({ status });

    // Save the updated employee document
    await employee.save();

    res.status(200).json({ message: 'Attendance recorded successfully', attendance: employee.attendance });
  } catch (error) {
    res.status(500).json({ error: 'Error recording attendance', details: error.message });
  }
};

// Controller for Getting Employee Attendance
export const getAttendance = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ attendance: employee.attendance });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendance', details: error.message });
  }
};
