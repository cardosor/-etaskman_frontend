import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createTask } from '../../Utilities/task-service';

import './TaskForm.css';

const TaskForm = ({project, setProject, user, isOpenTaskForm, onClose }) => {

    const [task, setTask] = useState({
        title: '',
        description: '',
        owners: [{ "_id": user._id, fname: user.fname, lname: user.lname, role: 7 }],
        status: 0,
        active:true,
        properties: {
            cardcolor: ""
        }
    });

    if (!isOpenTaskForm) return null;

    const colors = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"]


    const resetForm = () => {
        setTask({
            title: '',
            description: '',
            owners: [{ "_id": user._id, fname: user.fname, lname: user.lname, role: 7 }],
            status: 0,
            active:true,
            properties: {
                cardcolor: ""
            }
        });
    }


    const closeModal = (e) => {
        resetForm()
        onClose();
    }

    const handleChangeColor = (e) => {
        setTask({ ...task, properties: { cardcolor: e.target.value} });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        task.project = project._id;
        const result = await createTask(task);
        if (result.status === 200) {
            const index = user.projects.findIndex((element)=> element._id === project._id);
            user.projects[index].tasks.push(result.data);
            setProject({...project, ["tasks"]:[...project.tasks, result.data]});
            onClose()
        } else {
            console.log("Try again later");
        }
        console.log(user)
    }

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    return createPortal(
        <>
            <div className='task-form-overlay' onClick={onClose}>
                <div className={`row task-form border-left-${task.properties.cardcolor}`} onClick={e => e.stopPropagation()}>
                    <form className="g-3 needs-validation mx-auto noValidate" onSubmit={handleSubmit}>
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom01" className="form-label fw-bold">task title</label>
                            <input type="text" onChange={handleChange} className="form-control" id="validationCustom01" name="title" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom02" className="form-label fw-bold">task Description</label>
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

                        <div className="row mb-3">
                            <div className="col-6 text-center">
                                <button className="btn btn-secondary mt-2 fw-bold" type="button"  onClick={closeModal}>Close</button>
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

export default TaskForm;
