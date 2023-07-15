import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const HouseForm= (props) => {
    
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); 
    const [dateOpen, setDateOpen] = useState("");
    const [timeOpen, setTimeOpen] = useState("");
    const [favorite, setFavorite] = useState(false);
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
            favorite,
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

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then(res => {
                navigate('/')
                console.log('User is logged out')
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return (
    <div>
            <div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand text-openz1" href="#"> <img src = "https://cdn-icons-png.flaticon.com/128/846/846449.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"></img>       Openz</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <Link to={`/dashboard`} class="nav-link active" aria-current="page">View All Houses</Link>
                            <a href="#" onClick={logout} class="nav-link" aria-current="page">Log Out</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        <div className='container-size'>
        <form className="form-sizing" onSubmit={onSubmitHandler}>
            <h2 className="h6 display-6 text-openz3">Add an Open House</h2>
            <div className='mb-3'>
            <p>
                <label>Name</label><br/>
                <input className="form-control form-control-md" type="text" name="name" placeholder="Name goes here" value={name} onChange = {(e)=>setName(e.target.value)}/>
                {errors.name ? <p>{errors.name.message}</p> : null}
            </p>
            <p>
                <label>Location</label><br/>
                <input className="form-control form-control-md " type="text" name="location" placeholder="Location goes here" value={location}  onChange = {(e)=>setLocation(e.target.value)}/>
                {errors.location ? <p>{errors.location.message}</p> : null}
            </p>
            <p>
                <label>Date Open</label><br/>
                <input className="form-control form-control-md " type="date"  name="dateOpen" placeholder="Date open goes here" value={dateOpen}  onChange = {(e)=>setDateOpen(e.target.value)}/>
                {errors.dateOpen ? <p>{errors.dateOpen.message}</p> : null}
            </p>
            <p>
                <label>Time Open</label><br/>
                <input className="form-control form-control-md " type="time" name="timeOpen" placeholder="Time goes here" value={timeOpen} onChange = {(e)=>setTimeOpen(e.target.value)}/>
                {errors.timeOpen ? <p>{errors.timeOpen.message}</p> : null}
            </p>
            <p>
                <label>Favorite</label><br/>
                <input type="checkbox" name="favorite" placeholder="Check for favorite" checked={favorite} onChange = {(e)=>setFavorite(e.target.checked)}/>
                {errors.favorite ? <p>{errors.favorite.message}</p> : null}
            </p>
            <p>
                <label>Notes</label><br/>
                <input className="form-control form-control-md " type="textarea" name="notes" placeholder="Notes go here" value={notes} onChange = {(e)=>setNotes(e.target.value)}/>
                {errors.notes ? <p>{errors.notes.message}</p> : null}
            </p>
            </div>
            <input className="btn bg-openz2 btn-md mx-3 px-4 py-2 mt-1" type="submit"/>
        </form>
        </div>
    </div>
    )
}
export default HouseForm;