import React from 'react';
import {Link} from 'react-router';

export default({post}) => (
    <div className="col-md-12">
        <div className="card">
            <div className="content">
                <Link to={'/'}>
                    <h2>Title </h2>
                </Link>
                <hr/>
                <p className="description">
                    Desc
                </p>
            </div>
        </div>
    </div>
)

/*
*     <div className="col-md-12">
 <div className="card">
 <div className="content">
 <Link to={`/post/${post.id}`}>
 <h2>{post.title}</h2>
 </Link>
 <hr/>
 <p className="description">
 {post.about}
 </p>
 </div>
 </div>
 </div>*/
