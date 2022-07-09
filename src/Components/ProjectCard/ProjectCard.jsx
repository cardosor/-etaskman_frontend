import React, { useState } from 'react';
import './ProjectCard.css'
import ProjectModal from '../ProjectModal/ProjectModal';


const ProjectCard = ({ user, project, setReloadBoard }) => {

    const [isOpenProjectModal, setIsOpenProjectModal] = useState(false)
    console.log("reload ", project)

    return (
        <>
            <ProjectModal setReloadBoard={setReloadBoard} user={user} currentProject={project} open={isOpenProjectModal} onClose={()=>(setIsOpenProjectModal(false))}/>
            <div className={`card border-left-${project.board.cardcolor} shadow  project-card`} onClick={()=>setIsOpenProjectModal(true)}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold  mb-1">
                                <h4>{project.title}</h4>
                            </div>
                            <div className="h5 font-weight-bold">
                                <p>{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectCard;
