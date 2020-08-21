
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class LanguageMenu extends Component {

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
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="notification-list list-inline-item d-none d-md-inline-block mr-1" tag="li">
                    <DropdownToggle className="nav-link dropdown-toggle arrow-none waves-effect" tag="a">
                        Drop item  <span className="mdi mdi-chevron-down"></span>
                    </DropdownToggle>
                    <DropdownMenu className="language-switch" right>
                        <DropdownItem tag="a" href="#"><span> German </span></DropdownItem>
                        <DropdownItem tag="a" href="#"><span> French </span></DropdownItem>
                        <DropdownItem tag="a" href="#"><span> Spanish </span></DropdownItem>
                        <DropdownItem tag="a" href="#"><span> Russian </span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment >
        );
    }
}


export default LanguageMenu;
