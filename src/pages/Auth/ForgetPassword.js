import React, { Component } from 'react';
import { Alert, Button, Card, Col, Row } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logosm from '../../images/avatar.png';
import { forgetUser } from '../../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';

class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = { qmsid: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event, values) {
        this.props.forgetUser(values.qmsid, this.props.history);
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
                            <h4 className="font-20 mb-4">ユーザIDの確認・パスワードの再設定</h4>
                            <Link to="/" className="logo logo-admin"><img src={logosm} height="75" alt="logo" /></Link>
                        </div>
                        <div className="account-card-content">

                            {/* Error Message */}
                            <br />
                            {this.props.forgetPasswordError && <Alert color="danger">
                                {this.props.forgetPasswordError}</Alert>}

                            {this.props.forgotPasswordSuccessMsg && <Alert color="success">
                                    {this.props.forgotPasswordSuccessMsg}
                                </Alert>}
                            
                            <AvForm className="form-horizontal m-t-30" onValidSubmit={this.handleSubmit} >
                                <AvField name="qmsid" label="ユーザーID" value={this.state.qmsid} placeholder="会員に登録されているユーザID、を入力してください。" type="text" required />

                                <Row className="form-group m-t-20 mb-0">
                                    <Col md="12" className="text-right">
                                        {this.props.loading ? <Button color="primary" className="w-md waves-effect waves-light">Loading ...</Button> :
                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">パスワード再設定</Button>}

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



const mapStatetoProps = ({ Forget }) => {
    const { user, forgetPasswordError, forgotPasswordSuccessMsg,loading } = Forget;
    return { user, forgetPasswordError, forgotPasswordSuccessMsg, loading };
}

export default withRouter(connect(mapStatetoProps, { forgetUser })(ForgetPassword));
