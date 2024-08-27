const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
