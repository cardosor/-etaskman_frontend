import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createProject } from '../../Utilities/project-service';

import './ProjectForm.css';

const ProjectForm = ({ user, open, onClose }) => {

    const [project, setProject] = useState({
        title: '',
        description: '',
        owners: [{ "_id": user._id, fname: user.fname, lname: user.lname, role: 7 }],
        active:true,
        board: {
            cardcolor: "", workflow: {
                0: "Back Log",
                1: "To Do",
                2: "In Progress",
                3: "Verify",
                4: "Done",
            }
        }
    });

    if (!open) return null;

    const colors = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"]


    const resetForm = () => {
        setProject({
            title: '',
            description: '',
            owners: [{ "_id": user._id, fname: user.fname, lname: user.lname, role: 7 }],
            active:true,
            board: {
                cardcolor: "", workflow: {
                    0: "Back Log",
                    1: "To Do",
                    2: "In Progress",
                    3: "Verify",
                    4: "Done"
                }
            }
        });
    }


    const closeModal = (e) => {
        resetForm()
        onClose();
    }

    const handleChangeWorkFlow = (e) => {
        setProject({ ...project, board: { ...project.board, workflow: { ...project.board.workflow, [e.target.name]: e.target.value } } })
    }

    const handleRemoveStep = (e) => {
        const numSteps = Object.keys(project.board.workflow).length;
        if(numSteps < 3) return;
        delete project.board.workflow[numSteps-1];
        setProject({ ...project, board: { ...project.board, workflow: {...project.board.workflow} } })
    }

    const handleAddStep = (e) => {
        const numSteps = Object.keys(project.board.workflow).length;
        project.board.workflow[numSteps] = "";
        setProject({ ...project, board: { ...project.board, workflow: {...project.board.workflow} } })
    }

    const handleChangeColor = (e) => {
        setProject({ ...project, board: { cardcolor: e.target.value, workflow: project.board.workflow } });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await createProject(project);
        if (result.status === 200) {
            user.projects.push(result.data);
            onClose()
        } else {
            console.log("Try again later");
        }
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    return createPortal(
        <>
            <div className='project-form-overlay' onClick={onClose}>
                <div className={`row project-form border-left-${project.board.cardcolor}`} onClick={e => e.stopPropagation()}>
                    <form className="g-3 needs-validation mx-auto noValidate" onSubmit={handleSubmit}>
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom01" className="form-label fw-bold">Project title</label>
                            <input type="text" onChange={handleChange} className="form-control" id="validationCustom01" name="title" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom02" className="form-label fw-bold">Project Description</label>
                            <textarea type="text" onChange={handleChange} className="form-control" id="validationCustom02" name="description" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="color-palette">

                            {
                                colors.map((color, index) =>
                                    <div className="form-check form-check-inline" key={index}>
                                        <input onClick={handleChangeColor} className="form-check-input" type="radio" value={color} name="cardcolor" id={`flexRadioDefault${index}`} />
                                        <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                                            <i className={`bi bi-palette text-${color}`}></i>
                                        </label>
                                    </div>
                                )
                            }
                        </div>



                        <div className="our-work-process">
                            <div className="text-center">
                            <i className="bi bi-dash-square fs-3" onClick={handleRemoveStep}></i> <span className='workflow-text'>Workflow</span> <i className="bi bi-plus-square fs-3" onClick={handleAddStep}></i>  
                            </div>
                            <div className="work-flow-container">

                                {
                                    Object.values(project.board.workflow).map((value, index) =>
                                        <div className="step-box" key={index}>
                                            <span className="step-number">{index + 1}</span>
                                            <input type="text" className="step-name fw-bold" onChange={handleChangeWorkFlow} name={`${index}`} value={value} required />
                                            <div className="invalid-feedback">
                                                Please enter step name.
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>





                        <div className="row mb-3">
                            <div className="col-6 text-center">
                                <button className="btn btn-secondary mt-2 fw-bold" type="button" onClick={closeModal}>Close</button>
                            </div>
                            <div className="col-6 text-center">
                                <button className="btn btn-primary mt-2 fw-bold" type="submit">Create</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </>, document.getElementById("portal")
    );
}

export default ProjectForm;
