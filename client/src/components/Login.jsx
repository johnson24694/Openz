import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [userLogin, setUserLogin] = useState({
        email: "",
        password:"",
    })

    const changeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]:e.target.value})
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res);
                console.log("User is logged in")
                navigate('/dashboard')
            })
            .catch ((err) => {
                console.log(err);
                console.log(err.response.data)
                setErrors(err.response.data.errors)
            });
    };

return (
    <div>
        <h2>Login</h2>
        <form className= 'col-6 mx-auto' onSubmit={loginHandler}>
            <div>
                <label className='form-label'>Email:</label>
                <input className='form-control' type="email" onChange={changeHandler} value={userLogin.email} name="email"/>
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={userLogin.password} name="password" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <br/>
            <button className='btn btn-info mt-3'>Login</button>       
        </form>
        <br/>
        <Link to={'/register'}>Don't have an account? Click here to sign up.</Link>
    </div>
  )
}

export default Login