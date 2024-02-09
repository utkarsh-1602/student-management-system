import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../component/css/form.css'
import FormLayout from './FormLayout'
import Moment from 'moment';
import { getstudent } from "../actions/studentAction";

function MyDetails() {
    const mystyle2 = {
        visibility: "hidden"
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
                    path="/"
                    handleChange={handleChange} updateData={updateData} mystyle2={mystyle2}
                    setName={setName} setEmail={setEmail} setPhone={setPhone} setCity={setCity} setGender={setGender} setClass={setClass}
                    setBirthdate={setBirthdate} setState={setState} setZip={setZip} setStreet={setStreet}
                    title="Edit student data" name={name} email={email} birthdate={birthdate} class={class_} phone={phone} street={street} state={state} city={city} zip={zip} action="Update"
                />
            </div>
        </>
    );

}
export default MyDetails;
