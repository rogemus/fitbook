import React from 'react';
import {Link} from 'react-router';

export default(gym) => (
	<div className="card">
		<div className="header">
			<h4 className="title">Edit Profile</h4>
		</div>
		<div className="content">
			<form>
				<div className="row">
					<div className="col-md-5">
						<div className="form-group">
							<label>Company</label>
							<input type="text" className="form-control border-input"
								   disabled placeholder="Company"
								   defaultValue="Creative Code Inc."/>
						</div>
					</div>
					<div className="col-md-3">
						<div className="form-group">
							<label>Username</label>
							<input type="text" className="form-control border-input"
								   placeholder="Username" defaultValue="michael23"/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Email address</label>
							<input type="email" className="form-control border-input"
								   placeholder="Email"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<label>First Name</label>
							<input type="text" className="form-control border-input"
								   placeholder="Company" defaultValue="Chet"/>
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<label>Last Name</label>
							<input type="text" className="form-control border-input"
								   placeholder="Last Name" defaultValue="Faker"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
							<label>Address</label>
							<input type="text" className="form-control border-input"
								   placeholder="Home Address"
								   defaultValue="Melbourne, Australia"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<div className="form-group">
							<label>City</label>
							<input type="text" className="form-control border-input"
								   placeholder="City" defaultValue="Melbourne"/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>Country</label>
							<input type="text" className="form-control border-input"
								   placeholder="Country" defaultValue="Australia"/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="form-group">
							<label>Postal Code</label>
							<input type="number" className="form-control border-input"
								   placeholder="ZIP Code"/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
							<label>About Me</label>
							<textarea rows={5} className="form-control border-input"
									  placeholder="Here can be your description"
									  value="Mike"
									  defaultValue={"Oh so, your weak rhyme\nYou doubt I'll bother, reading into it\nI'll probably won't, left to my own devices\nBut that's the difference in our opinions.\n\t\t\t\t\t\t\t\t\t\t\t\t\t"}/>
						</div>
					</div>
				</div>
				<div className="text-center">
					<button type="submit" className="btn btn-info btn-fill btn-wd">Update
						Profile
					</button>
				</div>
				<div className="clearfix"/>
			</form>
		</div>
	</div>
)
