// src/dal/employeeDAL.js
import Employee from '../models/Employee.js';

export const createEmployee = async (data) => Employee.create(data);
export const findEmployeeByEmail = async (email) => Employee.findOne({ email });
export const updateEmployeeProfile = async (id, data) => Employee.findByIdAndUpdate(id, data, { new: true });
