import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getstudent, updatestudent } from "../actions/studentAction";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormLayout from './FormLayout'
import Moment from 'moment';
import { addStudent } from "../actions/studentAction";
import axios from 'axios'


function AddStudent() {
    const mystyle = {
        visibility:"hidden"
      };
    let { id } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const [name, setName] = useState("")
    const [fathersName, setFathersName] = useState("")
    const [mothersName, setMothersName] = useState("")
    const [age, setAge] = useState("")
    const [homeAddress, setHomeAddress] = useState("")
    const [rollNumber, setRollNumber] = useState("")
      
    const student = useSelector((state) => state.student.student);

    const createStudent = async (e) => {
        e.preventDefault();
        const new_student = {
            name: name,
            fathersName: fathersName,
            mothersName: mothersName,
            age: age,
            homeAddress: homeAddress,
            rollNumber: rollNumber,
        };
        dispatch(addStudent(new_student));

        const response = await axios.post('https://student-management-system-backend-olive.vercel.app/student/addStudent', new_student);
        console.log(response.data);
        history.push("/students");
    };
    return (
        <>

            <FormLayout
                title="Add new student"
                mystyle={mystyle}
                // path="/students"
                name={name} fathersName={fathersName} mothersName={mothersName} age={age} homeAddress={homeAddress} rollNumber={rollNumber} 
                setName={setName} setFathersName={setFathersName} setMothersName = {setMothersName} setHomeAddress={setHomeAddress} setAge={setAge} setRollNumber={setRollNumber}
                updateData={createStudent}
                action="Add Student"
            />

        </>
    );
}
function EditStudent() {
    const mystyle = {
        visibility:"hidden"
      };
    let { id } = useParams();
    
    const dispatch = useDispatch();
    let history = useHistory();
    const [name, setName] = useState("")
    const [fathersName, setFathersName] = useState("")
    const [mothersName, setMothersName] = useState("")
    const [age, setAge] = useState("")
    const [homeAddress, setHomeAddress] = useState("")
    const [rollNumber, setRollNumber] = useState("")
    const[studentsInfo, setStudentsInfo] = useState("");

    const student = useSelector((state) => state.student.student);

    function handleChange(e) {
        console.log("event");
        console.log(e);
    }

    useEffect(() => {
        const getExistingStudent = async() => {
            try{
                const response = await axios.get(`https://student-management-system-backend-olive.vercel.app/student/getStudent?id=${id}`);
                const data = response.data.findStudent; 
                console.log("Response: ", data);
                setStudentsInfo(data)

                // Populate input fields with existing student data
                setName(data.name);
                setFathersName(data.fathersName);
                setMothersName(data.mothersName);
                setAge(data.age);
                setHomeAddress(data.homeAddress);
                setRollNumber(data.rollNumber);

                dispatch(getstudent(response.data.findStudent.name));
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getExistingStudent()
    }, []); // Run once on component mount
    
    useEffect(() => {
        if (student != null) {
            setName(student.name);
            setFathersName(student.fathersName);
            setMothersName(student.mothersName);
            setAge(student.age);
            setHomeAddress(student.homeAddress);
            setRollNumber(student.rollNumber);
        }
    }, [student]); // Update state when student changes
    

    const updateData = async (e) => {
        e.preventDefault();

        const updated_student = Object.assign(student, {
            name: name,
            fathersName: fathersName,
            mothersName: mothersName,
            age: age,
            homeAddress: homeAddress, 
            rollNumber: rollNumber
        })

        const formData = {
            name: name,
            fathersName: fathersName,
            mothersName: mothersName,
            age: age,
            homeAddress: homeAddress, 
            rollNumber: rollNumber
        }
        console.log("Formdata: ", formData)

        try {
            // Update student data on the server
            const response = await axios.put(`https://student-management-system-backend-olive.vercel.app/student/updateStudent/?id=${id}`, formData);
            console.log(response);

            history.push("/students");

        } catch (error) {
            console.error("Error updating student:", error);
        }

    }
    return (


        <>
            <div className="card border-0 shadow">
                <FormLayout
                mystyle={mystyle}
                path="/students"
                    handleChange={handleChange} updateData={updateData}
                    setName={setName} setFathersName={setFathersName} setMothersName={setMothersName} setAge={setAge} setHomeAddress={setHomeAddress} setRollNumber={setRollNumber}
                    title="Edit student data" name={name} fathersName={fathersName} mothersName={mothersName} age={age} homeAddress={homeAddress} rollNumber={rollNumber} action="Update"
                />
            </div>


        </>
    );
}

export { AddStudent, EditStudent }
