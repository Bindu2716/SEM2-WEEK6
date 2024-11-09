// src/router/employee.routes.js
import express from 'express';
import { signUp, loginEmployee, logoutEmployee, updateEmployeeProfile, recordAttendance, getAttendance } from '../controllers/employee.controller.js';

const router = express.Router();

// POST route for employee sign-up
router.post('/signup', signUp);

// POST route for employee login
router.post('/login', loginEmployee);

// POST route for employee logout
router.post('/logout', logoutEmployee);

// PUT route to update employee profile
router.put('/:employeeId/profile', updateEmployeeProfile);

// POST route to record employee attendance
router.post('/:employeeId/attendance', recordAttendance);

// GET route to get employee attendance
router.get('/:employeeId/attendance', getAttendance);

export default router;
