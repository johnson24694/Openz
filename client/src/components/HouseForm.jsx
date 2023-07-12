import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const HouseForm= (props) => {
    
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); 
    const [dateOpen, setDateOpen] = useState("");
    const [timeOpen, setTimeOpen] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/houses', {
            name,
            location,
            dateOpen,
            timeOpen,
            notes
        })
            .then(res=>{
                console.log(res);
                navigate('/dashboard')
            })
            .catch((err)=> {
            console.log(err.response.data.err.errors)
            setErrors(err.response.data.err.errors)
        });
    }
    
    return (
        <form className="mt-5 px-3 py-4" onSubmit={onSubmitHandler}>
            <h2 className="h1 display-1">Add an Open House!</h2>
            <p>
                <label>Name</label><br/>
                <input type="text" name="name" placeholder="Name goes here" value={name} onChange = {(e)=>setName(e.target.value)}/>
                {errors.name ? <p>{errors.name.message}</p> : null}
            </p>
            <p>
                <label>Location</label><br/>
                <input type="text" name="location" placeholder="Location goes here" value={location}  onChange = {(e)=>setLocation(e.target.value)}/>
                {errors.location ? <p>{errors.location.message}</p> : null}
            </p>
            <p>
                <label>Date Open</label><br/>
                <input type="date"  name="dateOpen" placeholder="Date open goes here" value={dateOpen}  onChange = {(e)=>setDateOpen(e.target.value)}/>
                {errors.dateOpen ? <p>{errors.dateOpen.message}</p> : null}
            </p>
            <p>
                <label>Time Open</label><br/>
                <input type="time" name="timeOpen" placeholder="Time goes here" value={timeOpen} onChange = {(e)=>setTimeOpen(e.target.value)}/>
                {errors.timeOpen ? <p>{errors.timeOpen.message}</p> : null}
            </p>
            <p>
                <label>Notes</label><br/>
                <input type="textarea" name="notes" placeholder="Notes go here" value={notes} onChange = {(e)=>setNotes(e.target.value)}/>
                {errors.notes ? <p>{errors.notes.message}</p> : null}
            </p>
            <input className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2" type="submit"/>
            <Link to={`/dashboard`}><button className="btn btn-danger btn-lg mx-3 px-5 py-3 mt-2">Cancel</button></Link>
        </form>
        
    )
}
export default HouseForm;