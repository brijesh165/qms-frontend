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
    Spinner,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { activateAuthLayout, addUserStart, sendemailstart, getUserListStart } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import 'chartist/dist/scss/chartist.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';

import EditToggler from '../../components/userEditToggler';
// import data from '../../data/questions.json'

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
            userrole: '',
            emailsubject: '',
            expiresat: '',
            sendbody: '',
            optionGroup: JSON.parse(localStorage.getItem('optionGroup')) || [],
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    resetState = () => {
        console.log('IN RESET');
        this.setState({
            selectedEmail: [],
            sendsubject: '',
            expirydate: '',
            sendbody: ''
        })
    }

    handleSubmit(event, values) {
        this.props.addUserStart({
            "username": values.username,
            "useremail": values.useremail,
            "userdesig": values.userdesig,
            "usercompany": values.usercompany,
            "userrole": values.userrole
        }, this.props.history);
        // this.props.checkLogin(values.username, values.useremail, values.userdesgig, values.usercompany, this.props.history);
    }

    handleEditorChange = (event) => {
        this.setState({
            sendbody: event.blocks[0].text
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleEmailSubmit(event, values) {
        event.preventDefault();
        // console.log('Handle Email Submit: ',
        //     this.state.emailsubject, this.state.expiresat,
        //     this.state.selectedGroup.label, this.state.selectedGroup.id, this.state.selectedEmail,
        //     this.state.sendbody);
        this.props.sendemailstart({
            "sendsubject": this.state.emailsubject,
            "sendusers": this.state.selectedEmail,
            "questname": this.state.selectedGroup.label,
            "questid": this.state.selectedGroup.id,
            "expirydate": this.state.expiresat,
            "sendbody": this.state.sendbody,
            "send": "True",
        }, this.props.history);
    }

    handleSelectGroup = (selectedGroup) => {
        this.setState({ selectedGroup });
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        this.props.getUserListStart();
    }

    componentWillMount() {
        if (this.props.users) {
            this.setState({
                users: this.props.users
            });
        }
        if (this.props.loading) {
            this.setState({
                loading: this.props.loading
            })
        }
        // console.log('COMPONENT WILL MOUNT : ', this.props.questions);
        // if (this.props.questions.length > 0) {
        //     this.setOptionGroup(this.props.questions)
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users) {
            this.setState({
                users: nextProps.users
            })
        }
        if (nextProps.loading) {
            this.setState({
                loading: nextProps.loading
            })
        }
        if (this.props.questions) {
            this.setOptionGroup(nextProps.questions);
        }
        if (this.props.sendEmailStatus) {
            this.resetState()
        }
    }

    setOptionGroup(nextProps) {
        let newOptionGroup = [];
        let newOptions;
        for (let i = 0; i < nextProps.length; i++) {
            newOptions = {
                id: nextProps[i].id,
                label: nextProps[i].questname,
                value: nextProps[i].questions
            }

            newOptionGroup.push(newOptions);
        }

        this.setState({
            optionGroup: newOptionGroup
        }, () => {
            localStorage.setItem('optionGroup', JSON.stringify(newOptionGroup))
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    addEmail = (item, event) => {
        console.log('Checked Item : ', item);
        if (event.target.checked) {
            let selectedEmail = [...this.state.selectedEmail]
            selectedEmail.push(item.useremail)
            this.setState({ selectedEmail: selectedEmail })

        } else {
            const prevState = [...this.state.selectedEmail];
            let newEmail = prevState.indexOf(item.username);
            prevState.splice(newEmail, 1);
            console.log(prevState);
            // let new_mails = [...this.state.selectedEmail].map(itm => {
            //     if (itm !== item.useremail) {
            //         return itm
            //     }
            // })
            // console.log(new_mails);
            this.setState({ selectedEmail: prevState })
        }
    }

    searchUser = (event) => {
        if (this.props.users) {
            let new_data = this.props.users.filter(item => {
                return item.username.toLowerCase().includes(event.target.value.toLowerCase())
            })
            console.log(new_data, 'vvvv')
            this.setState({ users: new_data })
        }
    }

    toggleEditModal = () => {
        this.setState({ toggleEditModal: !this.state.toggleEditModal })
    }

    render() {
        const { selectedGroup } = this.state;
        let userTable = <Spinner />;
        if (this.props.loading) {
            userTable =
                this.state.users ?
                    this.state.users.map((item, index) => (
                        <tr key={index}>
                            <td><div><Input type='checkbox' style={{ position: "relative" }} onClick={(event) => this.addEmail(item, event)} /></div></td>
                            <th scope="row">{item.username}</th>
                            <td>
                                {item.usercompany}
                                {/* <div>
                                <img src={require(`./../../images/users/${item.image}`)} alt="" className="thumb-md rounded-circle mr-2" /> 
                            </div> */}
                            </td>
                            <td>{item.userdelg}</td>
                            {/* {
                            this.props.role == 'superadmin' &&
                            <th scope="col">{item.userdelg}</th>
                        } */}
                            {/* <th>{item._id}</th> */}
                            <td colSpan="2"><span className="badge badge-success">
                                {item.role}
                                {/* {
                                this.props.role === '管理者' ?
                                    item.role === 'ユーザー管理' ? 'end user' : '管理者'
                                    :
                                    '管理者'
                            } */}
                            </span></td>
                            <td>
                                <div>
                                    <EditToggler
                                        user={item}
                                        role={this.props.role}
                                    />
                                    {/* <Link to="#" className="btn btn-primary btn-sm">編集</Link> */}
                                </div>
                            </td>
                        </tr>
                    )) : null
        }

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

                    {/* Add User Model */}
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
                                        <Button type="submit" color="primary" onClick={() => this.setState({ toggleEditModal: false })} className="waves-effect waves-light">追加</Button>
                                    </Col>
                                </Row>
                            </AvForm>
                        </ModalBody>
                    </Modal>

                    {/* User Management User Table */}
                    <Row>
                        <Col xl="12 text-center">
                            <Card>
                                <CardBody>
                                    {/* <h4 className="mt-0 header-title mb-4">株式会社 島根情報処理センターのユーザーリスト</h4> */}
                                    <div className="table-responsive" style={{
                                        maxHeight: '400px',
                                        overflowY: 'auto'
                                    }}>
                                        <Table className="table table-hover" striped responsive height="200">
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
                                                {userTable}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>

                    {/* Email Box */}
                    <Row className="align-items-center" style={{ border: '1px solid grey', borderRadius: 5, padding: 10 }}>
                        {/* <Col xl="12" > */}
                        <Form onSubmit={this.handleEmailSubmit}>
                            <Row>
                                <Col md={6}>
                                    {/* <Form> */}
                                    <FormGroup>
                                        <Label htmlFor="example-email-input">メール</Label>
                                        <Input type="email"
                                            disabled
                                            value={this.state.selectedEmail.map(item => item)}
                                            id="example-email-input" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label htmlFor="example-email-input">アンケートを選択</Label>
                                        <Select
                                            placeholder="検索"
                                            value={selectedGroup}
                                            onChange={this.handleSelectGroup}
                                            options={this.state.optionGroup}
                                        >
                                            {/* {
                                                this.state.optionGroup.map((item) => {
                                                    return <options>item</options>
                                                })
                                            } */}
                                        </Select>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label htmlFor="example-text-input">件名</Label>

                                        <Input type="text"
                                            name="emailsubject"
                                            onChange={this.handleChange}
                                            value={this.state.emailsubject}
                                            id="example-text-input" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label htmlFor="exampleDatetime">期限切れ</Label>
                                        <Input
                                            type="date"
                                            name="expiresat"
                                            onChange={this.handleChange}
                                            value={this.state.expiresat}
                                            id="exampleDatetime"
                                            placeholder="期限切れ"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            {/* </Form> */}
                            {/* <Col xl="6">
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
                                    <br /><br />
                                    </FormGroup>
                            <FormGroup row>
                                    <Label htmlFor="exampleDatetime" sm="3.5" className="mr-5">期限切れ</Label>
                                    <Col sm="6">
                                        <Input
                                            type="date"
                                            name="expiresat"
                                            onChange={this.handleChange}
                                            value={this.state.expiresat}
                                            id="exampleDatetime"
                                            placeholder="期限切れ"
                                        />
                                    </Col>
                                </FormGroup>
                            </Col> */}
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
                                    }
                                    name="sendbody"
                                    value={this.state.sendbody}
                                    onChange={this.handleEditorChange}
                                />
                            </Col>
                            <Col xl='12 pull-right mt-4'>
                                <Button type="submit" color="primary"
                                    className="waves-effect waves-light">
                                    <span>送信</span> <i className="fab fa-telegram-plane m-l-10"></i>
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>

            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ Login, userManagement }) => {
    console.log('MAP STATE TO PROPS : ', userManagement.sendEmailSuccess)
    return {
        role: Login.role,
        loading: userManagement.loading,
        questions: userManagement.questions,
        users: userManagement.userData,
        sendEmailStatus: userManagement.sendEmailSuccess
    }
}

export default withRouter(connect(mapStateToProps, { activateAuthLayout, getUserListStart, addUserStart, sendemailstart })(UserManagement));