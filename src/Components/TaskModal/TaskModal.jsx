import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { updateTask, deleteTask } from '../../Utilities/task-service';

import './TaskModal.css';

const TaskModal = ({project, setProject, user, isOpenTaskModal, onClose }) => {

    const [task, setTask] = useState(isOpenTaskModal.task);

    useEffect(() => {    
        if(JSON.stringify(task) === "{}") setTask(isOpenTaskModal.task);
    })

    if (!isOpenTaskModal.open || JSON.stringify(task) === "{}") return null;

    const colors = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"]


    const closeModal = (e) => {
        setTask({});
        onClose();
    }

    const handleChangeColor = (e) => {
        setTask({ ...task, properties: { cardcolor: e.target.value} });
    }

    const handleArchive = async (e) => {
        e.preventDefault()
        task.active = false;
        const result = await updateTask(task);
        if (result.status === 200) {
            const index = project.tasks.findIndex((element)=> element._id === result.data._id);
            project.tasks[index] = result.data;
            setProject({...project});
            onClose()
        } else {
            console.log("Try again later");
        }
    }

    const handleMove = async (e) => {
        e.preventDefault()
        task.status = Number(task.status) + 1;
        const result = await updateTask(task);
        if (result.status === 200) {
            const index = project.tasks.findIndex((element)=> element._id === result.data._id);
            project.tasks[index] = result.data;
            setProject({...project});
            onClose()
        } else {
            console.log("Try again later");
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const result = await deleteTask(task);
        if (result.status === 200) {
            const index = project.tasks.findIndex((element)=> element._id === result.data._id);
            project.tasks.splice(index, 1);
            setProject({...project});
            onClose()
        } else {
            console.log("Try again later");
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const result = await updateTask(task);
        if (result.status === 200) {
            const index = project.tasks.findIndex((element)=> element._id === result.data._id);
            project.tasks[index] = result.data;
            setProject({...project});
            onClose()
        } else {
            console.log("Try again later");
        }
    }

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    return createPortal(
        <>
            <div className='task-form-overlay' onClick={closeModal}>
                <div className={`row task-form border-left-${task.properties.cardcolor}`} onClick={e => e.stopPropagation()}>
                    <form className="g-3 needs-validation mx-auto noValidate">
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom01" className="form-label fw-bold">task title</label>
                            <input type="text" value={task.title} onChange={handleChange} className="form-control" id="validationCustom01" name="title" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-12 mt-2 p-2 ">
                            <label htmlFor="validationCustom02" className="form-label fw-bold">task Description</label>
                            <textarea value={task.description} type="text" onChange={handleChange} className="form-control" id="validationCustom02" name="description" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="color-palette">

                            {
                                colors.map((color, index) =>
                                    <div className="form-check form-check-inline" key={index}>
                                        <input defaultChecked={ color === task.properties.cardcolor ? true : false} onClick={handleChangeColor} className="form-check-input" type="radio" value={color} name="cardcolor" id={`flexRadioDefault${index}`} />
                                        <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                                            <i className={`bi bi-palette text-${color}`}></i>
                                        </label>
                                    </div>
                                )
                            }
                        </div>

                        <div className="row mb-3">
                            <div className="col-3 text-center">
                                <button className="btn btn-secondary mt-2 fw-bold" type="button" onClick={closeModal}>Close</button>
                            </div>
                            <div className="col-3 text-center">
                                <button className="btn btn-danger mt-2 fw-bold" type="button" onClick={handleDelete}>Delete</button>
                            </div>
                            <div className="col-3 text-center">
                                <button className="btn btn-warning mt-2 fw-bold" type="button" onClick={handleUpdate}>Update</button>
                            </div>
                            <div className="col-3 text-center">
                                {
                                    task.status === 4 ?
                                    
                                    <button className="btn btn-primary mt-2 fw-bold" onClick={handleArchive} type="submit">Archive</button>
                                    :
                                    <button className="btn btn-primary mt-2 fw-bold" onClick={handleMove} type="submit">Move</button>

                                }
                                
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>, document.getElementById("portal")
    );
}

export default TaskModal;
