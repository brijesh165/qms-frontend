import React from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteUserStart, changeUserRoleStart } from '../store/actions';
import { DropdownMenu,DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const EditToggler = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onDeleteHandler = async (event) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        event.preventDefault();
        dispatch(deleteUserStart(props.user, localStorageData.token));
    }
    const onChangeRoleHandler = (event) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        event.preventDefault();
        dispatch(changeUserRoleStart(props.user, localStorageData.token));
    }
    return (
        <UncontrolledDropdown >
        <DropdownToggle className="btn btn-primary btn-sm">
            編集
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
            {/* <DropdownItem tag="a" href="#">パスワードを変更</DropdownItem> */}
            <DropdownItem tag="a" href="#" onClick={onDeleteHandler}>ユーザーを削除</DropdownItem>
            <DropdownItem tag="a" href="#" onClick={onChangeRoleHandler}>役割を変更</DropdownItem>
            {/* <DropdownItem divider />
            {
                props.role == 'superadmin'&&
                    <DropdownItem tag="a" href="#">スーパー管理者から管理者に変更</DropdownItem>
            } */}
            
        </DropdownMenu>
    </UncontrolledDropdown>
    )

}

export default EditToggler;