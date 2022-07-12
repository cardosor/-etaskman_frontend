import './Footer.css'
import React from 'react';

const Footer = () => {
    return (
        <>
        <footer className='footer bg-dark '>
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h4 className="mt-3 text-light fw-bold">Easy Task Manager</h4>
                            <ul className="footer-list">
                                <li className='fw-semibold text-light'>Simple tool to manage tasks for any project. 
                                Based in Kanban methodology which is a popular Lean workflow management method for defining, managing, and improving services.
                                Let's uncomplicate task management.</li>
                            </ul>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h4 className="mt-3 text-light fw-bold">Contatc Us</h4>
                            <ul className="footer-list">
                                <li className='fw-semibold text-light'>contatc@etaskman.com</li>
                                <li className='fw-semibold text-light'>support@etaskman.com</li>
                            </ul>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h4 className="mt-3 text-light fw-bold">More</h4>
                            <ul className="footer-list">
                                <li className='fw-semibold text-light'>Privacy Policy</li>
                                <li className='fw-semibold text-light'>Terms</li>
                                <li className='fw-semibold text-light'>Copyright &copy; 2022 ETaskMan</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </footer>
            
        </>
    );
}

export default Footer;
