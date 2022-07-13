import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {showMaxWords} from '../../HelperFuncs/HelperFuncs';

const Navbar = ({ user, setUser, logout, page, setPage }) => {

    const [pName, setPName] = useState(null);

    useEffect(() => {
        setPName(null);
        if (page !== 'board') return;
        let projectIndex = null;
        if (!user.projects) return;
        //Finds the task that was selected in the dash board
        user.projects.map((project, index) => {
            if (project.selected === true) {
                projectIndex = index;
            }
            return null;
        });
        if (projectIndex === null) return;
        setPName(user.projects[projectIndex].title);
    })
    return (
        <>
            <nav className="navbar navbar-expand-lg fw-bold bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand text-light fs-3" to="/" onClick={() => setPage("home")}>ETaskMan</Link>
                    {
                        pName &&
                        <li className="nav-item">
                            <a className="nav-link text-light disabled fs-3"><i className="bi bi-arrow-bar-right"></i> {showMaxWords(pName, 40)}</a>
                        </li>
                    }


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
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "profile" ? 'text-warning' : 'text-light'} btn btn-primary user-account-btn`} aria-current="page" to="/profile"><i className={`bi bi-person-circle ${page === "profile" ? 'text-warning' : 'text-light'}`}> </i>{user.fname.trim()[0]}{user.lname.trim()[0]}</Link>

                                        </li>

                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "dashboard" ? 'text-warning' : 'text-light'}`} to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-bolder fs-5 text-light" onClick={() => { setUser(null); logout() }} to="/">Log Out</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "pricing" ? 'text-warning' : 'text-light'}`} to="/pricing">Pricing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "signup" ? 'text-warning' : 'text-light'}`} to="/signup">Sign Up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link fw-bolder fs-5 ${page === "login" ? 'text-warning' : 'text-light'}`} to="/login">Log In</Link>
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
