import { React, useEffect, useState } from 'react';
import { getAllProjects, updateProject } from '../../Utilities/project-service';

import './Profile.css'

const Profile = ({ user, setPage }) => {

    const [projectList, setProjectList] = useState(null);

    useEffect(() => {
        setPage("profile");
        (async () => {
            const result = await getAllProjects(user._id);
            setProjectList([...result.data]);
        })();
    }, [])

    const d = new Date(Date.parse(user.last_login));

    const restoreProject = async (e, project) => {
        project.active = true;
        const result = await updateProject(project);
        (async () => {
            const result = await getAllProjects(user._id);
            setProjectList([...result.data]);
        })();
    }

    return (
        <div className='profile-container'>
            <h3>Name: {user.fname} {user.lname}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Account Type: {user.type.toUpperCase()}</h3>
            <h3>Last Log In: {d.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'full', })}</h3>
            <h3>Active Projects: {projectList &&
                projectList.filter((project) => project.active === true).length}</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Active</th>
                        <th scope="col">Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList &&
                        projectList.map((project, index) =>
                            project.active &&
                            <tr key={project._id}>
                                <td>{project.title}</td>
                                <td>Yes</td>
                                <td>{new Date(Date.parse(project.start_date)).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'short', timeStyle: 'short', })}</td>
                            </tr>
                        )}
                </tbody>
            </table>
            {
                projectList &&
                    projectList.filter((project) => project.active === false).length ?
                    <>
                        <h3>Non-Active Projects:
                            {
                                projectList &&
                                projectList.filter((project) => project.active === false).length}</h3>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">title</th>
                                    <th scope="col">Active</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projectList &&
                                    projectList.map((project, index) =>
                                        !project.active &&
                                        <tr key={project._id}>
                                            <td >{project.title}</td>
                                            <td >No</td>
                                            <td >{new Date(Date.parse(project.start_date)).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'short', timeStyle: 'short', })}</td>
                                            <td ><button type="button" class="btn btn-primary" onClick={(e) => restoreProject(e, project)}>Restore</button></td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </>
                    :
                    <></>
            }
        </div>
    );
}

export default Profile;
