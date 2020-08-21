import React, { Component } from 'react';
import {  Card, Alert } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import logosm from '../../images/avatar.png';

class ResetPassword extends Component {

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
                        <div className="account-card-content">
                            <br />
                        <Alert color="success"> パスワードは正常にリセットされました。. ここをクリックして <Link to="/login">ログイン</Link></Alert>
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

export default withRouter(ResetPassword);
