import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SettingMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.setting_menu} toggle={() => this.setState({ setting_menu: !this.state.setting_menu })}>
                    <DropdownToggle className='toggler-custom' style={{backgroundColor:'transparent',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',border:0}}>
                        <i className="mdi mdi-dots-vertical-circle" style={{color:'grey',fontSize:25}}></i>
                    </DropdownToggle>
                    <DropdownMenu  right>
                        <DropdownItem onClick={this.props.rename}>アンケート名を変更</DropdownItem>
                        <DropdownItem onClick={this.props.editQuestion}>再編集</DropdownItem>
                        <DropdownItem onClick={this.props.copyQuestion} >複製</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.props.deleteQuestion} >削除</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default SettingMenu;


