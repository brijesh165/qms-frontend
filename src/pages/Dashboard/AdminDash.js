import React, { Component } from 'react';
import {
    Container, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Alert
} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import Rating from 'react-rating';
import Editable from 'react-x-editable';
import Spinner from '../../components/Spinner/Spinner';

import {
    getAdminQuestionaireStart, endSurveyStart, downloadSurveyStart, deleteSurveyStart,
    getUserQuestionaireStart, fillQuestionStart, submitQuestionStart
} from './../../store/actions';

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

            questions: [],
            questions2: [],
            optionGroup: [],
            optionGroup2: [],
            fillFormToggle: false,
            showFormToggle: false,
            form_name: '',
            selectedQuestion: '',
            q5InputValue: '',
            q8InputValue: '',
            children: [[],],
            filledChildren: [[],],
            ratingCount: '',
            radioButton: false
        };
        this.surveyLink = React.createRef();
    }

    componentDidMount() {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.activateAuthLayout();
        this.props.getAdminQuestionaireStart(localStorageData.token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.questions !== prevProps.questions) {
            let optionGroupName = this.props.questions ? this.props.questions.map((item) => {
                return { 'label': item.questname, 'value': item.questname }
            }) : null
    
            this.setState({
                questions: this.props.questions,
                optionGroup: optionGroupName
            })
        }

        if (this.props.questions2 !== prevProps.questions2) {
            let optionGroupName2 = this.props.questions2 ? this.props.questions2.map((item) => {
                return { 'label': item.questname, 'value': item.questname }
            }) : null
    
            this.setState({
                questions2: this.props.questions2,
                optionGroup2: optionGroupName2
            })
        }

        if (this.props.downloadSurveySuccess !== prevProps.downloadSurveySuccess) {
            console.log('DOWNLOAD DATA : ', this.props.downloadSurvey);
            // const downloadResp = this.props.downloadSurvey.map((item, index) => {
            //     console.log('IN MAP : ', item.response[index][index]);
            //     return {"question": item.response[index][index].question, 
            //             "options": item.response[index][index].options,
            //             "answers": item.response[index][index].answers
            //         }
            // });
            let downloadResp = [];

            for (let i = 0; i < this.props.downloadSurvey.length; i++) {
                // for (let j=0; j < this.props.downloadSurvey[i].response.length; j++) {
                //     console.log('IN LOOP : ', this.props.downloadSurvey[i].response[j][i]);
                //     let resp = {
                //         "question": this.props.downloadSurvey[i].response[j][i].question,                
                //         "options": this.props.downloadSurvey[i].response[j][i].options,                
                //         "answers": this.props.downloadSurvey[i].response[j][i].answers,
                //         "username": this.props.downloadSurvey[i].username        
                //     }
                //     downloadResp.push(resp);
                // }

                for (let j=0; j<this.props.downloadSurvey[i].response[0].length; j++){
                    let resp = {
                        "question": this.props.downloadSurvey[i].response[0][j].question,
                        "options": this.props.downloadSurvey[i].response[0][j].options,
                        "answers": this.props.downloadSurvey[i].response[0][j].answers,
                        "username": this.props.downloadSurvey[i].username
                    }
                    downloadResp.push(resp);
                }
            }
            console.log('DOWNLOAD RESP : ', downloadResp);
            let anotherObj = downloadResp.map(function (item) {
                return Object.values({
                    username: item.username.replace(/,/g, ''),
                    question: item.question.replace(/,/g, ''),
                    answers: item.answers.join("|").replace(/,/g, ''),
                    options: item.options.join("|").replace(/,/g, ''),
                })
            })
            anotherObj.unshift(['User Name', 'Question', 'Answers', 'Options']);
            console.log('Another Obj : ', anotherObj);
            let csvContent = "data:text/csv;charset=utf-8," + anotherObj.map(e => e.join(",")).join("\n");
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        }

        if (this.props.downloadFail !== prevProps.downloadFail) {
            alert(this.props.downloadError);
        }
        if (this.props.endSurveyFail !== prevProps.endSurveyFail) {
            alert(this.props.endSurveyError)
        }
        if (this.props.fillSurveyFail !== prevProps.fillSurveyFail) {
            alert(this.props.fillSurveyError)
        }
        if (this.props.submitSurveyFail !== prevProps.submitSurveyFail) {
            alert(this.props.submitSurveyError)
        }
        if (this.props.getAdminSurveyFail !== prevProps.getAdminSurveyFail) {
            alert(this.props.getAdminSurveyError)
        } 
        if (this.props.getUserSurveyFail !== prevProps.getUserSurveyFail) {
            alert(this.props.getUserSurveyError)
        }

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

    // TABLE 3 AND 4
    handleInputChange = (event) => {
        this.setState({
            q5InputValue: event.target.value
        })
    }

    questionTypeHandler = (type, options, answers, parentIndex, childIndex) => {
        if (type.value == 1) { }
        switch (type.value) {
            case 1:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        {options.map((item, index) => (
                            <Row className='text-center'>
                                <div className="custom-control custom-radio custom-control-inline ml-2 mt-3">
                                    <Label key={index} className="ml-2">
                                        <Input type="radio"
                                            key={index}
                                            name={item}
                                            disabled={this.state.showFormToggle}
                                            checked={
                                                answers.includes(item) ? answers.includes(item) :
                                                    this.state.radioButton == item + '' + index}
                                            value={item ? item + '' + index : '??????????????????????????????'}
                                            onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex, index)} />
                                        {item}
                                    </Label>
                                </div>
                            </Row>
                        ))}
                    </Row>
                )
            case 2:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        {options.map((item, index) => (
                            <Row className='text-center'>
                                <div className="custom-control custom-radio custom-control-inline ml-4 mt-4">
                                    <Label for={`customCheckInline${index}`}>{item}</Label>
                                    <Input type="checkbox"
                                        id={`customCheckInline${index}`}
                                        disabled={this.state.showFormToggle}
                                        checked={answers.includes(item)}
                                        value={item ? item : '??????????????????????????????'}
                                        onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex, index)} />
                                </div>
                            </Row>
                        ))}
                    </Row>
                )
            case 3:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        <Row className='text-center' style={{ width: '100%' }}>
                            <div className="custom-control custom-radio custom-control-inline ml-2 mt-3">
                                {
                                    answers[0] > 0 ?
                                        <Rating fractions={2} stop={options.length}
                                            readonly
                                            initialRating={answers[0]}
                                        /> :
                                        <Rating fractions={2} stop={options.length}
                                            initialRating={this.state.ratingCount}
                                            onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)}
                                        />
                                }

                            </div>
                        </Row>
                    </Row>
                )
            case 4:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        <Row className='text-center' style={{ width: '100%' }}>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 ml-2 mb-1 p-0">
                                <Input type="select"
                                    defaultValue={answers[0]}
                                    name="ddlCreditCardType" id="ddlCreditCardType"
                                    disabled={this.state.showFormToggle}
                                    onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)}>
                                    {
                                        options.map((item, index) => (
                                            <option value={item} disabled={this.state.showFormToggle}>{item}</option>
                                        ))
                                    }

                                </Input>
                            </div>
                        </Row>
                    </Row>
                )
            case 5:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        <Row className='text-center' style={{ width: '100%' }}>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 ml-2 mb-1 p-0">
                                <Input type="text" value={answers[0] === "" ? this.state.q5InputValue : answers[0]}
                                    disabled={this.state.showFormToggle}
                                    onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)}
                                />
                            </div>
                        </Row>
                    </Row>
                )
            case 6:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        <Row className='text-center' style={{ width: '100%' }}>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 ml-2 mb-1 p-0">
                                {
                                    options.length == 1 ?
                                        <Button onClick={() => this.martixQuestionHandler(parentIndex, childIndex)} color='primary' size='sm mt-2'>??????</Button>
                                        :
                                        <>
                                            <table className="table columntitle table-striped" disabled={this.state.showFormToggle}>
                                                {
                                                    options.map((item, i) => (
                                                        <tr>
                                                            {
                                                                item.map((itm, i2) => (
                                                                    <>
                                                                        {
                                                                            <th>{
                                                                                i == 0 && i2 == 0 ? '' : i == 0 || i2 == 0 ?
                                                                                    <Editable
                                                                                        disabled
                                                                                        validate={option => this.onAddMatrixQ(option, parentIndex, childIndex, i, i2)}
                                                                                        name="username"
                                                                                        dataType="text"
                                                                                        mode="inline"
                                                                                        value={itm ? itm : '????????????'}
                                                                                    />
                                                                                    :
                                                                                    <Input className='p-0 m-0 '
                                                                                        type={'radio'}
                                                                                        key={i + '' + i2}
                                                                                        id={i != 0 && i2 != 0 ? i.toString() : i2.toString()}
                                                                                        name={i != 0 && i2 != 0 ? i.toString() : i2.toString()}
                                                                                        value={i + '' + i2}
                                                                                        checked={[].concat.apply([], answers).includes(i + '' + i2)}
                                                                                        onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex, i, i2)} />

                                                                            }</th>
                                                                        }

                                                                    </>
                                                                ))
                                                            }
                                                        </tr>
                                                    ))
                                                }


                                            </table>
                                        </>
                                }
                            </div>

                        </Row>
                    </Row>
                )
            case 7:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        <Row className='text-center' style={{ width: '100%' }}>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 ml-2 mb-1 p-0">
                                {
                                    options.length == 1 ?
                                        <Button onClick={() => this.martixQuestionHandler(parentIndex, childIndex)} color='primary' size='sm mt-2'>??????</Button>
                                        :
                                        <>
                                            <table className="table columntitle table-striped" disabled={this.state.showFormToggle}>
                                                {
                                                    options.map((item, i) => (
                                                        <tr>
                                                            {
                                                                item.map((itm, i2) => (
                                                                    <>
                                                                        {
                                                                            <th>{
                                                                                i == 0 && i2 == 0 ? '' : i == 0 || i2 == 0 ?
                                                                                    <Editable
                                                                                        disabled
                                                                                        validate={option => this.onAddMatrixQ(option, parentIndex, childIndex, i, i2)}
                                                                                        name="username"
                                                                                        dataType="text"
                                                                                        mode="inline"
                                                                                        value={itm ? itm : '????????????'}
                                                                                    />

                                                                                    :
                                                                                    <Input className='p-0 m-0'
                                                                                        type={'checkbox'}
                                                                                        id={i != 0 && i2 != 0 ? i.toString() : i2.toString()}
                                                                                        name={i != 0 && i2 != 0 ? i.toString() : i2.toString()}
                                                                                        value={i + '' + i2}
                                                                                        disabled={this.state.showFormToggle}
                                                                                        checked={[].concat.apply([], answers).includes(i + '' + i2)}
                                                                                        onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex, i, i2)} />

                                                                            }</th>
                                                                        }

                                                                    </>
                                                                ))
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                            </table>
                                        </>
                                }
                            </div>

                        </Row>
                    </Row>
                )
            case 8:
                return (
                    <Row className="text-center ml-1" style={{ width: '250%' }}>
                        <Row className='text-center' style={{ width: '100%' }}>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 ml-2 mb-1 p-0">
                                <Input type="textarea" value={answers[0] === "" ? this.state.q8InputValue : answers[0]}
                                    disabled={this.state.showFormToggle}
                                    style={{ width: '100%' }}
                                    onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)}
                                />
                            </div>
                        </Row>
                    </Row>
                )
        }
    }

    fillFormToggle = (index) => {
        let question = this.state.questions[index];
        let quest_name = this.state.questions[index].questname;
        let quest_id = this.state.questions[index]._id;
        this.setState({
            selectedQuestion: question,
            form_name: quest_name,
            quest_id: quest_id
        });

        this.setState({
            children: question.questions,
            filledChildren: question.questions
        }, () => {
            this.setState({ fillFormToggle: !this.state.fillFormToggle })
        })
    }

    showFormToggle = (index) => {
        let question = this.state.questions2[index];
        let quest_name = this.state.questions2[index].respname;
        let quest_id = this.state.questions2[index]._id;
        this.setState({
            selectedQuestion: question,
            form_name: quest_name,
            quest_id: quest_id
        }, () => {
            this.setState({ showFormToggle: !this.state.showFormToggle })
        });
    }

    onSubmitHandler = (index) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        let id = this.state.questions[index]._id;
        this.props.submitQuestionStart(id, localStorageData.token);
    }


    onSaveOptions = (option, parentIndex, childIndex, optionIndex, optionChildIndex) => {
        let selected_children = [...this.state.filledChildren];
        if (selected_children[parentIndex][childIndex].type.value === 1) {
            this.setState({ radioButton: option.target.value })
            selected_children[parentIndex][childIndex].answers[0] = option.target.name;
        } else if (selected_children[parentIndex][childIndex].type.value === 2) {
            if (option.target.checked) {
                selected_children[parentIndex][childIndex].answers[optionIndex] = option.target.value;
            } else {
                selected_children[parentIndex][childIndex].answers.splice(optionIndex, 1)
            }
        } else if (selected_children[parentIndex][childIndex].type.value === 3) {
            this.setState({ ratingCount: option })
            selected_children[parentIndex][childIndex].answers[0] = option;
        } else if (selected_children[parentIndex][childIndex].type.value === 4) {
            selected_children[parentIndex][childIndex].answers[0] = option.target.value;
        } else if (selected_children[parentIndex][childIndex].type.value === 5) {
            this.setState({
                q5InputValue: option.target.value
            })
            selected_children[parentIndex][childIndex].answers[0] = option.target.value
        } else if (selected_children[parentIndex][childIndex].type.value === 6) {
            selected_children[parentIndex][childIndex].answers[optionIndex - 1][childIndex] = option.target.value
        } else if (selected_children[parentIndex][childIndex].type.value === 7) {
            if (option.target.checked) {
                selected_children[parentIndex][childIndex].answers[optionIndex - 1][optionChildIndex - 1] = option.target.value
            } else {
                selected_children[parentIndex][childIndex].answers[optionIndex - 1].splice(optionChildIndex - 1, 1);
            }
        }
        else if (selected_children[parentIndex][childIndex].type.value === 8) {
            this.setState({
                q8InputValue: option.target.value
            })
            selected_children[parentIndex][childIndex].answers[0] = option.target.value
        }
        // console.log(selected_children);
        this.setState({ filledChildren: selected_children })
    }

    onSaveHandler = () => {
        const filledQuestStart = {
            "response": this.state.filledChildren,
            "questname": this.state.form_name,
            "id": this.state.quest_id
        }
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.fillQuestionStart(filledQuestStart, localStorageData.token);
        this.setState({ fillFormToggle: !this.state.fillFormToggle })
    }

    render() {
        const columns = [
            {
                name: '??????????????????',
                selector: 'name',
                cell: row => <p>{row.questname}</p>
                // sortable: true,
            },
            {
                name: '?????????????????????',
                selector: 'name',
                cell: row => <select id="cars" onChange={() => this.onEndSurveyHandler(row.id)}>
                    <option value="????????????" disabled={row.accept === false}>????????????</option>
                    <option value="????????????">????????????</option>
                </select>,
                // grow: 2,

                // sortable: true,
                // right: true,
            },
            {
                name: '?????????',
                selector: 'action',
                cell: row => <p>{row.submitCount}/{row.totalCount}</p>,
                // sortable: true,
                // right: true,
            },
            {
                name: '?????????',
                selector: 'action',
                cell: row => <p>{row.createdAt.slice(0, 10).replace(/-/g, "/")}</p>,
                // sortable: true,
                // right: true,
            },
            {
                name: '???????????????',
                selector: 'action',
                cell: row => <p>{row.updatedAt.slice(0, 10).replace(/-/g, "/")}</p>
                // sortable: true,
                // right: true,
            },
            {
                name: '??????????????????',
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

        let table3 = <Spinner />
        if (this.props.loading) {
            table3 = this.state.questions.map((item, index) =>
                <Card className='card-4 mt-3' key={index}>
                    <Row>
                        <Col xl='3 text-center mt-3' >{item.questname}</Col>
                        <Col xl='4 text-center mt-3' >{'Created At : ' + item.createdAt.slice(0, 10).replace(/-/g, "/")}</Col>
                        <Col xl='4 text-center mt-3' >{'Expires At : ' + item.dateexpired.slice(0, 10).replace(/-/g, "/")}</Col>
                        {/* <Col xl='2  text-center mt-2' ><i class="mdi mdi-cloud-download-outline cloud-download"></i></Col> */}
                        <Col xl='1  text-center' >
                            <UncontrolledDropdown  >
                                <DropdownToggle className='toggler-custom' style={{ backgroundColor: 'transparent', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0 }}>
                                    <i className="mdi mdi-dots-vertical-circle" style={{ color: 'grey', fontSize: 25 }}></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => this.fillFormToggle(index)}>?????????????????????</DropdownItem>
                                    <DropdownItem tag="a" href="#" onClick={() => this.onSubmitHandler(index)}>????????????????????????</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                </Card>
            )
        };

        let table4 = <Spinner />
        if (this.props.loading) {
            table4 = this.state.questions2.map((item, index) =>
                <Card className='card-4 mt-3' key={index}>
                    <Row>
                        <Col xl='3 text-center mt-3' >{item.questname}</Col>
                        <Col xl='4 text-center mt-3' >{'Created At : ' + item.createdAt.slice(0, 10).replace(/-/g, "/")}</Col>
                        <Col xl='4 text-center mt-3' >{'Expires At : ' + item.dateexpired.slice(0, 10).replace(/-/g, "/")}</Col>
                        {/* <Col xl='2  text-center mt-2' ><i class="mdi mdi-cloud-download-outline cloud-download"></i></Col> */}
                        <Col xl='1  text-center' >
                            <UncontrolledDropdown  >
                                <DropdownToggle className='toggler-custom' style={{ backgroundColor: 'transparent', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0 }}>
                                    <i className="mdi mdi-dots-vertical-circle" style={{ color: 'grey', fontSize: 25 }}></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => this.showFormToggle(index)}>????????????????????????</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                </Card>
            )
        }


        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">??????????????????</h4>
                                <Breadcrumb>
                                    <BreadcrumbItem active>QMS??????????????????????????????????????????</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {this.props.dashboardError && <Alert color="danger">
                        {this.props.dashboardError}</Alert>}                        
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


                    <br /><br />
                    <Row>
                        <Scrollbars style={{ height: 300, display: 'flex', alignItems: 'center', border: '1px solid grey' }}>
                            <Col xl='12'>
                                {
                                    table3
                                }
                            </Col>
                        </Scrollbars>
                    </Row>

                    <br /><br />

                    <Row>
                        <Scrollbars style={{ height: 300, display: 'flex', alignItems: 'center', border: '1px solid grey' }}>
                            <Col xl='12'>
                                {
                                    table4
                                }
                            </Col>
                        </Scrollbars>
                    </Row>

                    <Modal className="modal-lg" isOpen={this.state.toggleEditModal} toggle={() => this.setState({ toggleEditModal: false })} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">??????????????????????????????????????????</h5>
                            <button onClick={() => this.setState({ toggleEditModal: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-text-input" sm="2">??????????????????</Label>
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
                            <Button type="button" color="secondary" onClick={() => this.setState({ toggleEditModal: false })} className="waves-effect">?????????</Button>
                            <Button onClick={() => this.setState({ toggleEditModal: false })} type="button" color="primary" className="waves-effect waves-light">???????????????</Button>
                        </ModalFooter>
                    </Modal>

                    {/* Modal for table3 and table4 */}
                    <Modal className="modal-lg" isOpen={this.state.fillFormToggle || this.state.showFormToggle} toggle={() => this.setState({ fillFormToggle: false })} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">Fill questions here</h5>
                            <button onClick={() => this.setState({ fillFormToggle: false, showFormToggle: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-search-input" sm="2">Name</Label>
                                    <Col sm="10">
                                        <Input type="search" disabled name={'form_name'} value={this.state.form_name} id="example-search-input" onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col xs='12 text-center'>
                                {
                                    this.state.selectedQuestion.questions ?
                                        this.state.selectedQuestion.questions.map((item, index) => (
                                            <>
                                                {
                                                    this.state.selectedQuestion.questions.length > 1 &&
                                                    <h5 className='pull-left'>section {index + 1} of {this.state.selectedQuestion.questions.length}</h5>
                                                }
                                                {
                                                    item.map((child, childIndex) => (
                                                        <Card className='mt-3' style={{ width: '100%', minHeight: 120, border: '1px solid grey', borderRadius: 5 }}>
                                                            <Row>
                                                                <Col xs='5 text-center' style={{ marginTop: 21, marginLeft: 20 }} disabled>
                                                                    <Input disabled={this.state.fillFormToggle}
                                                                        placeholder='Type your question here'
                                                                        value={child.question}
                                                                        type="text"
                                                                        id="example-text-input"
                                                                        style={{ width: '240%', minHeight: 50, border: '1px solid grey', borderRadius: 5 }}
                                                                        onChange={(e) => this.onChangeQuestion(e, childIndex, index)} />
                                                                    {this.questionTypeHandler(child.type, child.options, child.answers, index, childIndex)}
                                                                    {/* <Input style={{ marginTop: 12 }} disabled type="text" name={'form_header'}
                                                                    id="example-text-input" /> */}
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    ))}
                                                <hr />
                                            </>
                                        )) : this.state.selectedQuestion.response ?
                                            this.state.selectedQuestion.response.map((item, index) => (
                                                <>
                                                    {
                                                        this.state.selectedQuestion.response.length > 1 &&
                                                        <h5 className='pull-left'>section {index + 1} of {this.state.selectedQuestion.response.length}</h5>
                                                    }
                                                    {
                                                        item.map((child, childIndex) => (
                                                            <Card className='mt-3' style={{ width: '100%', minHeight: 120, border: '1px solid grey', borderRadius: 5 }}>
                                                                <Row>
                                                                    <Col xs='5 text-center' style={{ marginTop: 21, marginLeft: 20 }} disabled>
                                                                        <Input disabled={this.state.fillFormToggle}
                                                                            placeholder='Type your question here'
                                                                            value={child.question}
                                                                            type="text"
                                                                            id="example-text-input"
                                                                            style={{ width: '240%', minHeight: 50, border: '1px solid grey', borderRadius: 5 }}
                                                                            onChange={(e) => this.onChangeQuestion(e, childIndex, index)} />
                                                                        {this.questionTypeHandler(child.type, child.options, child.answers, index, childIndex)}
                                                                        {/* <Input style={{ marginTop: 12 }} disabled type="text" name={'form_header'}
                                                                    id="example-text-input" /> */}
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        ))}
                                                    <hr />
                                                </>
                                            )) : null
                                }
                            </Col>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button"
                                color="secondary"
                                onClick={() => this.setState({ fillFormToggle: false, showFormToggle: false })} className="waves-effect">Close</Button>
                            {!this.state.showFormToggle ?
                                <Button onClick={() => this.onSaveHandler()} type="button" color="primary" className="waves-effect waves-light">Save changes</Button>
                                : null
                            }
                        </ModalFooter>
                    </Modal>

                </Container>

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ Login, dashboardManagement }) => {
    return {
        role: Login.role,
        survey: dashboardManagement.questionaireData,
        loading: dashboardManagement.loading,
        downloadSurvey: dashboardManagement.downloadSurvey,
        questions: dashboardManagement.userQuestionaireData,
        questions2: dashboardManagement.userQuestionaireData2,
        dashboardError: dashboardManagement.dashboardError,
        downloadSurveySuccess: dashboardManagement.downloadSurveySuccess,
        downloadFail: dashboardManagement.downloadFail,
        downloadError: dashboardManagement.downloadError,
        endSurveyFail: dashboardManagement.endSurveyFail,
        endSurveyError: dashboardManagement.endSurveyError,
        submitSurveyFail: dashboardManagement.submitSurveyFail,
        submitSurveyError: dashboardManagement.submitSurveyError,
        fillSurveyFail: dashboardManagement.fillSurveyFail,
        fillSurveyError: dashboardManagement.fillSurveyError,
        getAdminSurveyFail: dashboardManagement.getAdminSurveyFail,
        getAdminSurveyError: dashboardManagement.getAdminSurveyError,
        getUserSurveyFail: dashboardManagement.getUserSurveyFail,
        getUserSurveyError: dashboardManagement.getUserSurveyError,            
    }
}


export default withRouter(connect(mapStateToProps, {
    deleteSurveyStart, activateAuthLayout, getAdminQuestionaireStart, endSurveyStart, downloadSurveyStart,
    getUserQuestionaireStart, fillQuestionStart, submitQuestionStart
})(AuthDash));
