import './LogIn.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../Utilities/users-service'
import { Link } from 'react-router-dom'

const LogIn = ({ setUser }) => {

    const navigate = useNavigate();
    const [inputType, setInputType] = useState("password");
    const [message, setMessage] = useState("")
    const [credendials, setCredendials] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setMessage("");
        setCredendials({
            ...credendials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credendials.email)) {
            setMessage("Please enter a valid email address.");
        } else {
            try {
                const user = await login(credendials);
                if (user === "bad credentials") {
                    setMessage("The username or password is incorrect.");
                } else {
                    if (user.active === true) {
                        setUser(user);
                        navigate('/');
                    } else {
                        throw new Error;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const showPassword = () => {
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
                        <label htmlFor="validationCustomUsername" className="form-label fw-bold">Email</label>
                        <div className="input-group has-validation">
                            <input type="text"
                                onChange={handleChange}
                                className="form-control"
                                id="validationCustomUsername"
                                aria-describedby="inputGroupPrepend"
                                name="email"
                                required />
                            <div className="invalid-feedback">
                                Please enter email.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mt-2 p-2 w-100">
                        <label htmlFor="validationCustomPassword" className="form-label fw-bold">Password</label>
                        <div className="input-group has-validation">
                            <input
                                type={inputType}
                                className="form-control"
                                id="validationCustomPassword"
                                name="password"
                                onChange={handleChange}
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
                        <div class="col-md-4 mt-2 p-2 w-100">
                            <div class="alert alert-danger text-center" role="alert">
                                {message}
                            </div>
                        </div>
                    }
                    <div className="col-4 text-center w-100">
                        <button className="btn btn-primary mt-2 fw-bold" type="submit">Log In</button>
                    </div>
                    <div className="col-4 text-center w-100">
                        <p className="mt-5 fw-bold" >Don't have an account? <Link class="text-decoration-none" to="/signup">Create an account</Link>.</p>
                    </div>
                </form>
            </div>

        </>
    );
}

export default LogIn;
