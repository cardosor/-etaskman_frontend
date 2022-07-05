import React from 'react';

const Home = () => {
    return (
        <>
            <div className='banner'>
                <p>&nbsp;</p>
                <h1 className='fw-bold display-2 text-center banner-heading'>Easy Task Manager</h1>
                <p className='text-light fw-bold text-center container fs-3'>Simple tool to manage tasks for any project. 
                                Based in Kanban methodology which is a popular Lean workflow management method for defining, managing, and improving services.
                                <p>Let's uncomplicate task management.</p></p>
                <div className='text-center'>
                    <button className='btn btn-primary banner-btn fw-bold'>Get Started</button>
                </div>
            </div>
            <section className='features mt-5'>
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 features-img rounded mx-auto'></div>
                        <div className='col-lg-6 col-md-6 col-sm-12'>
                            <h1 className="fw-bolder">Features</h1>
                            <ul>
                                <li className='fw-semibold'>Easy-to-use interface</li>
                                <li className='fw-semibold'>Manage any type of project, workflow, or task tracking</li>
                                <li className='fw-semibold'>Fast learning curve, hit the ground running</li>
                                <li className='fw-semibold'>Free for individual use. Personal or commercial</li>
                                <li className='fw-semibold'>30 days free Premium account, No credit card needed</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
            <footer className='bg-dark mt-5'>
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h1 className="mt-3 text-light fw-bold">Easy Task Manager</h1>
                            <ul className="footer-list">
                                <li className='fw-semibold text-light'>Simple tool to manage tasks for any project. 
                                Based in Kanban methodology which is a popular Lean workflow management method for defining, managing, and improving services.
                                Let's uncomplicate task management.</li>
                            </ul>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h1 className="mt-3 text-light fw-bold">Constat Us</h1>
                            <ul className="footer-list">
                                <li className='fw-semibold text-light'>contact@etaskman.com</li>
                                <li className='fw-semibold text-light'>support@etaskman.com</li>
                            </ul>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <h1 className="mt-3 text-light fw-bold">More</h1>
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

export default Home;
