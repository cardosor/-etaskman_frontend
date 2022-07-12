import React from 'react';
import { useEffect, useState } from 'react';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import ProjectForm from '../../Components/ProjectForm/ProjectForm';
import { fetchUser } from '../../Utilities/users-service';


import './Dashboard.css'
const Dashboard = ({ setUser, user, setPage }) => {

    const [isOpenProjectForm, setIsOpenProjectForm] = useState(false)
    const [reloadBoard, setReloadBoard] = useState("")
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        setPage("dashboard");
       (async()=>{
        const gotUser = await fetchUser(user._id);
        gotUser.projects.forEach(el => el.selected = false);
        setUser(gotUser);
        setToggle(!toggle);
       })()
    }, [])

    return (
        <>
        <ProjectForm user={user} open={isOpenProjectForm} onClose={()=>(setIsOpenProjectForm(false))}/>
        <div className='dashboard-container mt-5'>
            <div className="card border-left-info shadow project-card" onClick={()=> setIsOpenProjectForm(true)}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold  mb-1">
                                <h4 className='text-center'>Create a new project.</h4>
                            </div>
                            <div className="d-flex h5 font-weight-bold" style={{height: "120px"}}>
                                <i className="bi bi-file-earmark-plus my-auto mx-auto fs-1"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                toggle &&
                user.projects.map(project =>
                    <ProjectCard setReloadBoard={setReloadBoard} user={user}  project={project} key={project._id}/>
                )
            }




            {/* <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Earnings (Annual)</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2 ">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                        </div>
                                        <div className="col">
                                            <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar"
                                                            style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Pending Requests</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
        </div>

        </>
    );
}

export default Dashboard;
