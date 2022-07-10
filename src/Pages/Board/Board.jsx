import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Board.css';
import TaskForm from '../../Components/TaskForm/TaskForm';
import TaskModal from '../../Components/TaskModal/TaskModal';
import { getProject } from '../../Utilities/project-service';

const Board = ({ user }) => {

    const [project, setProject] = useState(null);
    const [isOpenTaskForm, setIsOpeTaskForm] = useState(false)
    const [isOpenTaskModal, setIsOpeTaskModal] = useState({open:false, task:{}})

    const navigate = useNavigate();

    useEffect(() => {
        let projectIndex = null;
        user.projects.map((project, index) => {
            if (project.selected === true) {
                projectIndex = index;

            }
        })

        if (projectIndex === null) navigate('/home');
        if (projectIndex === null) return;
        (async () => {
            const result = await getProject(user.projects[projectIndex]);
            console.log("result ", result);
            setProject(result.data);
        })();
    }, [])

    if (project === null) return;

    const handleOpenModal = (task) => {
        setIsOpeTaskModal({open:true, task: task});
    }

    return (
        <>
            <TaskForm setProject={setProject} project={project} isOpenTaskForm={isOpenTaskForm} user={user} onClose={() => setIsOpeTaskForm(false)} />
            <TaskModal setProject={setProject} project={project} isOpenTaskModal={isOpenTaskModal} user={user} onClose={() => setIsOpeTaskModal({open:false, task: {}})} />
            <div className='project-board'>
                {
                    Object.values(project.board.workflow).map((value, index) =>

                        <div className='board-column' style={{ width: `${(100 / Object.values(project.board.workflow).length) - 1}%` }} key={project._id+index}>
                            <div className='board-column-title'>
                                {value}
                            </div>
                            <div className='board-column-container'>

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
                                    project.tasks.map(task =>
                                        task.status === index && task.active === true &&
                                        <div key={task._id} className={`card border-left-${task.properties.cardcolor} shadow task-card`} onClick={() => handleOpenModal(task)}>
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold  mb-1">
                                                            <p>{task.title}</p>
                                                        </div>
                                                        <div className="font-weight-bold">
                                                            {task.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
