import React, { Component } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import 'chartist/dist/scss/chartist.scss';
import SweetAlert from 'react-bootstrap-sweetalert';
import { getQuestionaireStart, endSurveyStart, downloadSurveyStart } from './../../store/actions';

const optionGroup = [

    { label: "アンケート1", value: "Tent" },
    { label: "アンケート2", value: "Flashlight" },
    { label: "アンケート3", value: "Toilet Paper" }

];

class Responses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            downloadSurveyData: [],
            optionGroup: []
        };
    }

    componentWillReceiveProps(nextProps) {
        let optionGroupName = this.props.questionaire ? this.props.questionaire.map((item) => {
            return { 'label': item.questname, 'value': item.questname }
        }) : null;

        if (this.props.questionaire) {
            this.setState({
                masterList: [...nextProps.questionaire],
                optionGroup: optionGroupName
            })
        }

    }

    componentDidMount() {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.activateAuthLayout();
        this.props.getQuestionaireStart(localStorageData.token);
    }

    handleSelectGroup = (selectedGroup) => {
        const selectQuestion = [...this.state.masterList];
        let new_question = selectQuestion.filter((item) => {
            return item.questname === selectedGroup.value
        })

        this.setState({ questions: new_question })
    }

    onEndSurveyHandler = (questid) => {
        this.props.endSurveyStart(questid)
    }

    onDownloadSurveyHandler = (questname) => {
        this.props.downloadSurveyStart(questname);
        if (!this.props.loading && this.props.downloadSurvey.length > 0) {
            this.setState({ downloadSurveyData: this.props.downloadSurvey }, () => {
                this.surveyLink.link.click()
            });
        }
    }

    render() {
        const { selectedGroup } = this.state;
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
                cell: row => <Button onClick={() => this.onDownloadSurveyHandler(row.questname)} style={{ backgroundColor: 'transparent', border: 0 }}><i className="mdi mdi-cloud-download-outline cloud-download" style={{ color: 'grey' }}></i></Button>,
                // sortable: true,
                // right: true,
            },
        ];

        let surveyTable = <Spinner />
        if (this.props.loading) {
            surveyTable = this.props.questionaire ?
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
                            <Col lg="6">
                                <h4 className="page-title">アンケートを選択して回答を確認してください。</h4>
                                <Breadcrumb>

                                </Breadcrumb>
                            </Col>

                        </Row>
                        <Col md='4 p-0 m-0'>
                            <Select
                                value={selectedGroup}
                                onChange={this.handleSelectGroup}
                                options={this.state.optionGroup}
                                placeholder='検索。。'
                            />
                        </Col>

                    </div>

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
    return {
        role: Login.role,
        questionaire: dashboardManagement.questionaireData,
        loading: dashboardManagement.loading,
        downloadSurvey: dashboardManagement.downloadSurvey
    }
}

export default withRouter(connect(mapStateToProps, { activateAuthLayout, getQuestionaireStart, endSurveyStart, downloadSurveyStart })(Responses));