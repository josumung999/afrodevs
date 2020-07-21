import React, { Fragment } from 'react';

const NotFound = () => {
	return (
		<Fragment>
			<div className="landing-inner">
				<h1 className="x-large text-primary">
					<i className="fas fa-exclamation-triangle" /> <br />
					Page Introuvable
				</h1>
			</div>
		</Fragment>
	);
}

export default NotFound;