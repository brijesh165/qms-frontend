import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SideNav extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const localStorageData = JSON.parse(localStorage.getItem('user')) || '';
        return (
            <React.Fragment>
                <div id="sidebar-menu">
                    <ul className="metismenu" id="menu">
                        <li className="menu-title">Main</li>
                        <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="ti-home"></i> <span> ダッシュボード </span>
                            </Link>
                        </li>
                        {
                                localStorageData.role != 'enduser' &&
                                <>
                                    <li>
                                        <Link to="/user-management" className="waves-effect">
                                            <i className="mdi mdi-account-settings"></i> <span> ユーザー管理 </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/questionnaire" className="waves-effect">
                                            <i className="fab fa-wpforms"></i> <span> アンケート作成 </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/responses" className="waves-effect">
                                            <i className="mdi mdi-clipboard-arrow-down-outline"></i> <span> アンケート回答管理 </span>
                                        </Link>
                                    </li>
                                </>
                        }
        
                       
                    </ul>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({Login}) => {
    return{
        role: Login.role
    }
}


export default connect(mapStateToProps, {})(SideNav);