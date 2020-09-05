import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Input, Table, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { activateAuthLayout, profileUpdateSuccessful } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
// import { Scrollbars } from 'react-custom-scrollbars';
// import Toggler from '../../components/dashToggler'
// import DataTable from 'react-data-table-component';
// import data from '../../data/questions.json'
// import Select from 'react-select';

import 'chartist/dist/scss/chartist.scss';

class Profile extends Component {
	constructor(props) {
		super(props);
		let localStorageData = JSON.parse(localStorage.getItem('user'));
		this.state = {
			active_tab: 1,
			token: localStorageData.token,
			role: "",
			username: "",
			useremail: "",
			userdelg: "",
			usercompany: "",
			userpassword: "",
			userconfirmpassword: "",
			forProfileUpdate: false,
			forPasswordUpddate: true
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		// if (name === "username" || name === "useremail" || name === "userdelg" || name === "usercompany") {
		// 	this.setState({
		// 		forProfileUpdate: true
		// 	})
		// }

		// if (name === "userpassword" || name === "userconfirmpassword") {
		// 	this.setState({
		// 		forPasswordUpddate: true
		// 	})
		// }

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.profileUpdateSuccessful(this.state, this.props.history);
		// this.setState({
		// 	forProfileUpdate: false
		// })

		// if (this.state.userpassword !== this.state.userconfirmpassword) {
		// 	alert('Password does not match. Please try adain!');
		// } else {
		// 	console.log('Password Update Called!!!');
		// 	this.props.passwordUpdateSuccessful(this.state.userpassword, this.props.history);
		// 	this.setState({
		// 		forPasswordUpddate: false
		// 	})
		// }
	}

	componentDidMount() {
		this.props.activateAuthLayout();
		axios.get("http://localhost:5000/profile", {params: {token: this.state.token}})
		.then((response) => {
			console.log(response.data);
			this.setState({
				role: response.data.role,
				username: response.data.username,
				useremail: response.data.useremail,
				userdelg: response.data.userdelg,
				usercompany: response.data.usercompany
			});
		}).catch(error => {
			console.log(error);
		})
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
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
																		disabled={this.props.role === 'superadmin' ? false : true} />
																</div>
																<div class="form-group">
																	<label htmlFor="example-email-input">メール</label>
																	<Input type="email" 
																			id="example-email-input"
																			name="useremail"
																			value={this.state.useremail}
																			onChange={this.handleChange}
																			disabled={this.props.role === 'superadmin' ? false : true} />
																</div>
																<div class="form-group">
																	<label htmlFor="example-designation-input">指定</label>
																	<Input type="text" 
																			id="example-designation-input"
																			name="userdelg"
																			value={this.state.userdelg}
																			onChange={this.handleChange}
																			disabled={this.props.role === 'superadmin' ? false : true} />
																</div>
																<div class="form-group">
																	<label htmlFor="example-company-input">会社</label>
																	<Input type="text" 
																			id="example-company-input"
																			name="usercompany"
																			value={this.state.usercompany} 
																			onChange={this.handleChange}
																			disabled={this.props.role === 'superadmin' ? false : true} />
																</div>
															</div>
															{/* <div class="col-md-4">
														<div class="text-center">
															<img alt="Chris Wood" src={require('./../../images/users/user-3.jpg')} className="rounded-circle img-responsive mt-2" width="128" height="128"/>
															<div className="mt-2">
																<span className="btn btn-primary"><i className="fas fa-upload"></i> アップロード</span>
															</div>
															<small>最良の結果を得るには、少なくとも.jpg形式の128px x 128pxの画像を使用してください。</small>
														</div>
													</div> */}
														</div>

														<button type="submit" 
															className="btn btn-primary"
															hidden={this.props.role === 'superadmin' ? false : true}>変更を保存</button>
													</form>

												</div>
											</div>

										</div>
										:
										<div className="tab-pane show active fade" id="password" role="tabpanel">
											<div className="card">
												<div className="card-body">
													<h5 className="card-title">パスワード</h5>

													<form onSubmit={this.handleSubmit}>
														{/* <div className="form-group">
															<label htmlFor="inputPasswordCurrent">現在のパスワード</label>
															<input type="password" className="form-control" id="inputPasswordCurrent" />
															<small><a href="#">パスワードをお忘れですか？</a></small>
														</div> */}
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

const mapStatetoProps = ({Login, Profile}) => {
	console.log('ROLE : ', Login);
	const {role} = Login;
    const { user, loginError, loading } = Profile;
    return { user, loginError, loading, role };
}

export default withRouter(connect(mapStatetoProps, { activateAuthLayout, profileUpdateSuccessful })(Profile));
