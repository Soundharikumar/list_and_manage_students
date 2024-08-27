require('dotenv').config();
const express = require('express');
const studentRouter = require('./routes/students/students.js');
const connectDB = require('./db/index.js');

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use('/api', studentRouter);

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
