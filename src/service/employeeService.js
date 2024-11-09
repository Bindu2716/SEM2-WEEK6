// src/services/employeeService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createEmployee, findEmployeeByEmail } from '../dal/employeeDAL.js';
import config from '../config/DBconnection.js';

export const registerEmployee = async (data) => {
  data.password = await bcrypt.hash(data.password, 10);
  return await createEmployee(data);
};

export const loginEmployee = async (email, password) => {
  const employee = await findEmployeeByEmail(email);
  if (employee && await bcrypt.compare(password, employee.password)) {
    return jwt.sign({ id: employee._id }, config.jwtSecret);
  }
  throw new Error('Invalid credentials');
};
