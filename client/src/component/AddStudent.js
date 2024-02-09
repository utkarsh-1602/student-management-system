import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getstudent, updatestudent } from "../actions/studentAction";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import FormLayout from './FormLayout'
import Moment from 'moment';
import { addStudent } from "../actions/studentAction";



function AddStudent() {
    const mystyle = {
        visibility:"hidden"
      };
    let { id } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [class_, setClass] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [fathersName, setFathersName] = useState("")
    const [mothersName, setMothersName] = useState("")
    const [age, setAge] = useState("")
    const [homeAddress, setHomeAddress] = useState("")
    const [date, setDate] = useState("")

    const student = useSelector((state) => state.student.student);
    const craeteStudent = (e) => {
        e.preventDefault();
        const new_student = {
            //   id: shortid.generate(),
            name: name,
            email: email,
            fathersName: fathersName,
            mothersName: mothersName,
            age: age,
            homeAddress: homeAddress,
            date: date,
            gender: gender,
            class: class_,
            street: street,
            state: state,
            zip: zip,
            phone: phone,
            birthdate: birthdate,
        };
        dispatch(addStudent(new_student));
        history.push("/students");
    };
    return (
        <>

            <FormLayout
                title="Add new student"
                mystyle={mystyle}
                // path="/students"
                name={name} email={email} fathersName={fathersName} mothersName={mothersName} age={age} homeAddress={homeAddress} date={date} birthdate={birthdate} class={class_} phone={phone} street={street} state={state} city={city} zip={zip} 
                setName={setName} setEmail={setEmail} setFathersName={setFathersName} setMothersName = {setMothersName} setHomeAddress={setHomeAddress} setAge={setAge} setDate={setDate} setPhone={setPhone} setCity={setCity} setGender={setGender} setClass={setClass}
                setBirthdate={setBirthdate} setState={setState} setZip={setZip} setStreet={setStreet}
                updateData={craeteStudent}
                action="Create"
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
    const [gender, setGender] = useState("")
    const [class_, setClass] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const student = useSelector((state) => state.student.student);

    function handleChange(e) {
        setEmail(e)
        console.log("event");
        console.log(e);
    }
    useEffect(() => {

        if (student != null) {
            setName(student.name);
            setGender(student.gender);
            setClass(student.class);
            setBirthdate(Moment(student.birthdate).format('YYYY-MM-DD'))
            setStreet(student.street)
            setCity(student.city)
            setState(student.state)
            setZip(student.zip)
            setEmail(student.email);
            setPhone(student.phone);

        }
        dispatch(getstudent(id));
    }, [student]);
    const updateData = (e) => {
        e.preventDefault();

        const updated_student = Object.assign(student, {
            name: name,
            email: email,
            gender: gender,
            class: class_,
            street: street,
            state: state,
            zip: zip,
            phone: phone,
            birthdate: birthdate

        })

        history.push("/students")
    }
    return (


        <>
            <div className="card border-0 shadow">
                <FormLayout
                mystyle={mystyle}
                path="/students"
                    handleChange={handleChange} updateData={updateData}
                    setName={setName} setEmail={setEmail} setPhone={setPhone} setCity={setCity} setGender={setGender} setClass={setClass}
                    setBirthdate={setBirthdate} setState={setState} setZip={setZip} setStreet={setStreet}
                    title="Edit student data" name={name} email={email} birthdate={birthdate} class={class_} phone={phone} street={street} state={state} city={city} zip={zip} action="Update"
                />
            </div>


        </>
    );
}

export { AddStudent, EditStudent }
