import React, { Component } from 'react';
import {
    Container, Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Input,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,

} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';
import Toggler from '../../components/dashToggler'
import DataTable from 'react-data-table-component';
import data from '../../data/questions.json'
import questions from '../../data/sample.json'
import Select from 'react-select';
import QuestionModal from '../../components/questionModal'
import 'chartist/dist/scss/chartist.scss';
import SweetAlert from 'react-bootstrap-sweetalert';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const CustomTitle = (data) => (
    <a>{data.name}</a>
)



class AuthDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            questions: questions,
            changeName: null,
            editQuestionModal: false,
            selectedQuestion: ''
        };
    }

    componentDidMount() {
        this.props.activateAuthLayout();

    }

    copyQuestion = (item) => {
        let questions = [...this.state.questions]
        questions.push(item)
        this.setState({ questions: questions })

    }
    deleteQuestion = (index) => {
        let new_questions = [...this.state.questions];
        new_questions.splice(index, 1);
        this.setState({ questions: new_questions })
    }
    rename = (index, event) => {
        let new_questions = [...this.state.questions];
        new_questions[index].name = event.target.value;
        this.setState({ questions: new_questions })
    }
    keyPress = (e) => {
        if (e.keyCode == 13) {
            //    console.log('value', e.target.value, e.keyCode);
            this.setState({ changeName: null })
        }
    }
    toggleEditModal = (index) => {
        let question = this.state.questions[index]
        this.setState({ selectedQuestion: question }, () => {
            this.setState({ toggleEditModal: !this.state.toggleEditModal })
        })

    }

    render() {
        const columns = [
            {
                name: 'アンケート名',
                selector: 'name',
                // sortable: true,
            },
            {
                name: 'アンケート状況',
                selector: 'name',
                cell: row => <select id="cars">
                    <option value="回答受諾">回答受諾</option>
                    <option value="回答終了">回答終了</option>
                </select>,
                // grow: 2,

                // sortable: true,
                // right: true,
            },
            {
                name: '回答数',
                selector: 'action',
                cell: row => <p>{row.status}</p>,
                // sortable: true,
                // right: true,
            },
            {
                name: '作成日',
                selector: 'action',
                cell: row => <p>{row.created}</p>,
                // sortable: true,
                // right: true,
            },
            {
                name: '最終更新日',
                selector: 'action',
                cell: row => <p>{row.updated}</p>
                // sortable: true,
                // right: true,
            },
            {
                name: '最終提出日',
                selector: 'action',
                cell: row => <p>{row.submission}</p>
                // sortable: true,
                // right: true,
            },
            {
                name: 'ダウンロード',
                selector: 'action',
                cell: row => <Button onClick={() => this.setState({ confirm_both: true })} style={{ backgroundColor: 'transparent', border: 0 }}><i class="mdi mdi-cloud-download-outline cloud-download" style={{ color: 'grey' }}></i></Button>,
                // sortable: true,
                // right: true,
            },
        ];
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">ホームページ</h4>
                                <Breadcrumb>
                                    <BreadcrumbItem active>QMSのダッシュボードにようこそ！</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Scrollbars style={{ height: 300, display: 'flex', alignItems: 'center', border: '1px solid grey' }}>
                            <Col xl='12'>
                                {
                                    this.state.questions.map((item, index) =>
                                        <Card className='card-4 mt-3' key={index}>
                                            <Row>
                                                <Col xl='5 text-center mt-3' >
                                                    {
                                                        this.state.changeName == index ?
                                                            <Input style={{ marginBottom: 10, marginLeft: 5 }} type='text' value={item.name} onKeyDown={this.keyPress} onChange={(event) => this.rename(index, event)} />
                                                            :
                                                            <>{item.name}</>

                                                    }
                                                    {/* {item.name} */}
                                                </Col>
                                                <Col xl='2 text-center mt-3' >{item.date}</Col>
                                                <Col xl='2 text-center mt-3' >締切日: 12/06/2020</Col>
                                                <Col xl='2  text-center mt-2' ><i class="mdi mdi-cloud-download-outline cloud-download"></i></Col>
                                                <Col xl='1  text-center' >
                                                    <Toggler
                                                        copyQuestion={() => this.copyQuestion(item)}
                                                        deleteQuestion={() => this.deleteQuestion(index)}
                                                        rename={() => this.setState({ changeName: index })}
                                                        editQuestion={() => this.toggleEditModal(index)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    )
                                }


                            </Col>
                        </Scrollbars>
                        {/* <Scrollbars> */}
                        {/* <DataTable
                        title="Arnold Movies"
                        columns={columns}
                        data={data}
                    /> */}
                        {/* </Scrollbars> */}
                    </Row>

                    <Row style={{ marginTop: 30 }}>
                        <Col xl='12'>
                            <DataTable
                                // title="Table List"
                                columns={columns}
                                data={data}
                            />
                        </Col>
                    </Row>

                    {
                        this.state.confirm_both &&
                        <SweetAlert
                            title="Are you sure?"
                            showCancel
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="danger"
                            onConfirm={() => this.setState({ confirm_both: false, success_dlg: true, dynamic_title: 'Deleted', dynamic_description: 'Your file has been deleted.' })}
                            onCancel={() => this.setState({ confirm_both: false, error_dlg: true, dynamic_title: 'Cancelled', dynamic_description: 'Your imaginary file is safe :)' })} >
                            You won't be able to revert this!
                        </SweetAlert>
                    }


                    <Modal className="modal-lg" isOpen={this.state.toggleEditModal} toggle={() => this.setState({ toggleEditModal: false })} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">アンケートを編集してください</h5>
                            <button onClick={() => this.setState({ toggleEditModal: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-text-input" sm="2">アンケート名</Label>
                                    <Col sm="10">
                                        <Input type="text" name={'form_header'} value={this.state.selectedQuestion.name} id="example-text-input" onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col xs='12 text-center'>

                                <QuestionModal
                                    children={this.state.selectedQuestion.children}
                                />
                            </Col>


                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => this.setState({ toggleEditModal: false })} className="waves-effect">閉じる</Button>
                            <Button onClick={() => this.setState({ toggleEditModal: false })} type="button" color="primary" className="waves-effect waves-light">変更を保存</Button>
                        </ModalFooter>
                    </Modal>
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


export default withRouter(connect(mapStateToProps, { activateAuthLayout })(AuthDash));
