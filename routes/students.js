const express = require('express');
const { getAllStudents, showSingleStudents, createStudents, studentsDataStore, deleteStudent, editStudents, updateStudents } = require('../controllers/studentsControllers');
const { studentMulter } = require('../middlewares/studentMiddleware')
// Init Router
const router = express.Router();



// Routing
router.get('/', getAllStudents);

router.get('/create', createStudents);

router.post('/create', studentMulter, studentsDataStore);

router.get('/edit/:id', editStudents);

router.get('/delete/:id', deleteStudent);

router.post('/update/:id', studentMulter, updateStudents);

router.get('/:id', showSingleStudents);


// Export Module
module.exports =router;