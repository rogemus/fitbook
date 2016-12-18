import React from 'react';

function renderCover(cover) {
	if (cover !== null) {
		return (<img src={cover} alt="..."/>);
	} else {
		return <img src="../../assets/img/background.jpg" alt="..."/>;
	}
}

export default({user}) => (
	<div className="card card-user">
		<div className="image">
			{renderCover(user.images.cover)}
		</div>
		<div className="content">
			<div className="author">
				<img className="avatar border-white" src={user.images.picture} alt={user.name}/>
				<h4 className="title">{user.name}</h4>
			</div>
			<p className="description text-center">
				{user.email}
			</p>
			<hr/>
			<p className="description text-center">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate ea itaque iure
				labore qui, ratione temporibus tenetur totam veritatis. A autem dicta harum neque nesciunt
				numquam obcaecati possimus recusandae.
			</p>
		</div>
	</div>
);