import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg fw-bold bg-dark fixed-top">
                <div className="container">
                    <a className="navbar-brand text-light" href="#">ETaskMan</a>
                    <button className="navbar-toggler"
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
                                <a className="nav-link fw-bold fs-5 text-light" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bolder fs-5 text-light" href="#">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bolder fs-5 text-light" href="#">Log In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
