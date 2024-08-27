const express = require('express');
const studentRouter = express.Router();
const Student = require('../../db/schemes/studentscheme');

studentRouter.get('/', async (req, res) => {
        const queryParams = req.query;
        const filters = {};
        
        if (queryParams.name) {
            filters.name = {
                $regex: `^${queryParams.name}`,
                $options: 'i'
            };
        }
        if (queryParams.departmentName) {
            filters.departmentName = {
                $regex: `^${queryParams.departmentName}`,
                $options: 'i'
            };
        }
        
        const students = await Student.find(filters);
        res.json(students);
  
     });

studentRouter.post('/', async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = new Student(studentData); 
        await newStudent.save();

        res.json({
            message: 'Student added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

studentRouter.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedStudentData = req.body;
        const response = await Student.findByIdAndUpdate(studentId, updatedStudentData, { new: true });

        if (!response) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student updated successfully',
            student: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

studentRouter.delete('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const response = await Student.findByIdAndDelete(studentId);

        if (!response) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

studentRouter.get('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            res.status(404).json({
                message: 'Student not found'
            });
        } else {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
});

module.exports = studentRouter;
