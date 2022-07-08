import { React, useEffect } from 'react'
import './Pricing.css'

const Pricing = ({ setPage }) => {

    useEffect(() => {
        setPage("pricing");
    }, [])

    return (
        <div>
            <div className="container-fluid pricing-table">
                <div className="container p-5">
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-12 mt-4">
                            <div className="card card1 h-100">
                                <div className="card-body">

                                    <h5 className="card-title">Basic</h5>
                                    <small className='text-muted'>Individual</small>
                                    <br></br>
                                    <span className="h2">$0</span>/month
                                    <div className="d-grid my-3"></div>
                                    <ul>
                                        <li>Max of 3 Projects</li>
                                        <li>Unlimited Tasks</li>
                                        <li>Work Solo on Projects</li>

                                    </ul>
                                </div>


                            </div>

                        </div>
                        <div className="col-lg-6 col-md-12 mt-4">
                            <div className="card card1 h-100">
                                <div className="card-body">

                                    <h5 className="card-title">Pro</h5>
                                    <small className='text-muted'>Individual</small>
                                    <br></br>
                                    <span className="h2">$0.99</span>/month
                                    <div className="d-grid my-3"></div>
                                    <ul>
                                        <li>Unlimited Projects</li>
                                        <li>Unlimited Tasks</li>
                                        <li>Work as a Team on Projects*</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-6 col-md-12">
                            </div>
                            <div className="col-lg-6 col-md-12 ps-4">
                                <p>*Team members do not need to have a Pro account.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
