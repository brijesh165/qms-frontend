import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Input, Table, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminDash from './AuthDash'
import EndUserDash from './EndUserDash'
import AuthDash from './AuthDash';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const CustomTitle = (data) => (
    <a>{data.name}</a>
)

const localStorageData = JSON.parse(localStorage.getItem('user')) || '';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            role: localStorageData.role
        };
    }

    componentDidMount() {
        this.props.activateAuthLayout();
    }

    render() {
        if (this.state.role === "enduser") {
            console.log('ENDUSER');
            return (<EndUserDash />)
        } else {
            console.log('SUPER ADMIN')
            return (<AuthDash />)
        }
    }
}

const mapStateToProps = ({ Login }) => {
    console.log('MAP STATE TO PROPS : ', Login.role)
    return {
        role: Login.role
    }
}


export default withRouter(connect(mapStateToProps, { activateAuthLayout })(Dashboard));