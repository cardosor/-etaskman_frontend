import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({ user, setUser, logout }) => {
    console.log("nav bar ", user)
    return (


        <>
            <nav className="navbar navbar-expand-lg fw-bold bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand text-light" to="/">ETaskMan</Link>
                    <button className="navbar-toggler bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler"
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse fw-bold fs-5" id="navbarToggler">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold fs-5 text-light" to="/pricing">Pricing</Link>
                            </li>
                            {
                                user ?
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bolder fs-5 text-light" onClick={()=>{setUser(null);logout()}} to="/">Log Out</Link>
                                    </li>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder fs-5 text-light" to="/signup">Sign Up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder fs-5 text-light" to="/login">Log In</Link>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
