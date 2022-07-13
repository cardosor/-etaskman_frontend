import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './Board.css';
import TaskForm from '../../Components/TaskForm/TaskForm';
import TaskModal from '../../Components/TaskModal/TaskModal';
import { getProject } from '../../Utilities/project-service';
import { updateTask } from '../../Utilities/task-service';
import { updateProject } from '../../Utilities/project-service';
import { showMaxWords } from '../../HelperFuncs/HelperFuncs';

const Board = ({ setPage, user }) => {

    const draggedTask = useRef(null);
    const draggedToTask = useRef(null);
    const draggingCard = useRef(null);
    const [project, setProject] = useState(null);
    const [isOpenTaskForm, setIsOpeTaskForm] = useState(false)
    const [isOpenTaskModal, setIsOpeTaskModal] = useState({ open: false, task: {} })
    const navigate = useNavigate();

    useEffect(() => {
        setPage("board");
        let projectIndex = null;

        user.projects.map((project, index) => {
            if (project.selected === true) {
                projectIndex = index;
            }
            return null;
        });

        if (projectIndex === null) navigate('/home');
        if (projectIndex === null) return;
        (async () => {
            const result = await getProject(user.projects[projectIndex]);
            setProject({ ...result.data });
        })();
    }, [])



    const handleOpenModal = (task) => {
        setIsOpeTaskModal({ open: true, task: task });
    }

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

    const handleDragStart = (e, task) => {
        const card = e.target;
        draggedTask.current = task;
        card.classList.add('dragging');
        card.addEventListener('dragend', handleDragEnd);
    }

    const handleDragOver = async (e) => {
        e.preventDefault();
        if (draggingCard.current === null) draggingCard.current = document.querySelector('.dragging');
        if (e.target.id === `column${draggedTask.current.status}`) return;
        if (e.target.id === `column${draggedTask.current.status + 1}`) {
            if (draggingCard.current === null) return;
            draggedTask.current.status += 1;
            const indexDragged = project.tasks.findIndex((t) => t._id === draggedTask.current._id);
            project.tasks[indexDragged].status += 1;
            setProject({ ...project });
        }
        if (draggedTask.current.status - 1 >= 0 && e.target.id === `column${draggedTask.current.status - 1}`) {
            if (draggingCard.current === null) return;
            const indexDragged = project.tasks.findIndex((t) => t._id === draggedTask.current._id);
            project.tasks[indexDragged].status -= 1;
            setProject({ ...project });
        }

    }

    const handleDragEnter = (e, task) => {
        if (task._id === draggedTask.current._id) return;
        draggedToTask.current = task;
        const indexTarget = project.tasks.findIndex((t) => t._id === draggedToTask.current._id);

        const indexDragged = project.tasks.findIndex((t) => t._id === draggedTask.current._id);
        if (indexDragged === -1) return;

        const taskDragged = project.tasks.splice(indexDragged, 1)[0];

        project.tasks.splice(indexTarget, 0, taskDragged);

        draggedTask.current.status = draggedToTask.current.status;

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
                                            <h5 className="card-header">{showMaxWords(task.title, 20)}</h5>
                                            <div className="card-body">
                                                <p className="card-text">{showMaxWords(task.description, 50)}</p>

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
