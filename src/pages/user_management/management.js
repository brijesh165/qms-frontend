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
        Button
       
             } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import 'chartist/dist/scss/chartist.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';

import EditToggler from '../../components/userEditToggler';

import data from  '../../data/questions.json'


const optionGroup = [

            { label: "アンケート1", value: "Tent" },
            { label: "アンケート2", value: "Flashlight" },
            { label: "アンケート3", value: "Toilet Paper" }
  
];



class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg:'',
            error_dlg:'',
            selectedEmail:[],
            users : data
        };
    }
    handleSelectGroup = (selectedGroup) => {
        this.setState({ selectedGroup });
    }

    componentDidMount() {
        this.props.activateAuthLayout();
    }
    addEmail = (item, event) => {
        if(event.target.checked){
            let selectedEmail = [...this.state.selectedEmail]
            selectedEmail.push(item.email)
            this.setState({selectedEmail: selectedEmail})

        }else{
            let new_mails = [...this.state.selectedEmail].map(itm => {
                 if(itm != item.email) {
                    return itm
                 }  
            })
            this.setState({selectedEmail: new_mails})
        }
    }
    
    searchUser = (event) => {
        console.log(event.target.value, 'vvvv')
        let new_data = data.filter(item => {
            return item.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(new_data, 'vvvv')

        this.setState({users: new_data})
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
                                </div>
                            </Col>
                        </Row>
                    </div>

                
                
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
                                                    <th scope="col">ユーザーID</th>
                                                    <th scope="col">名前</th>
                                                    {
                                                        this.props.role == 'superadmin' &&
                                                            <th scope="col">会社名</th>
                                                    }
                                                    <th scope="col">パスワード</th>
                                                    <th scope="col" colSpan="2">権限ステータス</th>
                                                    {/* <th scope="col" colSpan="2">Action</th> */}

                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.users.map(item => (
                                                    <tr>
                                                        <td><Input type='checkbox' onClick={(event) => this.addEmail(item, event)}/></td>
                                                        <th scope="row">{item.userid}</th>
                                                        <td>
                                                            <div>
                                                                <img src={require(`./../../images/users/${item.image}`)} alt="" className="thumb-md rounded-circle mr-2" /> {item.username}
                                                            </div>
                                                        </td>
                                                         {
                                                            this.props.role == 'superadmin' && 
                                                                <th scope="col">{item.company}</th>
                                                        }
                                                        <th>{item._id}</th>
                                                        <td><span className="badge badge-success">
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
                                                                role = {this.props.role}
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
               
                    <Row className="align-items-center" style={{border:'1px solid grey',borderRadius:5,padding:10}}>
                        {/* <Col xl="12" > */}
                            <Col xl="6">
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-email-input" sm="2">メール</Label>
                                    <Col sm="10">
                                    <Input type="email" value={this.state.selectedEmail.map(item => item )} id="example-email-input" />
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
                                        locale:"ja"
                                    }
                                }/>
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
const mapStateToProps = ({Login}) => {
    return{
        role: Login.role
    }
}


export default withRouter(connect(mapStateToProps, { activateAuthLayout })(UserManagement));