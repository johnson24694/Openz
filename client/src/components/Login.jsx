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
            <div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"> <img src = "https://cdn-icons-png.flaticon.com/128/846/846449.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"></img>       Openz</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <div class="nav-link active">Welcome Back</div>
                            <Link to={`/register`} class="nav-link" aria-current="page">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        <h2 className="h6 display-6">Login</h2>
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
            <button className='btn btn-primary btn-md mx-3 px-4 py-2 mt-1'>Login</button>       
        </form>
        <br/>
    </div>
  )
}

export default Login