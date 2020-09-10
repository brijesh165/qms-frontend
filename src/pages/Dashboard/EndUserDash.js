import React, { Component } from 'react';
import {
    Container, Row, Col, Card, Button, Breadcrumb, BreadcrumbItem, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Spinner,
} from 'reactstrap';
import Rating from 'react-rating';
import Editable from 'react-x-editable';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';
import Select from 'react-select';

import { getUserSurveyStart } from '../../store/actions';

import 'chartist/dist/scss/chartist.scss';
import SweetAlert from 'react-bootstrap-sweetalert';
// import questions from '../../data/sample.json'
// import questions2 from '../../data/sample2.json'

import QuestionModal from '../../components/questionModal'



const optionGroup = [

    { label: "アンケート1", value: "Tent" },
    { label: "アンケート2", value: "Flashlight" },
    { label: "アンケート3", value: "Toilet Paper" }

];
const optionGroup2 = [

    { label: "アンケート3", value: "Tent" },
    { label: "アンケート4", value: "Flashlight" },
    { label: "アンケート5", value: "Toilet Paper" }

];


class EndUserDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_both: false,
            success_dlg: '',
            error_dlg: '',
            questions: [],
            questions2: [],

            fillFormToggle: false,
            form_name: '',
            selectedQuestion: '',
            q5InputValue: '',
            children: [[],],
            filledChildren: [[],],
            ratingCount: ''
        };
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        this.props.getUserSurveyStart();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.questions) {
            this.setState({
                questions: nextProps.questions
            })
        }
    }

    handleInputChange = (event) => {
        this.setState({
            q5InputValue: event.target.value
        })
    }

    questionTypeHandler = (type, options, parentIndex, childIndex) => {
        if (type.value == 1) { }
        switch (type.value) {
            case 1:
                return (
                    <Col md='12'>
                        {options.map((item, index) => (
                            <Row className='text-center'>
                                <div className="custom-control custom-radio custom-control-inline ml-3 mt-3">
                                    
                                    <Input type="radio"
                                        id={`customRadioInline${index}`}
                                        className="custom-control-input"
                                        value={item ? item : 'クリックして編集する'}
                                        onChange={option => this.onSaveOptions(option, parentIndex, childIndex, index)} />
                                    <Label className="custom-control-label" for={`customRadioInline${index}`}>{item}</Label>
                                        {/* <Label className="custom-control-label" for={`customRadioInline${index}`}>
                                        <Editable
                                            validate={option => this.onSaveOptions(option, parentIndex, childIndex, index)}

                                            name="username"
                                            dataType="text"
                                            mode="inline"
                                            value={item ? item : 'クリックして編集する'}
                                        />
                                    </Label> */}
                                </div>
                            </Row>
                        ))}

                        {/* <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2 pull-left' >オプションを追加</a> */}
                    </Col>
                )
            case 2:
                return (
                    <Col md='12'>
                        {options.map((item, index) => (
                            <Row className='text-center'>
                                <div className="custom-control custom-radio custom-control-inline ml-3 mt-3">

                                    <Label for={`customCheckInline${index}`}>{item}</Label>
                                    <Input type="checkbox"
                                        id={`customCheckInline${index}`}
                                        value={item ? item : 'クリックして編集する'}
                                        onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex, index)} />
                                    {/* <Label for={`customRadioInline${index}`}>
                                        <Editable
                                            validate={option => this.onSaveOptions(option, parentIndex, childIndex, index)}
                                            name="checkbox"
                                            dataType="text"
                                            mode="inline"
                                            value={item ? item : 'クリックして編集する'}
                                        />
                                    </Label> */}
                                </div>
                            </Row>
                        ))}

                        {/* <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a> */}
                    </Col>
                )
            case 3:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div className="custom-control custom-radio custom-control-inline ml-3 mt-3">
                                <Rating fractions={2} stop={options.length} 
                                        initialRating={this.state.ratingCount}
                                        onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)}
                                />
                            </div>
                        </Row>
                    </Col>
                )
            case 4:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                <Input type="select" name="ddlCreditCardType" id="ddlCreditCardType" onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)}>
                                    {
                                        options.map((item, index) => (
                                            <option value={item}>{item}</option>
                                        ))
                                    }

                                </Input>
                            </div>
                        </Row>
                    </Col>
                )
            case 5:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                <Input value={this.state.q5InputValue} 
                                        onChange={(option) => this.onSaveOptions(option, parentIndex, childIndex)} 
                                        />
                            </div>
                        </Row>
                    </Col>
                )
            case 6:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                {
                                    options.length == 1 ?
                                        <Button onClick={() => this.martixQuestionHandler(parentIndex, childIndex)} color='primary' size='sm mt-2'>追加</Button>
                                        :
                                        <>
                                            <table class="table columntitle table-striped">
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
                                                                                        validate={option => this.onAddMatrixQ(option, parentIndex, childIndex, i, i2)}
                                                                                        name="username"
                                                                                        dataType="text"
                                                                                        mode="inline"
                                                                                        value={itm ? itm : '編集する'}
                                                                                    />

                                                                                    :
                                                                                    <Input className='p-0 m-0' type={'radio'} id={i != 0 && i2 != 0 ? i.toString() + 'c' : i2} name={i != 0 && i2 != 0 ? i.toString() + 'c' : i2} />

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
                        {/* {
                            options.length > 1 &&
                            <Row>
                                <Button onClick={() => this.martixAddQuestionHandler(parentIndex, childIndex)} color='primary' size='sm  m-3'>質問を追加</Button>&nbsp;
                                    <Button onClick={() => this.martixAddOptionHandler(parentIndex, childIndex)} color='primary' size='sm m-3'>オプションを追加</Button>
                            </Row>
                        } */}

                    </Col>
                )
            case 7:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                {
                                    options.length == 1 ?
                                        <Button onClick={() => this.martixQuestionHandler(parentIndex, childIndex)} color='primary' size='sm mt-2'>追加</Button>
                                        :
                                        <>
                                            <table class="table columntitle table-striped">
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
                                                                                        validate={option => this.onAddMatrixQ(option, parentIndex, childIndex, i, i2)}
                                                                                        name="username"
                                                                                        dataType="text"
                                                                                        mode="inline"
                                                                                        value={itm ? itm : '編集する'}
                                                                                    />

                                                                                    : <Input className='p-0 m-0' type={'checkbox'} />

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
                        {
                            options.length > 1 &&
                            <Row>
                                <Button onClick={() => this.martixAddQuestionHandler(parentIndex, childIndex)} color='primary' size='sm  m-3'>質問を追加</Button>&nbsp;
                                <Button onClick={() => this.martixAddOptionHandler(parentIndex, childIndex)} color='primary' size='sm m-3'>オプションを追加</Button>
                            </Row>
                        }

                    </Col>
                )
            case 8:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                <Input type={'textarea'} disabled />
                            </div>
                        </Row>
                    </Col>
                )
        }
    }

    fillFormToggle = (index) => {
        let question = this.state.questions[index];
        let quest_name = this.state.questions[index].questname;
        this.setState({ selectedQuestion: question,
                        form_name: quest_name });

        this.setState({ children: question.questions }, () => {
            this.setState({ fillFormToggle: !this.state.fillFormToggle })
        })
    }

    onSaveOptions = (option, parentIndex, childIndex, optionIndex) => {
        console.log(option.target);
        let new_children = [...this.state.children];
        if (new_children[parentIndex][childIndex].type.value === 1) {
            new_children[parentIndex][childIndex].options[optionIndex] = option.target.value;
        } else if (new_children[parentIndex][childIndex].type.value === 2){
            if (option.target.checked) {
                new_children[parentIndex][childIndex].options[optionIndex] = option.target.value
            } 
            // else {
            //     new_children[parentIndex][childIndex].options.splice(optionIndex, 1)
            // }
        } else if (new_children[parentIndex][childIndex].type.value === 3) {
            this.setState({
                ratingCount: option
            });
            new_children[parentIndex][childIndex].options = option;

        } else if (new_children[parentIndex][childIndex].type.value === 4) {
            new_children[parentIndex][childIndex].options[optionIndex] = option.target.value;
        } else if (new_children[parentIndex][childIndex].type.value === 5) {
            this.setState({
                q5InputValue: option.target.value
            })
            new_children[parentIndex][childIndex].options[0] = option.target.value
        }
        console.log(new_children);
        this.setState({ filledChildren: new_children })
    }

    render() {
        let table1 = <Spinner />
        if (this.props.loading) {
            table1 = this.state.questions.map((item, index) =>
                <Card className='card-4 mt-3'>
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
                                    <DropdownItem onClick={() => this.fillFormToggle(index)}>アンケート記入</DropdownItem>
                                    <DropdownItem tag="a" href="#">アンケートを提出</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                </Card>
            )
        };

        let table2 = <Spinner />
        if (this.props.loading) {
            table2 = this.state.questions2.map((item, index) =>
                <Card className='card-4 mt-3'>
                    <Row>
                        <Col xl='5 text-center mt-3' >{item.name}</Col>
                        <Col xl='2 text-center mt-3' >{item.date}</Col>
                        <Col xl='2 text-center mt-3' >締切日：2020年6月14日</Col>
                        <Col xl='2  text-center mt-2' ><i class="mdi mdi-cloud-download-outline cloud-download"></i></Col>
                        <Col xl='1  text-center' >
                            <UncontrolledDropdown  >
                                <DropdownToggle className='toggler-custom' style={{ backgroundColor: 'transparent', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0 }}>
                                    <i className="mdi mdi-dots-vertical-circle" style={{ color: 'grey', fontSize: 25 }}></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => this.fillFormToggle(index)}>アンケートを開く</DropdownItem>
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
                                <h4 className="page-title">新しいアンケート</h4>
                                <Breadcrumb>
                                    <BreadcrumbItem active>QMSのダッシュボードにようこそ！</BreadcrumbItem>
                                </Breadcrumb>
                                <Col md='6 p-0 m-0'>
                                    <Select

                                        // value={selectedGroup}
                                        onChange={this.handleSelectGroup}
                                        options={optionGroup}
                                        placeholder='アンケートを検索'
                                    />
                                </Col>
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
                                    table1
                                }
                            </Col>
                        </Scrollbars>
                    </Row>

                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">

                                <h4 className="page-title">以前に記入したアンケート。</h4>
                                <Col md='6 p-0 m-0'>
                                    <Select

                                        // value={selectedGroup}
                                        onChange={this.handleSelectGroup}
                                        options={optionGroup2}
                                        placeholder='アンケートを検索'
                                    />
                                </Col>
                                {/* <BreadcrumbItem active>Welcome to Qms Dashboard</BreadcrumbItem> */}
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    {/* <SettingMenu /> */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Scrollbars style={{ height: 300, display: 'flex', alignItems: 'center', border: '1px solid grey' }}>
                            <Col xl='12'>
                                {
                                    table2
                                }


                            </Col>
                        </Scrollbars>
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



                    <Modal className="modal-lg" isOpen={this.state.fillFormToggle} toggle={() => this.setState({ fillFormToggle: false })} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">Fill questions here</h5>
                            <button onClick={() => this.setState({ fillFormToggle: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                {/* <FormGroup row>
                                    <Label htmlFor="example-text-input" sm="2">Header</Label>
                                    <Col sm="10">
                                        <Input type="text" name={'form_header'} value={this.state.selectedQuestion.questname} id="example-text-input" onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup> */}
                                <FormGroup row>
                                    <Label htmlFor="example-search-input" sm="2">Name</Label>
                                    <Col sm="10">
                                        <Input type="search" disabled name={'form_name'} value={this.state.form_name} id="example-search-input" onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col xs='12 text-center'>
                                {
                                    this.state.selectedQuestion ?
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
                                                                    <Input disabled={this.state.fillFormToggle} placeholder='Type your question here' value={child.question} type="text" id="example-text-input" onChange={(e) => this.onChangeQuestion(e, childIndex, index)} />
                                                                    {this.questionTypeHandler(child.type, child.options, index, childIndex)}
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
                                onClick={() => this.setState({ fillFormToggle: false })} className="waves-effect">Close</Button>
                            <Button disabled onClick={() => this.onSaveHandler()} type="button" color="primary" className="waves-effect waves-light">Save changes</Button>
                        </ModalFooter>
                    </Modal>


                </Container>

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ Login, dashboardManagement }) => {
    console.log(dashboardManagement.userSurveyData);
    return {
        role: Login.role,
        loading: dashboardManagement.loading,
        questions: dashboardManagement.userSurveyData
    }
}


export default withRouter(connect(mapStateToProps, { activateAuthLayout, getUserSurveyStart })(EndUserDash));
