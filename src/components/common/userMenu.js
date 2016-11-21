import React from 'react';
import {Link} from 'react-router';


export default() => (
    <nav className="navbar">
        <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
                <li key={1}>
                    <Link to="/me/gyms">
                        <p>My Gyms</p>
                    </Link>
                </li>
                <li key={2}>
                    <Link to="/me/posts">
                        <p>My Post</p>
                    </Link>
                </li>
                <li key={3}>
                    <Link to="/creategym">
                        <p>Create Gym</p>
                    </Link>
                </li>
                <li key={4}>
                    <Link to="/createpost">
                        <p>Create Post</p>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
)