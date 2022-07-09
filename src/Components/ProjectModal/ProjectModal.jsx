import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { updateProject, deleteProject } from '../../Utilities/project-service';


const ProjectModal = ({ setReloadBoard, user, currentProject, open, onClose }) => {

    const [project, setProject] = useState(currentProject);

    if (!open) return null;

    const closeModal = (e) => {
        onClose();
    }

    const handleChangeWorkFlow = (e) => {
        setProject({ ...project, board: { ...project.board, workflow: { ...project.board.workflow, [e.target.name]: e.target.value } } })
        //console.log(e.target.value)
        //project.board.workflow[e.target.name] = e.target.value
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log("delete");
        const result = await deleteProject(project);
        console.log("result delete ", result);
        if (result.status === 200) {
            console.log("result ", result.data);
            const index = user.projects.findIndex((element)=> element._id === result.data._id)
            console.log(user.projects);
            user.projects.splice(index, 1);
            setReloadBoard(Date.now());
            onClose()
        } else {
            console.log("Try again later");
        }
        console.log(user)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const result = await updateProject(project);
        if (result.status === 200) {
            console.log("result ", result.data);
            const index = user.projects.findIndex((element)=> element._id === result.data._id)
            user.projects[index] = result.data;
            setReloadBoard(Date.now());
            onClose()
        } else {
            console.log("Try again later");
        }
        console.log(user)
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    console.log("project modal Current", currentProject);
    console.log("project modal", project);
    return createPortal(
        <>
            <div className='project-form-overlay' onClick={onClose}>
                <div className={`row project-form border-left-${project.board.cardcolor}`} onClick={e => e.stopPropagation()}>
                    <form className="g-3 needs-validation mx-auto noValidate">
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom01" className="form-label fw-bold">Project title</label>
                            <input type="text" onChange={handleChange} className="form-control" id="validationCustom01" name="title" value={project.title} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom02" className="form-label fw-bold">Project Description</label>
                            <textarea type="text" onChange={handleChange} className="form-control" id="validationCustom02" value={project.description} name="description" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        


                        <div className="our-work-process">
                            <div className="text-center">
                            <span className='workflow-text'>Workflow</span>  
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
                            <div className="col-3 text-center">
                                <button className="btn btn-secondary mt-2 fw-bold" onClick={closeModal}>Close</button>
                            </div>
                            <div className="col-3 text-center">
                                <button className="btn btn-danger mt-2 fw-bold" onClick={handleDelete}>Delete</button>
                            </div>
                            <div className="col-3 text-center">
                                <button className="btn btn-warning mt-2 fw-bold" onClick={handleUpdate}>Update</button>
                            </div>
                            <div className="col-3 text-center">
                                <button className="btn btn-primary mt-2 fw-bold" type="submit">Open</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </>, document.getElementById("portal")
    );
}

export default ProjectModal;
