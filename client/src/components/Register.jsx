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
        <div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"> <img src = "https://cdn-icons-png.flaticon.com/128/846/846449.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"></img>       Openz</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <Link to={`/login`} class="nav-link active" aria-current="page">Log In</Link>
                            </div>
                        </div>
                    </div>
                </nav>
        </div>
        <h2 className="h6 display-6">Register</h2>
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
            <button  className='btn btn-primary btn-md mx-3 px-4 py-2 mt-1'>Register</button>
        </form>
        <br/>
    </div>
  )
}

export default Register