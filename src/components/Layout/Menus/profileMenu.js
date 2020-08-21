
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

// users
import user4 from '../../../images/avatar.png';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="notification-list list-inline-item nav-pro-img" tag="li">
                    <DropdownToggle className="nav-link arrow-none nav-user waves-effect" tag="a">
                        <img src={user4} alt="user" className="rounded-circle" />
                    </DropdownToggle>
                    <DropdownMenu className="profile-dropdown" right>
                        <DropdownItem><Link to='/profile'><i className="mdi mdi-account-circle m-r-5"></i> プロフィール</Link></DropdownItem>
                        {/* <DropdownItem tag="a" href="#"><i className="mdi mdi-wallet m-r-5"></i> My Wallet</DropdownItem>
                        <DropdownItem tag="a" href="#"><Badge color="success" className="mt-1 float-right">11</Badge><i className="mdi mdi-settings m-r-5"></i> Settings</DropdownItem>
                        <DropdownItem tag="a" href="#"><i className="mdi mdi-lock-open-outline m-r-5"></i> Lock screen</DropdownItem> */}
                        <div className="dropdown-divider"></div>
                        <DropdownItem tag="a" className="text-danger" href="/logout"><i className="mdi mdi-power text-danger"></i> ログアウト</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment >
        );
    }
}


export default withRouter(ProfileMenu);
