import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='banner'>
                <p>&nbsp;</p>
                
                {/* <h1 className='fw-bold display-2 text-center banner-heading'>Easy Task Manager</h1> */}
                
                <div className='banner-heading'>
                    <div className='etm-logo'/>
                </div>
                <p className='text-light fw-bold text-center container fs-3'>A Simple tool to manage tasks for any project.
                    Based in Kanban methodology which is a popular Lean workflow management method for defining, managing, and improving services.
                </p>
                <p className='text-light fw-bold text-center container fs-3'>Let's uncomplicate task management.</p>
                <div className='text-center'>
                    <Link className='btn btn-primary banner-btn fw-bold' to="/signup">Get Started</Link>
                </div>
            </div>
            <section className='features mt-5 mb-5'>
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
        </>

    );
}

export default Home;
