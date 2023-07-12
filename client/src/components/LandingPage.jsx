import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const LandingPage= (props) => {
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState(""); 
    const [instructions, setInstructions] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/houses', {
            name,
            description,
            instructions,
            cookTime
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
            <h2 className="h1 display-1">Openz</h2>
            <h4>All your open houses.  All in one place.</h4>
             <div>
                <h6>New here?</h6>
                <Link to={`/register`}>Register Now</Link>
             </div>
             <div>
                <h6>Welcome Back</h6>
                <Link to={`/login`}>Log in</Link>
             </div>
    
            {/* <p>
                <label>Name</label><br/>
                <input type="text" name="name" placeholder="Name goes here" value={name} onChange = {(e)=>setName(e.target.value)}/>
                {errors.name ? <p>{errors.name.message}</p> : null}
            </p>
            <p>
                <label>Description</label><br/>
                <input type="text" name="description" placeholder="Description goes here" value={description}  onChange = {(e)=>setDescription(e.target.value)}/>
                {errors.description ? <p>{errors.description.message}</p> : null}
            </p>
            <p>
                <label>Instructions</label><br/>
                <input type="text"  name="instructions" placeholder="Instructions go here" value={instructions}  onChange = {(e)=>setInstructions(e.target.value)}/>
                {errors.instructions ? <p>{errors.instructions.message}</p> : null}
            </p>
            <p>
                <label>Cook Time</label><br/>
                <input type="number" name="cookTime" placeholder="Cook time goes here" value={cookTime} onChange = {(e)=>setCookTime(e.target.value)}/>
                {errors.cookTime ? <p>{errors.cookTime.message}</p> : null}
            </p> */}
            {/* <input className="btn btn-primary btn-lg mx-3 px-5 py-3 mt-2" type="submit"/>
            <Link to={`/dashboard`}><button className="btn btn-danger btn-lg mx-3 px-5 py-3 mt-2">Cancel</button></Link> */}
        </form>
        
    )
}
export default LandingPage;