// app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectToDB from './src/config/DBconnection.js';
import employeeRouter from './src/router/employee.routes.js';

dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount the admin router at /api/admin

app.use('/api/employees', employeeRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
