import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Input,
    Table,
    Form,
    FormGroup,
    Label,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addUserSuccessful } from './../../store/actions';
import 'chartist/dist/scss/chartist.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';

import EditToggler from '../../components/userEditToggler';
import axios from 'axios';
// import data from '../../data/questions.json'


const optionGroup = [
    { label: "アンケート1", value: "Tent" },
    { label: "アンケート2", value: "Flashlight" },
    { label: "アンケート3", value: "Toilet Paper" }
];

const localStorageData = JSON.parse(localStorage.getItem('user'));

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            selectedEmail: [],
            users: [],
            username: '',
            useremail: '',
            userdelg: '',
            usercompany: '',
            userrole: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, values) {
        this.props.addUserSuccessful({
            "username": values.username,
            "useremail": values.useremail,
            "userdesig": values.userdesig,
            "usercompany": values.usercompany,
            "userrole": values.userrole
        }, this.props.history);
        // this.props.checkLogin(values.username, values.useremail, values.userdesgig, values.usercompany, this.props.history);
    }

    handleSelectGroup = (selectedGroup) => {
        this.setState({ selectedGroup });
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        axios.get('http://localhost:5000/user-management', { params: { token: localStorageData.token } })
        .then((response) => {
            console.log(response.data.SuperUser);
            this.setState({
                users: response.data.SuperUser
            })
        })
        .catch((error) => {
            console.log('User Management Error : ', error);
        })
    }

    addEmail = (item, event) => {
        if (event.target.checked) {
            let selectedEmail = [...this.state.selectedEmail]
            selectedEmail.push(item.email)
            this.setState({ selectedEmail: selectedEmail })

        } else {
            let new_mails = [...this.state.selectedEmail].map(itm => {
                if (itm != item.email) {
                    return itm
                }
            })
            this.setState({ selectedEmail: new_mails })
        }
    }

    searchUser = (event) => {
        console.log(event.target.value, 'vvvv')
        let new_data = this.state.users.filter(item => {
            return item.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(new_data, 'vvvv')

        this.setState({ users: new_data })
    }

    toggleEditModal = () => {
        this.setState({ toggleEditModal: !this.state.toggleEditModal })
    }

    render() {
        const { selectedGroup } = this.state;

        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">ユーザー管理</h4>
                                <Breadcrumb>
                                    <BreadcrumbItem active>すべての登録ユーザー</BreadcrumbItem>
                                </Breadcrumb>
                                <form role="search" className="app-search">
                                    <div className="form-group mb-0">
                                        <input onChange={this.searchUser} type="text" className="form-control" placeholder="ユーザーを検索。。" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </div>
                                </form>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    {/* <SettingMenu /> */}
                                    <Button color="primary" className="waves-effect waves-light mr-3" onClick={this.toggleEditModal}>管理者を追加</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Modal className="modal-lg" isOpen={this.state.toggleEditModal} toggle={() => this.setState({ toggleEditModal: false })}>
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">管理者を追加</h5>
                            <button onClick={() => this.setState({ toggleEditModal: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <ModalBody>
                            <AvForm className="form-horizontal m-t-30" onValidSubmit={this.handleSubmit} >
                                <AvField name="username" label="ユーザー名" value={this.state.username} placeholder="ユーザー名を入力してください" type="text" required />
                                <AvField name="useremail" label="ユーザーのメール" value={this.state.useremail} placeholder="メールアドレスを入力してください" type="text" required />
                                <AvField name="userdesig" label="ユーザー指定" value={this.state.userdesig} placeholder="指定を入力してください" type="text" required />
                                <AvField name="usercompany" label="ユーザー会社" value={this.state.usercompany} placeholder="会社を入力してください" type="text" required />
                                <AvField name="userrole" type="select" label="オプション" value={this.state.userrole}>
                                    <option value="Admin" disabled={this.props.role === "admin"}>管理者</option>
                                    <option value="User">ユーザー</option>
                                </AvField>
                                <Row className="form-group m-t-20">
                                    <Col sm="6">
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Button type="button" color="secondary" onClick={() => this.setState({ toggleEditModal: false })} className="waves-effect mr-3">閉じる</Button>
                                        <Button type="submit" color="primary" className="waves-effect waves-light">追加</Button>
                                    </Col>
                                </Row>
                            </AvForm>
                        </ModalBody>
                    </Modal>

                    <Row>
                        <Col xl="12 text-center">
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title mb-4">株式会社 島根情報処理センターのユーザーリスト</h4>
                                    <div className="table-responsive">
                                        <Table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">選択</th>
                                                    <th scope="col">ユーザー名</th>
                                                    <th scope="col">ユーザー会社</th>
                                                    {/* {
                                                        this.props.role == 'superadmin' &&
                                                        <th scope="col">会社名</th>
                                                    } */}
                                                    <th scope="col">ユーザー指定</th>
                                                    <th scope="col" colSpan="2">権限ステータス</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.users.map(item => (
                                                        <tr>
                                                            <td><Input type='checkbox' onClick={(event) => this.addEmail(item, event)} /></td>
                                                            <th scope="row">{item.userid}</th>
                                                            <td>
                                                            {item.username}
                                                                {/* <div>
                                                                    <img src={require(`./../../images/users/${item.image}`)} alt="" className="thumb-md rounded-circle mr-2" /> 
                                                                </div> */}
                                                            </td>
                                                            {
                                                                this.props.role == 'superadmin' &&
                                                                <th scope="col">{item.company}</th>
                                                            }
                                                            <th>{item._id}</th>
                                                            <td colSpan="2"><span className="badge badge-success">
                                                                {
                                                                    this.props.role == '管理者' ?
                                                                        item.role == 'ユーザー管理' ? 'end user' : '管理者'
                                                                        :
                                                                        '管理者'
                                                                }
                                                            </span></td>
                                                            <td>
                                                                <div>
                                                                    <EditToggler
                                                                        role={this.props.role}
                                                                    />
                                                                    {/* <Link to="#" className="btn btn-primary btn-sm">編集</Link> */}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>

                    <Row className="align-items-center" style={{ border: '1px solid grey', borderRadius: 5, padding: 10 }}>
                        {/* <Col xl="12" > */}
                        <Col xl="6">
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-email-input" sm="2">メール</Label>
                                    <Col sm="10">
                                        <Input type="email" value={this.state.selectedEmail.map(item => item)} id="example-email-input" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="example-text-input" sm="2">件名</Label>
                                    <Col sm="10">
                                        <Input type="text" defaultValue="" id="example-text-input" />
                                    </Col>
                                </FormGroup>

                            </Form>
                        </Col>
                        <Col xl="6">
                            <FormGroup row>
                                <Label htmlFor="example-email-input" sm="3.5">アンケートを選択</Label>
                                <Col sm="6">
                                    <Select
                                        placeholder="検索"
                                        value={selectedGroup}
                                        onChange={this.handleSelectGroup}
                                        options={optionGroup}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xl="12" >

                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                localization=
                                {
                                    {
                                        locale: "ja"
                                    }
                                } />
                        </Col>
                        <Col xl='12 pull-right mt-4'>
                            <Button color="primary" className="waves-effect waves-light"> <span>送信</span> <i className="fab fa-telegram-plane m-l-10"></i> </Button>

                        </Col>

                    </Row>


                </Container>

            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ Login }) => {
    return {
        role: Login.role
    }
}


export default withRouter(connect(mapStateToProps, { activateAuthLayout, addUserSuccessful })(UserManagement));