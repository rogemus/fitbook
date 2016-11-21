import React from 'react';
import {Link} from 'react-router';

export default({gym}) => (
    <div className="col-md-6">
        <div className="card">
            <div className="content">
                <div className="row">
                    <div className="col-xs-5">
                        <div className="icon-big icon-success text-center">
                            <img className="avatar border-white" src={gym.images.picture} alt={gym.name}/>
                        </div>
                    </div>
                    <div className="col-xs-7">
                        <Link to={`/gyms/${gym.id}`}>
                            <h2>{gym.name}</h2>
                        </Link>
                        <hr/>
                        <p className="description">
                            {gym.about}
                        </p>
                        <hr/>
                        <p className="description">
                            {gym.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
