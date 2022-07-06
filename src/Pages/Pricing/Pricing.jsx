import React from 'react';
import './Pricing.css'

const Pricing = () => {
    return (
        <div>
            <div class="container-fluid pricing-table">
                <div class="container p-5">
                    <div class="row mt-4">
                        <div class="col-lg-6 col-md-12 mt-4">
                            <div class="card card1 h-100">
                                <div class="card-body">

                                    <h5 class="card-title">Basic</h5>
                                    <small class='text-muted'>Individual</small>
                                    <br></br>
                                    <span class="h2">$0</span>/month
                                    <div class="d-grid my-3"></div>
                                    <ul>
                                        <li>Max of 3 Projects</li>
                                        <li>Unlimited Tasks</li>
                                        <li>Work Solo on Projects</li>

                                    </ul>
                                </div>


                            </div>

                        </div>
                        <div class="col-lg-6 col-md-12 mt-4">
                            <div class="card card1 h-100">
                                <div class="card-body">

                                    <h5 class="card-title">Pro</h5>
                                    <small class='text-muted'>Individual</small>
                                    <br></br>
                                    <span class="h2">$0.99</span>/month
                                    <div class="d-grid my-3"></div>
                                    <ul>
                                        <li>Unlimited Projects</li>
                                        <li>Unlimited Tasks</li>
                                        <li>Work as a Team on Projects*</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div class="col-lg-6 col-md-12">
                            </div>
                            <div class="col-lg-6 col-md-12 ps-4">
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
