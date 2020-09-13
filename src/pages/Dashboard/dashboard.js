import React, { Component } from 'react';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            role: ''
        };
    }

    componentDidMount() { 
        this.props.activateAuthLayout();
    }

    render() {
        
        const localStorageData = JSON.parse(localStorage.getItem('user')) || '';
        if (localStorageData.role === "enduser") {
            return (<EndUserDash />)
        } else if (localStorageData.role === 'admin') {
            return (<AdminDash />)
        } else {
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