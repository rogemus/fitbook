import React from 'react';

export default () => {
	return (
		<section className="mobile-apps">
			<div className="mobile-apps-wrapper">
				<div className="row">
					<div className="col col-2-5">
						<div className="mobile-apps-title"><h1>Download our app</h1></div>
						<div className="mobile-apps-content">
							<div className="apps">
								<a href="">
									<img src="/img/win.png" alt=""/>
								</a>
							</div>
							<div className="apps">
								<a href="">
									<img src="/img/and.png" alt=""/>
								</a>
							</div>
						</div>
					</div>
					<div className="col col-3-5">
						<div className="mobile-apps-showcase">
							<img src="/img/apps.png" alt=""/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};