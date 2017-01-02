import React from 'react';

const FONT = {
	'fontSize': '30em'
};

export default() => {
	return (
		<div className="error e404 text-center">
			<h1 style={FONT}>
				404
			</h1>
			<h2>
				Page not found :(
			</h2>
		</div>
	);
};