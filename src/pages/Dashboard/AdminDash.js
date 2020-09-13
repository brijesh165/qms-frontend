import React, { Component } from 'react';
import {
    Container, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem, Input,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Spinner,

} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import { getSurveyStart, endSurveyStart, downloadSurveyStart, deletequestionnairestart } from './../../store/actions';

import { Scrollbars } from 'react-custom-scrollbars';
import DataTable from 'react-data-table-component';
import questions from '../../data/sample.json'
import QuestionModal from '../../components/questionModal'
import 'chartist/dist/scss/chartist.scss';
import SweetAlert from 'react-bootstrap-sweetalert';


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
            selectedQuestion: '',
            downloadSurveyData: [],
        };
        this.surveyLink = React.createRef();
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        this.props.getSurveyStart();
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
        console.log('Questions : ', question);
        this.setState({ selectedQuestion: question }, () => {
            this.setState({ toggleEditModal: !this.state.toggleEditModal })
        })
        console.log('Toggle Edit Modal : ', this.state.selectedQuestion);
    }

    onEndSurveyHandler = (questid) => {
        console.log('QUEST ID : ', questid);
        this.props.endSurveyStart(questid)
    }

    onDownloadSurveyHandler = (questid) => {
        console.log('QUEST NAME : ', questid);
        this.props.downloadSurveyStart(questid);
        if (!this.props.loading && this.props.downloadSurvey.length > 0) {
            this.setState({ downloadSurveyData: this.props.downloadSurvey }, () => {
                this.surveyLink.link.click()
            });
        }
    }

    onDeleteHandler = (questid) => {
        this.props.deletequestionnairestart(questid)
    }

    render() {
        const columns = [
            {
                name: 'アンケート名',
                selector: 'name',
                cell: row => <p>{row.questname}</p>
                // sortable: true,
            },
            {
                name: 'アンケート状況',
                selector: 'name',
                cell: row => <select id="cars" onChange={() => this.onEndSurveyHandler(row.id)}>
                    <option value="回答受諾" disabled={row.accept === false}>回答受諾</option>
                    <option value="回答終了">回答終了</option>
                </select>,
                // grow: 2,

                // sortable: true,
                // right: true,
            },
            {
                name: '回答数',
                selector: 'action',
                cell: row => <p>{row.submitCount}/{row.totalCount}</p>,
                // sortable: true,
                // right: true,
            },
            {
                name: '作成日',
                selector: 'action',
                cell: row => <p>{row.createdAt.slice(0, 10).replace(/-/g, "/")}</p>,
                // sortable: true,
                // right: true,
            },
            {
                name: '最終更新日',
                selector: 'action',
                cell: row => <p>{row.updatedAt.slice(0, 10).replace(/-/g, "/")}</p>
                // sortable: true,
                // right: true,
            },
            {
                name: 'ダウンロード',
                selector: 'action',
                // cell: row => <CSVLink style={{ textDecoration: 'none' }}
                //     onClick={() => this.onDownloadSurveyHandler(row.questname)}
                //     data={this.state.downloadSurveyData}
                //     ref={(r) => this.surveyLink = r}
                //     filename={'questions.csv'}
                //     target="_blank">
                //     <i className="mdi mdi-cloud-download-outline cloud-download" style={{ color: 'grey' }}></i>
                // </CSVLink>
                cell: row => <Button onClick={() => this.onDownloadSurveyHandler(row.id)} style={{ backgroundColor: 'transparent', border: 0 }}><i className="mdi mdi-cloud-download-outline cloud-download" style={{ color: 'grey' }}></i></Button>,
                // sortable: true,
                // right: true,
            },
        ];

        let rows = <Spinner />;
        if (this.props.loading) {
            rows = this.props.survey.map((item, index) =>
                <Card className='card-4 mt-3' key={index}>
                    <Row>
                        <Col xl='6 text-center mt-2' >
                            {
                                // this.state.changeName == index ?
                                //     <Input style={{ marginBottom: 10, marginLeft: 5 }} type='text' value={item.questname} onKeyDown={this.keyPress} onChange={(event) => this.rename(index, event)} />
                                //     :
                                <h6>{item.questname}</h6>

                            }
                            {/* {item.name} */}
                        </Col>
                        <Col xl='2 text-center mt-2' ><h6>{item.createdAt.slice(0, 10).replace(/-/g, "/")}</h6></Col>
                        {/* <Col xl='2 text-center mt-3' >{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(item.createdAt)}</Col> */}
                        {/* <Col xl='2  text-center mt-2' ><i class="mdi mdi-cloud-download-outline cloud-download"></i></Col> */}
                        <Col xl='4  text-center mt-2' >
                            <Button type="button" 
                                    onClick={() => this.onDeleteHandler(item.id)} color="danger" className="waves-effect waves-light">Delete</Button>
                            {/* <Toggler
                            copyQuestion={() => this.copyQuestion(item)}
                            deleteQuestion={() => this.deleteQuestion(index)}
                            rename={() => this.setState({ changeName: index })}
                            editQuestion={() => this.toggleEditModal(index)}
                        /> */}
                        </Col>
                    </Row>
                </Card>
            )
        }

        let surveyTable = <Spinner />;
        if (this.props.loading) {
            surveyTable = this.props.survey ?
                <Row style={{ marginTop: 30 }}>
                    <Col xl='12'>
                        <DataTable
                            // title="Table List"
                            columns={columns}
                            data={this.props.survey}
                        />
                    </Col>
                </Row> : null
        }
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
                                {rows}
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

                    <CSVLink style={{ textDecoration: 'none' }}
                        data={this.state.downloadSurveyData}
                        ref={(r) => this.surveyLink = r}
                        filename={'questions.csv'}
                        target="_blank" />

                    {surveyTable}
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

const mapStateToProps = ({ Login, dashboardManagement }) => {
    console.log('MAP STATE TO PROPS : ', dashboardManagement)
    return {
        role: Login.role,
        survey: dashboardManagement.surveyData,
        loading: dashboardManagement.loading,
        downloadSurvey: dashboardManagement.downloadSurvey
    }
}


export default withRouter(connect(mapStateToProps, { deletequestionnairestart, activateAuthLayout, getSurveyStart, endSurveyStart, downloadSurveyStart })(AuthDash));
