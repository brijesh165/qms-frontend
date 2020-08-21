import React from 'react'
import { Container, Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Input, Table,Dropdown,DropdownMenu,DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';


const EditToggler = (props) => (
    <UncontrolledDropdown >
        <DropdownToggle className="btn btn-primary btn-sm">
            編集
        </DropdownToggle>
        <DropdownMenu className="language-switch" right>
            <DropdownItem tag="a" href="#">パスワードを変更</DropdownItem>
            <DropdownItem tag="a" href="#">ユーザーを削除</DropdownItem>
            <DropdownItem tag="a" href="#">ユーザーに変更</DropdownItem>
            <DropdownItem divider />
            {
                props.role == 'superadmin'&&
                    <DropdownItem tag="a" href="#">スーパー管理者から管理者に変更</DropdownItem>
            }
            
        </DropdownMenu>
    </UncontrolledDropdown>
)

export default EditToggler