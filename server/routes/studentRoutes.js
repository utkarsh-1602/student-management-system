const express = require("express");
const router = express.Router();

const student = require('../controllers/student')

router.get('/', student.getStudents);
router.post('/addStudent', student.addStudent);
router.put('/updateStudent', student.updateStudent);
router.delete('/deleteStudent', student.deleteStudent);
router.post('/studentLogin', student.studentLogin);

module.exports = router;