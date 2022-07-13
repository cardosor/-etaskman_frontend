import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './Board.css';
import TaskForm from '../../Components/TaskForm/TaskForm';
import TaskModal from '../../Components/TaskModal/TaskModal';
import { getProject } from '../../Utilities/project-service';
import { updateTask } from '../../Utilities/task-service';
import { updateProject } from '../../Utilities/project-service';
//Takes 2 parameters a string and a number, returns a string with a number of characters up to the last word.
import { showMaxWords } from '../../HelperFuncs/HelperFuncs';

const Board = ({ setPage, user }) => {

    //The task that is being dragged, obj data
    const draggedTask = useRef(null);
    //the task that is assigned on drag enter, obj data
    const draggedToTask = useRef(null);
    //the card that is being dragged, element
    const draggingCard = useRef(null);
    //current project
    const [project, setProject] = useState(null);
    //Form modal
    const [isOpenTaskForm, setIsOpeTaskForm] = useState(false)
    //Task modal and task obj data
    const [isOpenTaskModal, setIsOpeTaskModal] = useState({ open: false, task: {} })
    const navigate = useNavigate();

    useEffect(() => {
        setPage("board");
        let projectIndex = null;
        //Finds the task that was selected in the dash board
        user.projects.map((project, index) => {
            if (project.selected === true) {
                projectIndex = index;
            }
            return null;
        });

        //if no project was selected navagate home and return
        if (projectIndex === null) navigate('/home');
        if (projectIndex === null) return;
        //if a project was selected get project data from backned
        (async () => {
            const result = await getProject(user.projects[projectIndex]);
            setProject({ ...result.data });
        })();
    }, [])


    //Open modal and set the task prop
    const handleOpenModal = (task) => {
        setIsOpeTaskModal({ open: true, task: task });
    }

    //Once the drag ends, set the task and card reff to null
    //remove the dragging class so oppacity is removed
    //update the project and task in the backend and removed dragend event
    const handleDragEnd = async (e) => {
        draggedToTask.current = null;
        draggingCard.current = null;
        const card = e.target;
        card.removeEventListener('dragend', handleDragEnd);
        if (card.classList.contains('dragging')) {
            card.classList.remove('dragging');
        }
        await updateProject(project);
        await updateTask(draggedTask.current);
    }

    //When the task card is dragged add the dragging class and event listener for dragend
    //set the value of draggedTask
    const handleDragStart = (e, task) => {
        const card = e.target;
        draggedTask.current = task;
        card.classList.add('dragging');
        card.addEventListener('dragend', handleDragEnd);
    }

    //Drag the card over a column
    const handleDragOver = async (e) => {
        e.preventDefault();
        //If the draggingCard is null, set it to the card being dragged
        if (draggingCard.current === null) draggingCard.current = document.querySelector('.dragging');

        //If the dragged card is over the original column return
        if (e.target.id === `column${draggedTask.current.status}`) return;

        //if the dragged card is over the next column change the status of task and setState of project
        if (e.target.id === `column${draggedTask.current.status + 1}`) {
            if (draggingCard.current === null) return;
            draggedTask.current.status += 1;
            const indexDragged = project.tasks.findIndex((t) => t._id === draggedTask.current._id);
            project.tasks[indexDragged].status += 1;
            setProject({ ...project });
        }
        //if the dragged card is over the previus column change the status of task and setState of project
        if (draggedTask.current.status - 1 >= 0 && e.target.id === `column${draggedTask.current.status - 1}`) {
            if (draggingCard.current === null) return;
            const indexDragged = project.tasks.findIndex((t) => t._id === draggedTask.current._id);
            project.tasks[indexDragged].status -= 1;
            setProject({ ...project });
        }
    }

    //If card is dragged over another card
    const handleDragEnter = (e, task) => {
        //if the event is related to the target return
        if (task._id === draggedTask.current._id) return;
        //Assign the task obj data of the target to draggedToTask
        draggedToTask.current = task;

        //Find the index of the target
        const indexTarget = project.tasks.findIndex((t) => t._id === draggedToTask.current._id);
        //if not found return
        if (indexTarget === -1) return;
        //find the index of the dragged card
        const indexDragged = project.tasks.findIndex((t) => t._id === draggedTask.current._id);
        //if not found return
        if (indexDragged === -1) return;
        
        //remove the dragged task from the task array
        const taskDragged = project.tasks.splice(indexDragged, 1)[0];
        //Add the dragged task back to the array at the position of the taget task
        project.tasks.splice(indexTarget, 0, taskDragged);
        //change the status of the dragged task
        draggedTask.current.status = draggedToTask.current.status;
        //set the state
        setProject({ ...project });
    }

    return (
        <>
            <TaskForm setProject={setProject} project={project} isOpenTaskForm={isOpenTaskForm} user={user} onClose={() => setIsOpeTaskForm(false)} />
            <TaskModal setProject={setProject} project={project} isOpenTaskModal={isOpenTaskModal} user={user} onClose={() => setIsOpeTaskModal({ open: false, task: {} })} />
            {
                !project &&
                <div className='loading d-flex justify-content-center align-items-center'>
                <div className="spinner-border mt-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                </div>
            }
            <div className='project-board'>
                {
                    project &&
                    Object.values(project.board.workflow).map((value, index) =>

                        <div className='board-column' style={{ width: `${(100 / Object.values(project.board.workflow).length) - 1}%` }} key={project._id + index}>
                            <div className='board-column-title'>
                                {value}
                            </div>
                            <div className='board-column-container ' id={`column${index}`} onDragOver={handleDragOver}>

                                {
                                    index === 0 &&
                                    <div className="card border-left-info shadow task-card" onClick={() => setIsOpeTaskForm(true)}>
                                        <div className="card-body">

                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold  mb-1">
                                                        <p className='text-center'>Create a new task.</p>
                                                    </div>
                                                    <div className="d-flex h5 font-weight-bold">
                                                        <i className="bi bi-file-earmark-plus my-auto mx-auto fs-1"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }
                                {
                                    project &&
                                    project.tasks.map(task =>
                                        task.status === index && task.active === true &&
                                        <div key={task._id} id={task._id} onDragEnter={(e) => handleDragEnter(e, task)} className={`card border-left-${task.properties.cardcolor} shadow task-card draggable`} draggable={true} onDragStart={(e) => handleDragStart(e, task)} onClick={() => handleOpenModal(task)}>
                                            <h5 className="card-header text-center">{showMaxWords(task.title, 20)}</h5>
                                            <div className="card-body">
                                                <p className="card-text text-center">{showMaxWords(task.description, 50)}</p>

                                            </div>
                                        </div>
                                        // <div key={task._id} id={task._id} onDragEnter={(e) => handleDragEnter(e, task)} className={`card border-left-${task.properties.cardcolor} shadow task-card draggable`} draggable={true} onDragStart={(e) => handleDragStart(e, task)} onClick={() => handleOpenModal(task)}>
                                        //     <div className="card-body">
                                        //         <div className="card-header text-xs font-weight-bold  mb-1">
                                        //             <p>{showMaxWords(task.title, 20)}</p>
                                        //         </div>
                                        //         <div className="font-weight-bold">
                                        //             {showMaxWords(task.description, 50)}
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    )
                                }

                            </div>

                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Board;
