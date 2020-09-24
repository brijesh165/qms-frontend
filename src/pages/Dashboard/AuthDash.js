import React, { Component } from 'react';
import {
    Container, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem, Alert
} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import { getQuestionaireStart, endSurveyStart, downloadSurveyStart, deleteSurveyStart } from './../../store/actions';

import { Scrollbars } from 'react-custom-scrollbars';
import DataTable from 'react-data-table-component';
import questions from '../../data/sample.json'
import 'chartist/dist/scss/chartist.scss';
import SweetAlert from 'react-bootstrap-sweetalert';
import Spinner from './../../components/Spinner/Spinner';
import dashboardManagementSagas from '../../store/dashboard/saga';

class AuthDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            questionaireData: [],
            questions: questions,
            changeName: null,
            editQuestionModal: false,
            selectedQuestion: '',
            downloadSurveyData: [],
        };
        this.surveyLink = React.createRef();
    }

    componentDidMount() {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.activateAuthLayout();
        this.props.getQuestionaireStart(localStorageData.token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.questionaire !== prevProps.questionaire) {
            this.setState({
                questionaireData: this.props.questionaire
            })
        }

        if (this.props.downloadSurveySuccess !== prevProps.downloadSurveySuccess) {
            this.setState({ downloadSurveyData: this.props.downloadSurvey }, () => {
                this.surveyLink.link.click()
            });
        }

        if (this.props.downloadFail !== prevProps.downloadFail) {
            alert(this.props.downloadError);
        }

        if (this.props.endSurveyFail !== prevProps.endSurveyFail) {
            alert(this.props.endSurveyError)
        }
        if (this.props.getSurveyFail !== prevProps.getSurveyFail) {
            alert(this.props.getSurveyError)
        } 

    }

    deleteQuestion = (index) => {
        let new_questions = [...this.state.questions];
        new_questions.splice(index, 1);
        this.setState({ questions: new_questions })
    }

    onEndSurveyHandler = (questid) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.endSurveyStart(questid, localStorageData.token)
    }

    onDownloadSurveyHandler = (questid) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.downloadSurveyStart(questid, localStorageData.token);
    }

    onDeleteHandler = (questid) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.deleteSurveyStart(questid, localStorageData.token);
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
                cell: row => <Button onClick={() => this.onDownloadSurveyHandler(row.questid)} style={{ backgroundColor: 'transparent', border: 0 }}><i className="mdi mdi-cloud-download-outline cloud-download" style={{ color: 'grey' }}></i></Button>,
                // sortable: true,
                // right: true,
            },
        ];

        let rows = <Spinner />;
        if (this.props.loading) {
            rows = this.props.questionaireError ? <p>{this.props.questionaireError}</p> : this.state.questionaireData.map((item, index) =>
                <Card className='card-4 mt-3' key={index}>
                    <Row>
                        <Col xl='6 text-center mt-2' >
                            {
                                <h6>{item.questname}</h6>
                            }
                        </Col>
                        <Col xl='2 text-center mt-2' ><h6>{item.createdAt.slice(0, 10).replace(/-/g, "/")}</h6></Col>
                        <Col xl='4  text-center mt-2' >
                            <Button type="button"
                                onClick={() => this.onDeleteHandler(item.id)} color="danger" className="waves-effect waves-light">Delete</Button>
                        </Col>
                    </Row>
                </Card>
            )
        }

        let surveyTable = <Spinner />;
        if (this.props.loading) {
            surveyTable = this.state.questionaireData ?
                <Row style={{ marginTop: 30 }}>
                    <Col xl='12'>
                        <DataTable
                            // title="Table List"
                            columns={columns}
                            data={this.props.questionaire}
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

                    {this.props.dashboardError && <Alert color="danger">
                        {this.props.dashboardError}
                    </Alert>}

                    <Row>
                        <Scrollbars style={{ height: 300, display: 'flex', alignItems: 'center', border: '1px solid grey' }}>
                            <Col xl='12'>
                                {rows}
                            </Col>
                        </Scrollbars>
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
                </Container>

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ Login, dashboardManagement }) => {
    console.log('MAP STATE : ', dashboardManagement.questionaireData)
    return {
        role: Login.role,
        dashboardError: dashboardManagement.dashboardError,
        questionaire: dashboardManagement.questionaireData,
        loading: dashboardManagement.loading,
        downloadSurvey: dashboardManagement.downloadSurvey,
        downloadSurveySuccess: dashboardManagement.downloadSurveySuccess,
        downloadFail: dashboardManagement.downloadFail,
        downloadError: dashboardManagement.downloadError,
        endSurveyFail: dashboardManagement.endSurveyFail,
        endSurveyError: dashboardManagement.endSurveyError,
        getSurveyFail: dashboardManagement.getSurveyFail,
        getSurveyError: dashboardManagement.getSurveyError,    
    }
}


export default withRouter(connect(mapStateToProps, {
    deleteSurveyStart, activateAuthLayout,
    getQuestionaireStart, endSurveyStart, downloadSurveyStart
})(AuthDash));
