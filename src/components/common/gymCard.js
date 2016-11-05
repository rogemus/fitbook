import React from 'react';
import {Link} from 'react-router';

export default(gym) => (
    <div className="card col-lg-3 col-sm-6">
        <div className="content">
            <div className="row">
                <div className="col-xs-5">
                    <div className="icon-big icon-success text-center">
                        <img className="avatar border-white" src="../../assets/img/faces/face-2.jpg"
                             alt={gym.name}/>
                    </div>
                </div>
                <div className="col-xs-7">
                    <Link to={'/gyms' + gym.id}>
                        <h2>{gym.name}</h2>
                    </Link>
                    <hr/>
                    <p className="description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate ea itaque iure
                        labore qui, ratione temporibus tenetur totam veritatis. A autem dicta harum neque
                        nesciunt
                        numquam obcaecati possimus recusandae.
                    </p>
                </div>
            </div>
        </div>
    </div>
)
