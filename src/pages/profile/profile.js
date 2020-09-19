import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, Input, Alert } from 'reactstrap';
import { activateAuthLayout, getProfileStart, updateProfileStart, changePasswordStart } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'chartist/dist/scss/chartist.scss';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active_tab: 1,

			role: "",
			id: "",
			username: "",
			useremail: "",
			userdelg: "",
			usercompany: "",
			userpassword: "",
			userconfirmpassword: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangePasswordSubmit = this.handleChangePasswordSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const localStorageData = JSON.parse(localStorage.getItem('user'));
		const update_data = {
			id: this.state.id,
			token: localStorageData.token,
			username: this.state.username,
			useremail: this.state.useremail,
			userdelg: this.state.userdelg,
			usercompany: this.state.usercompany,
		}
		this.props.updateProfileStart(update_data);
	}

	handleChangePasswordSubmit(event) {
		event.preventDefault();
		const localStorageData = JSON.parse(localStorage.getItem('user'));
		if (this.state.userpassword !== this.state.userconfirmpassword) {
			alert("Password did not match. Please enter valid password!")
		}
		const change_password_data = {
			token: localStorageData.token,
			userpassword: this.state.userpassword
		}
		this.props.changePasswordStart(change_password_data); 
	}

	componentDidMount() {
		const localStorageData = JSON.parse(localStorage.getItem('user'));
		this.props.activateAuthLayout();
		this.props.getProfileStart(localStorageData.token);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.profileData) {
			this.setState({
				id: nextProps.profileData._id,
				role: nextProps.profileData.role,
				username: nextProps.profileData.username,
				useremail: nextProps.profileData.useremail,
				userdelg: nextProps.profileData.userdelg,
				usercompany: nextProps.profileData.usercompany,
			})
		}
		if (this.props.changePasswordSuccess) {
			this.props.history('/profile');
		}
	}

	render() {

		return (
			<React.Fragment>
				<Container fluid>
					<div className="page-title-box">
						<Row className="align-items-center">
							<Col sm="6">
								<h4 className="page-title">プロフィール</h4>
								<Breadcrumb>
									{/* <BreadcrumbItem active>Welcome to Qms Dashboard</BreadcrumbItem> */}
								</Breadcrumb>
							</Col>
							<Col sm="6">

							</Col>
						</Row>
					</div>

					<Row>

						<div className="col-md-5 col-xl-2">

							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">設定</h5>
								</div>

								<div className="list-group list-group-flush" role="tablist">
									<button onClick={() => this.setState({ active_tab: 1 })} className="list-group-item list-group-item-action" data-toggle="list" href="#account" role="tab">
										アカウント
                                    </button>
									<button onClick={() => this.setState({ active_tab: 2 })} className="list-group-item list-group-item-action" data-toggle="list" href="#password" role="tab">
										パスワード
                                    </button>

								</div>
							</div>
						</div>

						<div className="col-md-9 col-xl-10">
							<div className="tab-content">
								{
									this.state.active_tab == 1 ?
										<div className="tab-pane fade show active" id="account" role="tabpanel">
											
											{this.props.profileError && <Alert color="danger">
												{this.props.profileError}</Alert>}

											<div className="card">
												<div className="card-header">
													<div className="card-actions float-right">
														<div className="dropdown show">
															<a href="#" data-toggle="dropdown" data-display="static">
																<i className="align-middle" data-feather="more-horizontal"></i>
															</a>

															<div className="dropdown-menu dropdown-menu-right">
																<a className="dropdown-item" href="#">Action</a>
																<a className="dropdown-item" href="#">Another action</a>
																<a className="dropdown-item" href="#">Something else here</a>
															</div>
														</div>
													</div>
													<h5 className="card-title mb-0"></h5>
												</div>
												<div className="card-body">
													<form onSubmit={this.handleSubmit}>
														<div className="row">
															<div className="col-md-12">
																<div className="form-group">
																	<label htmlFor="inputUsername">ユーザー名</label>
																	<input type="text" 
																		className="form-control" 
																		id="inputUsername" 
																		name="username"
																		placeholder="田中_12" 
																		value={this.state.username} 
																		onChange={this.handleChange}
																		disabled={this.state.role === 'Super-Admin' ? false : true} />
																</div>
																<div className="form-group">
																	<label htmlFor="example-email-input">メール</label>
																	<Input type="email" 
																			id="example-email-input"
																			name="useremail"
																			value={this.state.useremail}
																			onChange={this.handleChange}
																			disabled={this.state.role === 'Super-Admin' ? false : true} />
																</div>
																<div className="form-group">
																	<label htmlFor="example-designation-input">指定</label>
																	<Input type="text" 
																			id="example-designation-input"
																			name="userdelg"
																			value={this.state.userdelg}
																			onChange={this.handleChange}
																			disabled={this.state.role === 'Super-Admin' ? false : true} />
																</div>
																<div className="form-group">
																	<label htmlFor="example-company-input">会社</label>
																	<Input type="text" 
																			id="example-company-input"
																			name="usercompany"
																			value={this.state.usercompany} 
																			onChange={this.handleChange}
																			disabled={this.state.role === 'Super-Admin' ? false : true} />
																</div>
															</div>
														</div>

														<button type="submit" 
															className="btn btn-primary"
															hidden={this.state.role === 'Super-Admin' ? false : true}>変更を保存</button>
													</form>

												</div>
											</div>

										</div>
										:
										<div className="tab-pane show active fade" id="password" role="tabpanel">
											<div className="card">
												<div className="card-body">
													<h5 className="card-title">パスワード</h5>

													{this.props.changePasswordSuccess && <Alert color="success">
														{this.props.changePasswordSuccess}</Alert>}

													{this.props.profileError && <Alert color="danger">
														{this.props.profileError}</Alert>}

													<form onSubmit={this.handleChangePasswordSubmit}>
														<div className="form-group">
															<label htmlFor="inputPasswordNew">新しいパスワード</label>
															<input type="password" 
																	className="form-control" 
																	id="inputPasswordNew"
																	name="userpassword"
																	value={this.state.userpassword}
																	onChange={this.handleChange} />
														</div>
														<div className="form-group">
															<label htmlFor="inputPasswordNew2">パスワードを認証する</label>
															<input type="password" 
																className="form-control" 
																id="inputPasswordNew2"
																name="userconfirmpassword"
																value={this.state.userconfirmpassword}
																onChange={this.handleChange} />
														</div>
														<button type="submit" className="btn btn-primary">変更を保存</button>
													</form>

												</div>
											</div>
										</div>
								}
							</div>
						</div>
					</Row>
				</Container>

			</React.Fragment>
		);
	}
}

const mapStatetoProps = ({Profile}) => {
	console.log('MAP STATE TO PROPS : ', Profile);
    const { profileData, profileError, loading } = Profile;
    return { profileData, profileError, loading };
}

export default withRouter(connect(mapStatetoProps, { activateAuthLayout, 
	getProfileStart, updateProfileStart, changePasswordStart })(Profile));
