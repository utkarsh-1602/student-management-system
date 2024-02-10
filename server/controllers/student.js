const Student = require('../models/student')

exports.studentLogin = async(req, res) => {

    try {
        
        const {name, rollNumber} = req.body;

        if(!name || !rollNumber){
            return res.status(400).json({
                message: "Student Not Found"
            });   
        }

        const student = await Student.findOne({
            name: name
        })

        return res.status(200).json({ msg: 'Student LoggedIn', result: student});

    } catch (error) {
        
    }
}


exports.addStudent = async(req, res) => {
    try {
        const { name, fathersName, mothersName, homeAddress, age, rollNumber} = req.body;

        console.log(req.body);

        let student = await Student.findOne({
            name: name
        })
    
        if(student){
            return res.status(400).json({
                message: "User Already Exists"
            });
        }
    
        const addStudent = await Student.create({
            name: name,
            fathersName: fathersName,
            mothersName: mothersName,
            age: age, 
            homeAddress: homeAddress,
            rollNumber: rollNumber
        })

        console.log(addStudent)

        return res.status(200).json({ msg: 'Student Added successfully', result: addStudent});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Student not added: ${error}` });  
    }
}

exports.getStudents = async(req, res) => {

    try {
        
        // Query the database to find all students
        const students = await Student.find({ isDeleted: false });
        console.log(students)
        // Check if students were found
        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        
        // Return the students as a JSON response
        res.status(200).json(students);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'No Students Record Found', error: error.message });

    }

}

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.query;

        const student = await Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ message: 'Student soft deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error soft deleting student: ${error.message}` });
    }
};



exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.query;
        const { name, fathersName, mothersName, homeAddress, age, rollNumber } = req.body;

        console.log(id)
        console.log(req.body)

        const updatedStudent = await Student.findByIdAndUpdate(id, {
            name,
            fathersName,
            mothersName,
            homeAddress,
            age,
            rollNumber
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ message: 'Student updated successfully', updatedStudent });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error updating student: ${error.message}` });
    }
};


exports.getSpecificStudent = async(req, res) => {
    try {
        
        const {id} = req.query;
        const { name, fathersName, mothersName, homeAddress, age, rollNumber } = req.body;

        console.log(id)
        console.log(req.body)

        const findStudent = await Student.findById(id)

        return res.status(200).json({ message: 'Student Record Fetched Successfully', findStudent });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error getting student: ${error.message}` });
    }
}