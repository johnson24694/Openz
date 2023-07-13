import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
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
                console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
                
            });
    };

return (
    <div>
        <h2>Register New User</h2>
        <form className="col-6 mx-auto" onSubmit={submitHandler}>
            <div>
                <label className='form-label'>First Name:</label>
                <input  className='form-control' type="text" onChange={changeHandler} value={user.firstName} name="firstName"/>
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div>
                <label className='form-label'>Last Name:</label>
                <input  className='form-control' type="text" onChange={changeHandler} value={user.lastName} name="lastName" />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <div>
                <label className='form-label'>Email:</label>
                <input className='form-control' type="email" onChange={changeHandler} value={user.email} name="email" />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={user.password} name="password" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label className='form-label'>Confirm Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={user.confirmPassword} name="confirmPassword"/>
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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