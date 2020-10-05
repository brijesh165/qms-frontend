import React, { Component } from 'react';
import { Button, Card, Col, Row, Alert } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import logosm from '../../images/avatar.png';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { resetpassword } from '../../store/actions';
import { connect } from 'react-redux';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { password: "", confirmpassword: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event, values) {
        if (values.password !== values.confirmpassword) {
            alert('Password does not match. Please enter correct password');
            return;
        }
        const params = this.props.location.search.slice(7);
        if (!params) {
            alert('Something went wrong. Please try again!');
            return;
        }
        this.props.resetpassword(values.password, params, this.props.history);
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
                            <h4 className="font-20 m-b-10 pb-2">パスワードは正常にリセットされました。</h4>
                            <Link to="/" className="logo logo-admin"><img src={logosm} height="75" alt="logo" /></Link>
                        </div>
                        {/* Reset Password UI */}
                        <div className="account-card-content">

                            {/* Error Message */}
                            <br />
                            {this.props.resetPasswordError && <Alert color="danger">
                                {this.props.resetPasswordError}</Alert>}

                            <AvForm className="form-horizontal m-t-30" onValidSubmit={this.handleSubmit} >
                                <AvField name="password" label="パスワード" value={this.state.password} placeholder="パスワードを入力してください。" type="password" required />
                                <AvField name="confirmpassword" label="パスワードを認証する" value={this.state.confirmpassword} placeholder="確認パスワードを入力してください。" type="password" required />

                                <Row className="form-group m-t-20 mb-0">
                                    <Col md="12" className="text-right">
                                        {this.props.loading ? <Button color="primary" className="w-md waves-effect waves-light">Loading ...</Button> :
                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">パスワード再設定</Button>}
                                    </Col>
                                </Row>
                            </AvForm>

                            {/* <br />
                            <Alert color="success"> パスワードは正常にリセットされました。. ここをクリックして <Link to="/login">ログイン</Link></Alert> */}
                        </div>
                    </Card>

                    <div className="m-t-40 text-center">
                        <p>© {new Date().getFullYear()} Qms. Crafted with <i className="mdi mdi-heart text-danger"></i> by MyBrand</p>
                    </div>

                </div>

            </React.Fragment>
        );
    }
}

const mapStatetoProps = ({ Reset }) => {
    const { user, resetPasswordError, loading } = Reset;
    return { user, resetPasswordError, loading };
}

export default withRouter(connect(mapStatetoProps, { resetpassword })(ResetPassword));
