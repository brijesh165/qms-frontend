import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Breadcrumb,
    Modal,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown, Alert
} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Editable from 'react-x-editable';
import _ from 'lodash'
import Rating from 'react-rating';

import {
    addQuestionnaireStart,
    reeditQuestionnaireStart,
    getQuestionnaireStart,
    copyQuestionnaireStart,
    deleteQuestionnaireStart
} from './../../store/actions';
import QuestionModal from '../../components/questionModal'
import smimg1 from '../../images/small/img-5.jpg';

import Select from 'react-select';
import questionnaire from '../../store/questionnaire/actionTypes';

let options = [
    { label: "ラジオボタン（1つ選択）", value: 1 },
    { label: "チェックボックス（複数選択）", value: 2 },
    { label: 'スケール（1つ選択）', value: 3 },
    { label: 'ドロップダウン（1つ選択）', value: 4 },
    { label: 'テキストボックス（文字入力)', value: 5 },
    { label: 'マトリックス（1つ選択）[横]', value: 6 },
    { label: 'マトリックス（複数選択）[横]', value: 7 },
    { label: '説明文', value: 8 },
]


class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_large: false,
            modal_edit: false,
            form_header: '',
            form_name: '',
            questions: [{ name: 'アンケート1', date: '締切日: 12/06/2020', },],
            children: [[],],
            reeditchildren: [[],],
            selectedQuestion: '',
            searchQuestionnaire: '',
            questid: '',
            allquestions: [],
            messageValue: 'ご協力ありがとうございました。'
        };
        // this.setState({
        //     children: this.props.questions    
        // })
    }

    toggleEditModal = (index) => {
        console.log('IN EDIT TOGGLE', this.props.questions[index])
        this.setState({ modal_edit: true })
        let question = this.props.questions[index];
        let questionName = this.props.questions[index].questname
        let questmessage = this.props.questions[index].questmessage
        this.setState({
            questid: this.props.questions[index].id
        });
        this.setState({ children: question.questions }, () => {
            this.setState({ form_name: questionName, messageValue: questmessage })
        }, () => {
            this.setState({ toggleEditModal: !this.state.toggleEditModal })
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
                                    <Input type="radio" id={`customRadioInline${index}`} name='customRadioInline1' className="custom-control-input" />
                                    <Label className="custom-control-label" for={`customRadioInline${index}`}>
                                        <Editable
                                            validate={option => this.onSaveOptions(option, parentIndex, childIndex, index)}
                                            name="username"
                                            dataType="text"
                                            mode="inline"
                                            value={item ? item : 'クリックして編集する'}
                                        />
                                        <Button onClick={(option) => this.deleteOption(option, parentIndex, childIndex, index)} style={{ position: 'absolute', top: -5, left: 220, border: 0, backgroundColor: 'transparent' }}>
                                            <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                        </Button>
                                    </Label>
                                </div>
                            </Row>
                        ))}

                        <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2 pull-left' >オプションを追加</a>
                    </Col>
                )
            case 2:
                return (
                    <Col md='12'>
                        {options.map((item, index) => (
                            <Row className='text-center'>
                                <div className="custom-control custom-radio custom-control-inline ml-3 mt-3">

                                    <Input type="checkbox" />
                                    <Label for={`customRadioInline${index}`}>
                                        <Editable
                                            validate={option => this.onSaveOptions(option, parentIndex, childIndex, index)}
                                            name="checkbox"
                                            dataType="text"
                                            mode="inline"
                                            value={item ? item : 'クリックして編集する'}
                                        />

                                        <Button onClick={(option) => this.deleteOption(option, parentIndex, childIndex, index)} style={{ position: 'absolute', top: -5, left: 220, border: 0, backgroundColor: 'transparent' }}>
                                            <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                        </Button>
                                    </Label>
                                </div>
                            </Row>
                        ))}

                        <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a>
                    </Col>
                )
            case 3:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div className="custom-control custom-radio custom-control-inline ml-3 mt-3">
                                <Rating fractions={2} stop={options.length} />

                            </div>
                            <div>
                                <Button onClick={(option) => this.deleteRating(parentIndex, childIndex)} style={{ position: 'absolute', top: 5, left: 260, border: 0, backgroundColor: 'transparent' }}>
                                    <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                </Button>
                            </div>
                        </Row>

                        <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a>
                    </Col>
                )
            case 4:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                <Input type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                    {
                                        options.map((item, index) => (
                                            <option value="DI">{item}</option>
                                        ))
                                    }

                                </Input>
                            </div>
                        </Row>
                        <Editable
                            style={{ marginBottom: 3 }}
                            validate={option => this.onAddSelectOption(option, parentIndex, childIndex)}
                            name="username"
                            dataType="text"
                            mode="inline"
                            value={'クリックして編集する'}
                        />

                        {/* <Button onClick={(option) => this.onDeleteSelectOption(option, parentIndex, childIndex)} style={{ position: 'absolute', top: -5, left: 220, border: 0, backgroundColor: 'transparent' }}>
                            <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                        </Button> */}
                        {/* <a href='javascript:void(0)' onClick={() =>this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a> */}
                    </Col>
                )
            case 5:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                <Input disabled />
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
                                            <table className="table columntitle table-striped">
                                                {
                                                    options.map((item, i) => (
                                                        <tr>
                                                            {
                                                                item.map((itm, i2) => (
                                                                    <>
                                                                        {
                                                                            <th>{
                                                                                i == 0 && i2 == 0 ? '' : i == 0 || i2 == 0 ?
                                                                                    <React.Fragment>
                                                                                        <Editable
                                                                                            validate={option => this.onAddMatrixQ(option, parentIndex, childIndex, i, i2)}
                                                                                            name="username"
                                                                                            dataType="text"
                                                                                            mode="inline"
                                                                                            value={itm ? itm : '編集する'}
                                                                                        />
                                                                                        {
                                                                                            i >= 1 && i2 == 0 ?
                                                                                                <Button onClick={() => this.martixDeleteOptionHandler(parentIndex, childIndex, i, i2)} style={{ position: 'relative', left: -50, top: -30, border: 0, backgroundColor: 'transparent' }}>
                                                                                                    <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                                                                                </Button> : null
                                                                                        }

                                                                                    </React.Fragment>
                                                                                    :
                                                                                    <React.Fragment>
                                                                                        <Input className='p-0 m-0' type={'radio'} id={i != 0 && i2 != 0 ? i.toString() + 'c' : i2} name={i != 0 && i2 != 0 ? i.toString() + 'c' : i2} style={{ verticalAlign: 'middle' }} />
                                                                                    </React.Fragment>

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
                                            <table className="table columntitle table-striped">
                                                {
                                                    options.map((item, i) => (
                                                        <tr>
                                                            {
                                                                item.map((itm, i2) => (
                                                                    <>
                                                                        {
                                                                            <th>{
                                                                                i == 0 && i2 == 0 ? '' : i == 0 || i2 == 0 ?
                                                                                    <React.Fragment>
                                                                                        <Editable
                                                                                            validate={option => this.onAddMatrixQ(option, parentIndex, childIndex, i, i2)}
                                                                                            name="username"
                                                                                            dataType="text"
                                                                                            mode="inline"
                                                                                            value={itm ? itm : '編集する'}
                                                                                        />
                                                                                        {
                                                                                            i >= 1 && i2 == 0 ?
                                                                                                <Button onClick={() => this.martixDeleteOptionHandler(parentIndex, childIndex, i, i2)} style={{ position: 'relative', left: -50, top: -30, border: 0, backgroundColor: 'transparent' }}>
                                                                                                    <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                                                                                </Button> : null
                                                                                        }
                                                                                    </React.Fragment>
                                                                                    :
                                                                                    <React.Fragment>
                                                                                        <Input className='p-0 m-0' type={'checkbox'} />
                                                                                    </React.Fragment>

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

                    </Col >
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

    handleWhere = (selectedGroup, parentIndex, childIndex, optionIndex) => {
        console.log('SELECTED GOTO : ', selectedGroup.target, selectedGroup.target.value, parentIndex, childIndex, optionIndex);
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].goto[optionIndex] = selectedGroup.target.value;
        console.log('ON HANDLE WHERE : ', new_children);
        this.setState({ children: new_children });
    }

    handleSelectGroup = (selectedGroup, parentIndex, childIndex) => {
        console.log(parentIndex, childIndex, 'lllllllllll')
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].type = selectedGroup;

        this.setState({ children: new_children });
    }

    handleRequired = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].required = !new_children[parentIndex][childIndex].required;

        this.setState({ children: new_children });
    }

    componentDidMount() {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.activateAuthLayout();
        this.props.getQuestionnaireStart(localStorageData.token);
    }

    componentDidUpdate(prevProps) {
        if (this.props.questions !== prevProps.questions) {
            this.setState({
                allquestions: this.props.questions,
            })
        }

        if (this.props.addQuestionnaireFail !== prevProps.addQuestionnaireFail) {
            alert(this.props.addQuestionnaireError)
        }

        if (this.props.deleteQuestionnaireFail !== prevProps.deleteQuestionnaireFail) {
            alert(this.props.deleteQuestionnaireError)
        }

        if (this.props.copyQuestionnaireFail !== prevProps.copyQuestionnaireFail) {
            alert(this.props.copyQuestionnaireError)
        }

        if (this.props.reeditQuestionnaireFail !== prevProps.reeditQuestionnaireFail) {
            alert(this.props.reeditQuestionnaireError)
        }
    }

    onChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onReEditSubmit = () => {
        const question_data = {
            "reedit": "True",
            "questid": this.state.questid,
            "questname": this.state.form_name,
            "questdata": this.state.children,
            "questmessage": this.state.messageValue
        }
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.reeditQuestionnaireStart(question_data, localStorageData.token);
        this.setState({ modal_large: false })
        if (this.props.success) {
            this.setState(prevState => ({
                questions: [...prevState.questions, {
                    name: this.state.form_name,
                    date: '12/12/2020',
                    children: this.state.children
                }]
            }), () => console.log(this.state.questions, 'llllll'))
            this.setState({ form_header: '', messageValue: '',form_name: '', modal_large: false, children: [[],] })
        }
    }

    onSubmitForm = () => {
        const question_data = {
            "questname": this.state.form_name,
            "questdata": this.state.children,
            "questmessage": this.state.messageValue
        }
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.addQuestionnaireStart(question_data, localStorageData.token);
        this.setState({ modal_large: true })
        this.setState(prevState => ({
            questions: [...prevState.questions, {
                name: this.state.form_name,
                date: '12/12/2020',
                children: this.state.children
            }]
        }), () => console.log(this.state.questions, 'llllll'))
        this.setState({ form_header: '', messageValue: '',form_name: '', modal_large: false, children: [[],] })
    }


    addChildren = () => {
        console.log(this.state.children[0], 'kkkkkkkkk')
        let new_children = [...this.state.children]
        console.log(new_children, new_children[new_children.length - 1], 'yaaaaa')
        new_children[new_children.length - 1].push({
            type: { label: "ラジオボタン（1つ選択）", value: 1 },
            question: "",
            options: [''],
            answers: [''],
            goto: [''],
            required: false
        })
        console.log(new_children, 'ckckckckckck')
        this.setState({ children: new_children })
    }

    onReEditChangeQuestion = (e, childIndex, parentIndex) => {
        let children = [...this.state.children];
        children[parentIndex][childIndex] = e.target.value;
        this.setState({ children: children })
    }

    onChangeQuestion = (e, childIndex, parentIndex) => {
        console.log('ON CHANGE QUESTION : ');
        let children = [...this.state.children];
        children[parentIndex][childIndex].question = e.target.value
        this.setState({ children: children })
    }

    splitChildren = (parentIndex, childIndex) => {
        console.log('IN SPLIT CHILDREN');
        let new_children = [...this.state.children];
        if (new_children[parentIndex].length == 1) {
            return;
        }

        let new_chunk = new_children[parentIndex].splice(childIndex)

        console.log(new_children.splice(parentIndex + 1, 0, new_chunk))
        this.setState({ children: new_children })

    }

    onSaveOptions = (option, parentIndex, childIndex, optionIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].options[optionIndex] = option
        new_children[parentIndex][childIndex].goto[optionIndex] = "next"

        console.log('ON SAVE OPTION : ', new_children);

        this.setState({ children: new_children })
    }

    deleteOption = (option, parentIndex, childIndex, optionIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].options.splice(optionIndex, 1);
        new_children[parentIndex][childIndex].answers.splice(optionIndex, 1);
        new_children[parentIndex][childIndex].goto.splice(optionIndex, 1);

        console.log('ON DELETE OPTION : ', new_children);

        this.setState({ children: new_children })
    }

    deleteRating = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].options.splice(0, 1);
        new_children[parentIndex][childIndex].answers.splice(0, 1)
        new_children[parentIndex][childIndex].goto.splice(1, 1);

        this.setState({ children: new_children });
    }

    addOption = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        console.log('ADD OPTION : ', new_children[parentIndex][childIndex])
        new_children[parentIndex][childIndex].options.push('')
        new_children[parentIndex][childIndex].answers.push('')
        new_children[parentIndex][childIndex].goto.push('next')
        this.setState({ children: new_children })
    }

    onAddSelectOption = (option, parentIndex, childIndex) => {
        console.log('ON ADD SELECT OPTION');
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].options.push(option)
        new_children[parentIndex][childIndex].goto.push("next")
        this.setState({ children: new_children })
    }

    martixQuestionHandler = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex]['options'] = [['', ''], ['', '']]
        new_children[parentIndex][childIndex]['answers'] = [['', ''], ['', '']]
        new_children[parentIndex][childIndex]['goto'] = [['', ''], ['', '']]
        this.setState({ children: new_children })
    }

    martixAddQuestionHandler = (parentIndex, childIndex) => {
        console.log('ON MATRIX ADD QUESTION HANDLER');
        let new_children = [...this.state.children];
        let options = new_children[parentIndex][childIndex]['options'];
        let answers = new_children[parentIndex][childIndex]['answers'];
        let goto = new_children[parentIndex][childIndex]['goto']
        let length = options[0].length;
        let new_options = [];
        let new_answers = [];
        let new_goto = [];
        for (let i = 0; i < length; i++) {
            new_options.push('')
            new_answers.push('')
            new_goto.push('')
        }
        options.push(new_options)
        answers.push(new_answers)
        goto.push(new_goto)

        console.log('ON MATRIX ADD QUESTION HANDLER', new_children);
        this.setState({ children: new_children })

    }

    martixAddOptionHandler = (parentIndex, childIndex) => {
        console.log('ON MATRIX ADD OPTION HANDLER')
        let new_children = [...this.state.children];
        let options = new_children[parentIndex][childIndex]['options'];
        // let answers = new_children[parentIndex][childIndex]['answers'];
        for (let i = 0; i < options.length; i++) {
            //
            options[i].push('')
            // answers[i].push('')
        }

        console.log('ON MATRIX ADD OPTION HANDLER', new_children);
        this.setState({ children: new_children })
    }

    martixDeleteOptionHandler = (parentIndex, childIndex, i, i2) => {
        console.log('ON MATRIX ADD OPTION HANDLER')
        let new_children = [...this.state.children];
        console.log(i, i2)
        new_children[parentIndex][childIndex]['options'].splice(i, 1)
        console.log('Options : ', new_children)

        this.setState({ children: new_children })
        // let answers = new_children[parentIndex][childIndex]['answers'];
        // for (let i = 0; i < options.length; i++) {
        //     //
        //     options[i].splice('', 1)
        //     // answers[i].splice('', 1)
        // }

        // console.log('ON MATRIX ADD OPTION HANDLER', new_children);
        // this.setState({ children: new_children })
    }

    onAddMatrixQ = (option, parentIndex, childIndex, i, i2) => {
        let new_children = [...this.state.children];
        console.log('ON ADD MATRIX Q : ', option);
        let options = new_children[parentIndex][childIndex]['options'];
        let answers = new_children[parentIndex][childIndex]['answers'];
        let gotos = new_children[parentIndex][childIndex]['goto'];
        console.log(option, options[i], options[i][i2], 'mmmm')
        options[i][i2] = option;
        answers[i][i2] = answers;
        gotos[i][i2] = gotos;

        console.log('ON ADD MATRIX Q', new_children);
        this.setState({ children: new_children })
    }


    deleteQ = (index, childIndex) => {
        let new_children = [...this.state.children];
        // delete new_children[index][childIndex];
        new_children[index].splice(childIndex, 1);
        this.setState({ children: new_children })
    }

    deleteQuestion = (item) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.deleteQuestionnaireStart(item, localStorageData.token);
    }

    duplicateQuestion = (item) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        this.props.copyQuestionnaireStart(item, localStorageData.token);
    }

    searchQuestion = (event) => {
        if (this.props.questions) {
            let new_data = this.props.questions.filter(item => {
                return item.questname.toLowerCase().includes(event.target.value.toLowerCase())
            })
            console.log(new_data, 'vvvv')
            this.setState({ allquestions: new_data })
        }
    }

    handleMessageChange = (event) => {
        console.log(event)
        this.setState({
            messageValue: event
        })
    }

    render() {
        const { selectedGroup } = this.state;

        const Offsymbol = props => {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 12,
                        color: "#fff",
                        paddingRight: 2
                    }} > No
                </div>
            );
        };

        const OnSymbol = props => {
            return (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#fff",
                    paddingRight: 2
                }}> Yes
                </div>
            );
        }

        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">全てのアンケート</h4>
                                <Breadcrumb>
                                    <form role="search" className="app-search">
                                        <div className="form-group mb-0">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="アンケート検索"
                                                name="searchQuestionnaire"
                                                onChange={this.searchQuestion} />
                                            <button type="submit"><i className="fa fa-search"></i></button>
                                        </div>
                                    </form>
                                    {/* <BreadcrumbItem active>All  questionnaire list</BreadcrumbItem> */}
                                </Breadcrumb>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    {/* <SettingMenu /> */}
                                </div>
                            </Col>
                        </Row>
                    </div>


                    {this.props.getQuestionnaireFail && <Alert color="danger">
                        {this.props.getQuestionnaireError}</Alert>}

                    <Row>
                        <Card className='card-4' style={{ height: 230, width: 230, borderRadius: 8, margin: 8 }}>
                            <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button onClick={() => this.setState({ modal_large: true })} type="button" color="primary" size="lg" className="waves-effect waves-light">作成</Button>
                            </CardBody>
                        </Card>

                        {
                            this.state.allquestions.map((item, ind) => (
                                <Card className='card-4' style={{ height: 230, width: 230, borderRadius: 8, margin: 8 }}>
                                    <UncontrolledDropdown style={{ position: 'absolute', top: 5, right: 5, border: 0, backgroundColor: 'white', borderRadius: '50%' }} >
                                        <DropdownToggle className='toggler-custom' style={{ backgroundColor: 'transparent', width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0 }}>
                                            <i style={{ color: 'black', fontSize: 17 }} className='mdi mdi-dots-vertical'></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => this.duplicateQuestion(item.id)} >アンケート複製</DropdownItem>
                                            {/* <DropdownItem divider /> */}
                                            <DropdownItem onClick={() => this.toggleEditModal(ind)} >再編集</DropdownItem>
                                            <DropdownItem onClick={() => this.deleteQuestion(item.id)} >削除</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <img style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} className="card-img-top img-fluid" src={smimg1} alt="veltrix" />
                                    <CardBody style={{ padding: 10 }}>
                                        <Row>
                                            <Col className="mt-3" md='12 text-center'>
                                                <span>{item.questname.slice(0, 20)}</span>
                                                <br />
                                                <span>{item.createdAt.slice(0, 10).replace(/-/g, "/")}</span>
                                            </Col>
                                            <Col md='4 p-0 mt-3'>
                                            </Col>

                                        </Row>
                                    </CardBody>
                                </Card>
                            ))
                        }



                    </Row>

                    {/* Re-Edit PopUP */}
                    <Modal className="modal-lg" isOpen={this.state.modal_edit} toggle={this.tog_large} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">新しいアンケートを作成しています。</h5>
                            <button onClick={() => this.setState({ modal_edit: false, children: [[],], form_name: '' })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-search-input" sm="2">アンケート名</Label>
                                    <Col sm="10">
                                        <Input type="search" name={'form_name'} value={this.state.form_name} id="example-search-input" onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col xs='12 text-center'>

                                {
                                    this.state.children ?
                                        this.state.children.map((item, index) => (
                                            <>
                                                {
                                                    this.state.children.length > 1 &&
                                                    <h5 className='pull-left'>{index + 1}のセクション{this.state.children.length}</h5>
                                                }
                                                {
                                                    item.map((child, childIndex) => (
                                                        <Card className='mt-3' style={{ width: '100%', minHeight: 120, border: '1px solid grey', borderRadius: 5 }}>
                                                            <Button onClick={() => this.splitChildren(index, childIndex)} style={{ position: 'absolute', bottom: 5, right: 5, border: 0, backgroundColor: 'transparent' }}><i style={{ color: 'black', fontSize: 20 }} className='mdi mdi-arrow-split-horizontal'></i></Button>
                                                            <Button onClick={() => this.deleteQ(index, childIndex)} style={{ position: 'absolute', top: 5, right: 5, border: 0, backgroundColor: 'transparent' }}>
                                                                <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                                            </Button>
                                                            <Row>
                                                                <Col xs='5 text-center' style={{ marginTop: 21, marginLeft: 20 }}>
                                                                    <Input placeholder='質問を入力してください。' value={child.question} type="text" id="example-text-input" onChange={(e) => this.onChangeQuestion(e, childIndex, index)} />
                                                                    {this.questionTypeHandler(child.type, child.options, index, childIndex)}
                                                                    {/* <Input style={{marginTop:12}} disabled  type="text" name={'form_header'}  id="example-text-input" /> */}

                                                                </Col>
                                                                <Col xs='4' style={{ marginTop: 20 }}>
                                                                    <Select
                                                                        value={child.type}
                                                                        onChange={(value) => this.handleSelectGroup(value, index, childIndex)}
                                                                        options={options}
                                                                    />
                                                                    {
                                                                        child.type.value == 1 || child.type.value == 2 ?
                                                                            child.options.map((it, optionIndex) =>
                                                                                <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType"
                                                                                    onChange={(e) => this.handleWhere(e, index, childIndex, optionIndex)}
                                                                                >
                                                                                    {
                                                                                        item.map((itm, i) =>
                                                                                            itm.question != child.question &&
                                                                                            <option value={i} selected={child.goto[optionIndex] == i ? child.goto[optionIndex] : ""}>{itm.question}</option>
                                                                                        )
                                                                                    }
                                                                                    <option value="next" selected={child.goto[optionIndex] == "next" ? child.goto[optionIndex] : ""}>次の質問へ</option>
                                                                                </Input>
                                                                            )
                                                                            :
                                                                            <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType"
                                                                                onChange={(e) => this.handleWhere(e, index, childIndex, 0)}
                                                                            >
                                                                                {
                                                                                    item.map((itm, i) =>
                                                                                        itm.question != child.question &&
                                                                                        <option value={i} selected={child.goto[0] == i ? child.goto[0] : ""}>{itm.question}</option>
                                                                                    )
                                                                                }
                                                                                <option value="next" selected={child.goto[0] == "next" ? child.goto[0] : ""}>次の質問へ</option>
                                                                            </Input>
                                                                    }
                                                                    {/* <Select
                                                        className='mt-2'
                                                        options={item.map((itm, i) =>  itm.question != child.question && {label: itm.question, value: i})}
                                                        options = {() => this.selectNextQ(item, child)}

                                                    /> */}
                                                                </Col>
                                                                <Col xs='2' style={{ marginTop: 20 }}>
                                                                    <Label check>
                                                                        {/* <Input type="checkbox" checked={child.required} onClick={() => this.handleRequired(index, childIndex)} /> */}
                                                                        {/* 必須 */}
                                                                    </Label>
                                                                </Col>
                                                                <Col xs='1' style={{ marginTop: 20 }}>

                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    ))}
                                                <hr />
                                                {
                                                    this.state.children.length > 1 &&
                                                    <Col md='6'>
                                                        <Row>
                                                            {
                                                                index + 1 != this.state.children.length &&
                                                                <>
                                                                    <Col className='col-md-3' style={{ marginTop: 5, padding: 0 }}>
                                                                        <p>セクション1の後 {index + 1}</p>
                                                                    </Col>
                                                                    <Col className={{ padding: 0 }}>
                                                                        <Input type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                                            <option value="">次のセクションに進む</option>
                                                                            {
                                                                                this.state.children.map((item, index) => (
                                                                                    <option value="DI">セクション {index + 1}</option>
                                                                                ))
                                                                            }
                                                                            <option value="DI">アンケートを送信</option>
                                                                        </Input>
                                                                    </Col>
                                                                </>
                                                            }
                                                        </Row>

                                                    </Col>
                                                }
                                            </>
                                        )) : null
                                }
                                <Button type="button" color="primary" onClick={this.addChildren} className="waves-effect">質問を追加</Button>

                                {
                                    this.state.children[0].length > 0 &&
                                    <Card className='mt-3' style={{ width: '100%', height: 70, border: '1px solid grey', borderRadius: 5 }}>
                                        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                            <Editable
                                                name="messageValue"
                                                dataType="text"
                                                mode="inline"
                                                title="Please enter username"
                                                validate={event => this.handleMessageChange(event)}
                                                value={this.state.messageValue}
                                            />
                                        </Row>
                                    </Card>
                                }
                            </Col>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => this.setState({ modal_edit: false, children: [[],], form_name: '' })} className="waves-effect">閉じる</Button>
                            <Button onClick={this.onReEditSubmit} type="button" color="primary" className="waves-effect waves-light">変更を保存</Button>
                        </ModalFooter>
                    </Modal>


                    {/* Create Survay PopUP */}
                    <Modal className="modal-lg" isOpen={this.state.modal_large} toggle={this.tog_large} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">新しいアンケートを作成しています。</h5>
                            <button onClick={() => this.setState({ modal_large: false, children: [[],], form_name: '' })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-search-input" sm="2">アンケート名</Label>
                                    <Col sm="10">
                                        <Input type="search" name={'form_name'} value={this.state.form_name} id="example-search-input" onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col xs='12 text-center'>

                                {
                                    this.state.children.map((item, index) => (
                                        <>
                                            {
                                                this.state.children.length > 1 &&
                                                <h5 className='pull-left'>{index + 1}のセクション{this.state.children.length}</h5>
                                            }
                                            {
                                                item.map((child, childIndex) => (
                                                    <Card className='mt-3' style={{ width: '100%', minHeight: 120, border: '1px solid grey', borderRadius: 5 }}>
                                                        <Button onClick={() => this.splitChildren(index, childIndex)} style={{ position: 'absolute', bottom: 5, right: 5, border: 0, backgroundColor: 'transparent' }}><i style={{ color: 'black', fontSize: 20 }} className='mdi mdi-arrow-split-horizontal'></i></Button>
                                                        <Button onClick={() => this.deleteQ(index, childIndex)} style={{ position: 'absolute', top: 5, right: 5, border: 0, backgroundColor: 'transparent' }}>
                                                            <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                                        </Button>
                                                        <Row id={childIndex}>
                                                            <Col xs='5 text-center' style={{ marginTop: 21, marginLeft: 20 }}>
                                                                <Input placeholder='質問を入力してください。' value={child.question} type="text" id="example-text-input" onChange={(e) => this.onChangeQuestion(e, childIndex, index)} />
                                                                {this.questionTypeHandler(child.type, child.options, index, childIndex)}
                                                                {/* <Input style={{marginTop:12}} disabled  type="text" name={'form_header'}  id="example-text-input" /> */}

                                                            </Col>
                                                            <Col xs='4' style={{ marginTop: 20 }}>
                                                                <Select
                                                                    value={child.type}
                                                                    onChange={(value) => this.handleSelectGroup(value, index, childIndex)}
                                                                    options={options}
                                                                />
                                                                {
                                                                    child.type.value == 1 || child.type.value == 2 ?
                                                                        child.options.map((it, optionIndex) =>
                                                                            <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType"
                                                                                onChange={(e) => this.handleWhere(e, index, childIndex, optionIndex)}
                                                                            >
                                                                                <option value="next">次の質問へ</option>
                                                                                {
                                                                                    item.map((itm, i) =>
                                                                                        itm.question != child.question &&
                                                                                        <option value={i} key={i}>{itm.question}</option>
                                                                                    )
                                                                                }
                                                                                <option value="DI" key={item.length}>アンケートを送信</option>
                                                                            </Input>
                                                                        )
                                                                        :
                                                                        <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType"
                                                                            onChange={(e) => this.handleWhere(e, index, childIndex, item, 0)}
                                                                        >
                                                                            <option value="">次の質問へ</option>
                                                                            {
                                                                                item.map((itm, i) =>
                                                                                    itm.question != child.question &&
                                                                                    <option value={i} key={i}>{itm.question}</option>
                                                                                )
                                                                            }
                                                                            <option value="DI" key={item.length}>アンケートを送信</option>
                                                                        </Input>
                                                                }
                                                                {/* <Select
                                                        className='mt-2'
                                                        options={item.map((itm, i) =>  itm.question != child.question && {label: itm.question, value: i})}
                                                        options = {() => this.selectNextQ(item, child)}

                                                    /> */}
                                                            </Col>
                                                            <Col xs='2' style={{ marginTop: 20 }}>
                                                                <Label check>
                                                                    {/* <Input type="checkbox" onClick={() => this.handleRequired(index, childIndex)} /> */}
                                                                    {/* 必須 */}
                                                                </Label>
                                                            </Col>
                                                            <Col xs='1' style={{ marginTop: 20 }}>

                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                ))}
                                            <hr />
                                            {
                                                this.state.children.length > 1 &&
                                                <Col md='6'>
                                                    <Row>
                                                        {
                                                            index + 1 != this.state.children.length &&
                                                            <>
                                                                <Col className='col-md-3' style={{ marginTop: 5, padding: 0 }}>
                                                                    <p>セクション1の後 {index + 1}</p>
                                                                </Col>
                                                                <Col className={{ padding: 0 }}>
                                                                    <Input type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                                        <option value="">次のセクションに進む</option>
                                                                        {
                                                                            this.state.children.map((item, index) => (
                                                                                <option value="DI">セクション {index + 1}</option>
                                                                            ))
                                                                        }
                                                                        <option value="DI">アンケートを送信</option>
                                                                    </Input>
                                                                </Col>
                                                            </>
                                                        }
                                                    </Row>

                                                </Col>
                                            }
                                        </>
                                    ))
                                }
                                <Button type="button" color="primary" onClick={this.addChildren} className="waves-effect">質問を追加</Button>

                                {
                                    this.state.children[0].length > 0 &&
                                    <Card className='mt-3' style={{ width: '100%', height: 70, border: '1px solid grey', borderRadius: 5 }}>
                                        <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                            <Editable
                                                name="messageValue"
                                                dataType="text"
                                                mode="inline"
                                                title="Please enter username"
                                                validate={event => this.handleMessageChange(event)}

                                                // validate={(value) => {
                                                //     if (!value) {
                                                //         return 'Required';
                                                //     } else {
                                                //         validate={option => this.onAddSelectOption(option, parentIndex, childIndex)}

                                                //         this.handleMessageChange()
                                                //     }
                                                // }}
                                                value={this.state.messageValue}
                                            />

                                        </Row>
                                    </Card>
                                }
                            </Col>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => this.setState({ modal_large: false, children: [[],], form_name: '' })} className="waves-effect">閉じる</Button>
                            <Button onClick={this.onSubmitForm} type="button" color="primary" className="waves-effect waves-light">変更を保存</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ questionnaireManagement }) => {
    console.log('MAP STATE TO PROPS : ', questionnaireManagement.questions);
    return {
        questions: questionnaireManagement.questions,
        getQuestionnaireFail: questionnaireManagement.getQuestionnaireFail,
        getQuestionnaireError: questionnaireManagement.getQuestionnaireError,
        addQuestionnaireFail: questionnaireManagement.addQuestionnaireFail,
        addQuestionnaireError: questionnaireManagement.addQuestionnaireError,
        deleteQuestionnaireFail: questionnaireManagement.deleteQuestionnaireFail,
        deleteQuestionnaireError: questionnaireManagement.deleteQuestionnaireError,
        copyQuestionnaireFail: questionnaireManagement.copyQuestionnaireFail,
        copyQuestionnaireError: questionnaireManagement.copyQuestionnaireError,
        reeditQuestionnaireFail: questionnaireManagement.reeditQuestionnaireFail,
        reeditQuestionnaireError: questionnaireManagement.reeditQuestionnaireError
    }
}

export default withRouter(connect(mapStateToProps,
    {
        activateAuthLayout,
        addQuestionnaireStart,
        reeditQuestionnaireStart,
        getQuestionnaireStart,
        copyQuestionnaireStart,
        deleteQuestionnaireStart
    })(Questionnaire));
