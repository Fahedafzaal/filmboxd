const express = require('express');
const connectDB = require('./db');

const app = express();

const PORT = 3000;

app.use(express.json());
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});