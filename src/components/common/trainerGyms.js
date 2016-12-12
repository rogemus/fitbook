import React from 'react';

export default ({user}) => (
	<div className="card">
		<div className="header">
			<h4 className="title">Whare you can find me: </h4>
		</div>
		<div className="content">
			<ul className="list-unstyled team-members">
				<li>
					<div className="row">
						<div className="col-xs-3">
							<div className="avatar">
								<img src="../../assets/img/faces/face-0.jpg" alt="Circle Image"
									 className="img-circle img-no-padding img-responsive"/>
							</div>
						</div>
						<div className="col-xs-6">
							Gyms 1
							<br />
							<span className="text-muted"><small>adresss</small></span>
						</div>
					</div>
				</li>
				<li>
					<div className="row">
						<div className="col-xs-3">
							<div className="avatar">
								<img src="../../assets/img/faces/face-1.jpg" alt="Circle Image"
									 className="img-circle img-no-padding img-responsive"/>
							</div>
						</div>
						<div className="col-xs-6">
							Gyms 1
							<br />
							<span className="text-muted"><small>adresss</small></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
)