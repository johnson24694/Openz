import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";

const EditForm= (props) => {
    
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); 
    const [dateOpen, setDateOpen] = useState("");
    const [timeOpen, setTimeOpen] = useState("");
    const [favorite, setFavorite] = useState("");
    const [notes, setNotes] = useState("");
    const {id} = useParams();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/house/' + id)
            .then(res => {
                setName(res.data.name);
                setLocation(res.data.location);
                setDateOpen(res.data.dateOpen);
                setTimeOpen(res.data.timeOpen);
                setFavorite(res.data.favorite);
                setNotes(res.data.notes);
            })
            .catch(err => console.log(err))
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/house/${id}`, {
            name,
            location,
            dateOpen,
            timeOpen,
            favorite,
            notes
        })
            .then((res)=>{
                console.log(res);
                navigate("/dashboard")
            })
            .catch((err)=> {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            });
    }
    
    return (
        <form className="mt-5 px-3 py-4" onSubmit={onSubmitHandler}>
            <h2 className="h1 display-1">Edit {name}</h2>
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
                <input type="date"  name="dateOpen" placeholder="Date goes here" value={dateOpen}  onChange = {(e)=>setDateOpen(e.target.value)}/>
                {errors.dateOpen ? <p>{errors.dateOpen.message}</p> : null}
            </p>
            <p>
                <label>Time Open</label><br/>
                <input type="time" name="timeOpen" placeholder="Time goes here" value={timeOpen} onChange = {(e)=>setTimeOpen(e.target.value)}/>
                {errors.timeOpen ? <p>{errors.timeOpen.message}</p> : null}
            </p>
            <p>
                <label>Favorite</label><br/>
                <input type="checkbox" name="favorite" placeholder="Time goes here" checked={favorite} onChange = {(e)=>setFavorite(e.target.checked)}/>
                {errors.favorite ? <p>{errors.favorite.message}</p> : null}
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
export default EditForm;
