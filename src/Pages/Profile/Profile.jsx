import {React, useEffect} from 'react';
import './Profile.css'

const Profile = ( { user, setPage } ) => {

    useEffect(() => {
        setPage("profile");
    }, [])

    const d = new Date(Date.parse(user.last_login));
    

    return (
        <div className='profile-container m-5'>
            {user.fname} {user.lname} {user.email} {user.type} {user.active.toString()}  {d.toLocaleString('en-US', {timeZone: 'America/New_York', dateStyle: 'full',timeStyle: 'full',})} 
            {user.projects.map(project =>
                    <p>{project.title}</p>
                )}
        </div>
    );
}

export default Profile;
