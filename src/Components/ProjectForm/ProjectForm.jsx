import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createProject } from '../../Utilities/project-service'

import './ProjectForm.css';

const ProjectForm = ({ user, open, onClose }) => {

    const [project, setProject] = useState({
        title: '',
        description: '',
        owners: [{ "_id": user._id, fname: user.fname, lname: user.lname, role: 7 }],
        board: { cardcolor: "info" }
    });

    if (!open) return null;

    const closeModal = (e) => {
        setProject({ ...project, board: { cardcolor: "" }});
        onClose();
    }

    const handleChangeColor = (e) => {
        console.log(e.target.value);
        setProject({ ...project, board: { cardcolor: e.target.value }});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await createProject(project);
        if (result.status === 200){
            user.projects.push(result.data);
        }else{
            console.log("Try again later");
        }
        console.log(user)
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
                        <div class="form-check form-check-inline">
                            <input onClick={handleChangeColor} class="form-check-input" type="radio" value="primary" name="cardcolor" id="flexRadioDefault1"/>
                                <label class="form-check-label" htmlFor="flexRadioDefault1">
                                <i class="bi bi-palette text-primary"></i>
                                </label>
                        </div>
                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="secondary" name="cardcolor" id="flexRadioDefault2" />
                                <label class="form-check-label" htmlFor="flexRadioDefault2">
                                <i class="bi bi-palette text-secondary"></i>
                                </label>
                        </div>
                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="success" name="cardcolor" id="flexRadioDefault3" />
                                <label class="form-check-label" htmlFor="flexRadioDefault3">
                                <i class="bi bi-palette text-success"></i>
                                </label>
                        </div>
                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="danger" name="cardcolor" id="flexRadioDefault4" />
                                <label class="form-check-label" htmlFor="flexRadioDefault4">
                                <i class="bi bi-palette text-danger"></i>
                                </label>
                        </div>
                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="warning" name="cardcolor" id="flexRadioDefault5" />
                                <label class="form-check-label" htmlFor="flexRadioDefault5">
                                <i class="bi bi-palette text-warning"></i>
                                </label>
                        </div>
                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="info" name="cardcolor" id="flexRadioDefault6" />
                                <label class="form-check-label" htmlFor="flexRadioDefault6">
                                <i class="bi bi-palette text-info"></i>
                                </label>
                        </div>
                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value='dark' name="cardcolor" id="flexRadioDefault7" />
                                <label class="form-check-label" htmlFor="flexRadioDefault7">
                                <i class="bi bi-palette text-dark"></i>
                                </label>
                        </div>

                        <div onClick={handleChangeColor} class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value='light' name="cardcolor" id="flexRadioDefault8" />
                                <label class="form-check-label" htmlFor="flexRadioDefault8">
                                <i class="bi bi-palette text-light"></i>
                                </label>
                        </div>
                        </div>



                        <div className="row mb-3">
                            <div className="col-6 text-center">
                                <button className="btn btn-secondary mt-2 fw-bold" onClick={closeModal}>Close</button>
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
