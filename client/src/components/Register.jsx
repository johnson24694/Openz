import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }) 

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/dashboard')
            })
            .catch ((err) => {
                console.log(err);
            })
    }


  return (
    <div>
        <h2>Register New User</h2>
        <form className="col-6 mx-auto" onSubmit={submitHandler}>
            <div>
                <label className='form-label'>First Name:</label>
                <input  className='form-control' type="text" onChange={changeHandler} value={user.firstName} name="firstName"/>
            </div>
            <div>
                <label className='form-label'>Last Name:</label>
                <input  className='form-control' type="text" onChange={changeHandler} value={user.lastName} name="lastName" />
            </div>
            <div>
                <label className='form-label'>Email:</label>
                <input className='form-control' type="email" onChange={changeHandler} value={user.email} name="email" />
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={user.password} name="password" />
            </div>
            <div>
                <label className='form-label'>Confirm Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={user.confirmPassword} name="confirmPassword"/>
            </div>
            <br/>
            <button  className='btn btn-info mt-3'>Register</button>
        </form>
        <br/>
        <Link to={'/login'}>Already have an account?</Link>
    </div>
  )
}

export default Register