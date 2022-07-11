import {React, useEffect} from 'react';
import './Profile.css'

const Profile = ( { user, setPage } ) => {

    useEffect(() => {
        setPage("profile");
    }, [])

    const d = new Date(Date.parse(user.last_login));

    return (
        <div className='profile-container'>
            <h3>Name: {user.fname} {user.lname}</h3>  
            <h3>Email: {user.email}</h3> 
            <h3>Account Type: {user.type.toUpperCase()}</h3>
            <h3>Last Log In: {d.toLocaleString('en-US', {timeZone: 'America/New_York', dateStyle: 'full',timeStyle: 'full',})}</h3> 
            <h3>Projects: {user.projects.length}</h3>
            {user.projects.map(project =>
                    <h3 key={project._id}>{project.title}</h3>
                )}
        </div>
    );
}

export default Profile;
