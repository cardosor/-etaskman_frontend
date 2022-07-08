import './SignUp.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { signUp } from '../../Utilities/users-service'
import { Link } from 'react-router-dom'

const SignUp = ({ setUser, setPage }) => {

    useEffect(() => {
        setPage("signup");
    }, [])

    const navigate = useNavigate();
    const [inputType, setInputType] = useState("password");
    const [message, setMessage] = useState("")
    const [newUser, setNewUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        active: true,
    });

    const handleChange = e => {
        console.log(newUser)
        if(message) setMessage("");
        
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newUser.email)) {
            setMessage("Please enter a valid email address.");
        }else if(newUser.password.length < 6){
            setMessage("Passwords must be at least 6 characters long.");
        }else{
            try {
                const res = await signUp(newUser);
                setUser(res);
                if (res.active === true) navigate('/dashboard')
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const showPassword = ( { setPage } ) => {
        if (inputType === 'password') {
            setInputType('text')
        } else {
            setInputType('password')
        }
    }

    return (
        <>
            <div className="row signup-form d-flex justify-content-center align-items-center">
                <form className="col-md-4 g-3 needs-validation mx-auto noValidate" onSubmit={handleSubmit}>
                    <div className="col-md-4 mt-2 p-2 w-100">
                        <label htmlFor="validationCustom01" className="form-label fw-bold">First name</label>
                        <input type="text" onChange={handleChange} className="form-control" id="validationCustom01" name="fname" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4 mt-2 p-2 w-100">
                        <label htmlFor="validationCustom02" className="form-label fw-bold">Last name</label>
                        <input type="text" onChange={handleChange} className="form-control" id="validationCustom02" name="lname" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4 mt-2 p-2 w-100">
                        <label htmlFor="validationCustomUsername" className="form-label fw-bold">Email</label>
                        <div className="input-group has-validation">
                            <input type="text" onChange={handleChange} className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" name="email" required />
                            <div className="invalid-feedback">
                                Please enter email.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-2 p-2 w-100">
                        <label htmlFor="validationCustomPassword" className="form-label fw-bold">Create a Password</label>
                        <div className="input-group has-validation">
                            <input
                                type={inputType}
                                className="form-control"
                                id="validationCustomPassword"
                                name="password"
                                onChange={handleChange}
                                value={newUser.password}
                                required
                            />
                            <span className="input-group-text" onClick={showPassword}>
                                <i className="bi bi-eye-slash" aria-hidden="true"></i>
                            </span>
                            <div className="invalid-feedback">
                                Please enter a password.
                            </div>
                        </div>
                    </div>

                    {
                        message &&
                        <div className="col-md-4 mt-2 p-2 w-100">
                            <div className="alert alert-danger text-center" role="alert">
                                {message}
                            </div>
                        </div>
                    }

                    <div className="col-4 text-center w-100">
                        <button className="btn btn-primary mt-2 fw-bold" type="submit">Sign Up</button>
                    </div>
                    <div className="col-4 text-center w-100">
                        <p className="mt-5 fw-bold" >Already have an account? <Link className="text-decoration-none" to="/login">Log In</Link>.</p>
                    </div>
                </form>


            </div>

        </>
    );
}

export default SignUp;
