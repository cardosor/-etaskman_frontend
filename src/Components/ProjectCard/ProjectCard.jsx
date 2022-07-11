import React, { useState } from 'react';
import './ProjectCard.css'
import ProjectModal from '../ProjectModal/ProjectModal';
import {showMaxWords} from '../../HelperFuncs/HelperFuncs';


const ProjectCard = ({ setReloadBoard, user, project}) => {

    const [isOpenProjectModal, setIsOpenProjectModal] = useState(false)

    console.log("ProjectCard ", project);
    console.log("User ", user);
    return (
        <>
            <ProjectModal setReloadBoard={setReloadBoard} user={user} currentProject={project} open={isOpenProjectModal} onClose={()=>(setIsOpenProjectModal(false))}/>
            <div className={`card border-left-${project.board.cardcolor} shadow  project-card`} onClick={()=>setIsOpenProjectModal(true)}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold  mb-1">
                                <h4>{showMaxWords(project.title, 35)}</h4>
                            </div>
                            <div className="h5 font-weight-bold">
                                <p>{showMaxWords(project.description, 180)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectCard;
