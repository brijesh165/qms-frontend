import React, { Component } from 'react';
import { Alert, Button, Col, Row, Card } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserStart } from '../../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import logosm from '../../images/avatar.png';

class Pageslogin extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event, values) {
        event.preventDefault();
        this.props.loginUserStart(values.username, values.password, this.props.history);
    }

    render() {

        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark"><i className="fas fa-home h2"></i></Link>
                </div>

                <div className="wrapper-page">

                    <Card className="overflow-hidden account-card mx-3">

                        <div className="bg-primary p-4 text-white text-center position-relative">
                            <h4 className="font-20 m-b-5">アンケート管理システム</h4>
                            <p className="text-white-50 mb-4">会員ログイン</p>
                            <Link to="/" className="logo logo-admin"><img src={logosm} height="75" alt="logo" /></Link>
                        </div>
                        <div className="account-card-content">
                            <br />

                           {this.props.user && <Alert color="success">
                                    ログインに成功しました。</Alert>}

                            {this.props.loginError && <Alert color="danger">
                                {this.props.loginError}</Alert>}

                            <AvForm className="form-horizontal m-t-30" onValidSubmit={this.handleSubmit} >
                                <AvField name="username" label="ユーザーID" value={this.state.username} placeholder="ご利用にはQMSのユーザIDでログインしてください。" type="text" required />
                                <AvField name="password" label="パスワード" value={this.state.password} placeholder="" type="text" required />

                                <Row className="form-group m-t-20">
                                    <Col sm="6">

                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Button color="primary" className="w-md waves-effect waves-light" type="submit">ログイン</Button>
                                    </Col>
                                </Row>

                                <Row className="form-group m-t-10 mb-0">
                                    <Col md="12" className="m-t-20">
                                        <Link to="/forget-password"><i className="mdi mdi-lock"></i>ユーザID・パスワードを忘れた場合</Link>
                                    </Col>
                                </Row>
                            </AvForm>
                        </div>
                    </Card>

                    <div className="m-t-40 text-center">
                          <p>© {new Date().getFullYear()} アンケート管理システム.</p>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = ({Login}) => {
    const { user, loginError, loading } = Login;
    return { user, loginError, loading };
}

export default withRouter(connect(mapStatetoProps, { loginUserStart })(Pageslogin));
