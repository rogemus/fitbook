import React from 'react';

export default() => (
    <nav className="navbar">
        <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
                <li key={1}>
                    <Link to="/">
                        <p>Edit Profile</p>
                    </Link>
                </li>
                <li key={2}>
                    <Link to="/">
                        <p>My Gyms</p>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
)