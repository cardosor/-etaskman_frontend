import React from 'react';
import './Project.css'

const Project = () => {
    return (
        <div className="card border-left-info shadow  project-card">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold  mb-1">
                            <h4>Hello world</h4>
                        </div>
                        <div className="h5 font-weight-bold">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem eos quo earum assumenda consectetur. Quod.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
