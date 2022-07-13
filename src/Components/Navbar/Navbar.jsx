import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({ user, setUser, logout, page, setPage }) => {

    
    return (
        <>
            <nav className="navbar navbar-expand-lg fw-bold bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand text-light fs-3" to="/" onClick={()=> setPage("home")}>ETaskMan</Link>
                    <button className="navbar-toggler bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarToggler"
                        aria-controls="navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse fw-bold fs-3" id="navbarToggler">
                        <ul className="navbar-nav ms-auto">

                            {
                                user ?
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "profile" ? 'text-warning' : 'text-light' } btn btn-primary user-account-btn`}  aria-current="page" to="/profile"><i className={`bi bi-person-circle ${page === "profile" ? 'text-warning' : 'text-light' }`}> </i>{user.fname.trim()[0]}{user.lname.trim()[0]}</Link>
                                            
                                        </li>

                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "dashboard" ? 'text-warning' : 'text-light' }`} to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder fs-5 text-light" onClick={() => { setUser(null); logout() }} to="/">Log Out</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className= {`nav-link fw-bolder fs-5 ${page === "pricing" ? 'text-warning' : 'text-light' }`} to="/pricing">Pricing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "signup" ? 'text-warning' : 'text-light' }`} to="/signup">Sign Up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "login" ? 'text-warning' : 'text-light' }`} to="/login">Log In</Link>
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
