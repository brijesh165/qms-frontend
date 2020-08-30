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
    UncontrolledDropdown
} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Editable from 'react-x-editable';
import _ from 'lodash'
import Rating from 'react-rating';

import {addquestionnairesuccessful, 
        getquestionnairestart, 
        copyquestionnairestart, 
        deletequestionnairestart} from './../../store/actions';
import QuestionModal from '../../components/questionModal'
import smimg1 from '../../images/small/img-5.jpg';

import Select from 'react-select';

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
            selectedQuestion: ''
        };
    }

    toggleEditModal = (index) => {
        this.setState({ modal_edit: true })
        let question = this.props.questions[index]
        question.name = this.props.questions[index].questname
        question.date = this.props.questions[index].createdAt
        console.log('Questions : ', question);
        this.setState({ selectedQuestion: question }, () => {
            this.setState({ toggleEditModal: !this.state.toggleEditModal })
        })
        console.log('Toggle Edit Modal : ', this.state.selectedQuestion);
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

                                                                                    : <Input className='p-0 m-0' type={'radio'} id={i != 0 && i2 != 0 ? i.toString() + 'c' : i2} name={i != 0 && i2 != 0 ? i.toString() + 'c' : i2} />

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

    handleSelectGroup = (selectedGroup, parentIndex, childIndex) => {
        console.log(parentIndex, childIndex, 'lllllllllll')
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].type = selectedGroup;

        this.setState({ children: new_children });
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        this.props.getquestionnairestart();
    }

    onChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onReEditSubmit = () => {
        const question_data = {
            "create": "True",
            "questname": this.state.form_name,
            "questdata": this.state.children
        }
        this.props.addquestionnairesuccessful(question_data);

        if (this.props.success) {
            this.setState(prevState => ({
                questions: [...prevState.questions, {
                    name: this.state.form_name,
                    date: '12/12/2020',
                    children: this.state.children
                }]
            }), () => console.log(this.state.questions, 'llllll'))
            this.setState({ form_header: '', form_name: '', modal_large: false, children: [[],] })    
        }    }

    onSubmitForm = () => {
        const question_data = {
            "create": "True",
            "questname": this.state.form_name,
            "questdata": this.state.children
        }
        this.props.addquestionnairesuccessful(question_data);

        if (this.props.success) {
            this.setState(prevState => ({
                questions: [...prevState.questions, {
                    name: this.state.form_name,
                    date: '12/12/2020',
                    children: this.state.children
                }]
            }), () => console.log(this.state.questions, 'llllll'))
            this.setState({ form_header: '', form_name: '', modal_large: false, children: [[],] })    
        }
    }


    addChildren = () => {
        console.log(this.state.children[0], 'kkkkkkkkk')
        let new_children = [...this.state.children]
        console.log(new_children, new_children[new_children.length - 1], 'yaaaaa')
        new_children[new_children.length - 1].push({
            type: { label: "ラジオボタン（1つ選択）", value: 1 },
            question: "",
            options: ['']
        })
        console.log(new_children, 'ckckckckckck')
        this.setState({ children: new_children })
    }
    onChangeQuestion = (e, childIndex, parentIndex) => {
        let children = [...this.state.children];
        children[parentIndex][childIndex].question = e.target.value
        this.setState({ children: children })
    }
    splitChildren = (parentIndex, childIndex) => {
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
        this.setState({ children: new_children })
    }
    addOption = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].options.push('')
        this.setState({ children: new_children })
    }

    onAddSelectOption = (option, parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].options.push(option)
        this.setState({ children: new_children })
    }

    martixQuestionHandler = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex]['options'] = [['', ''], ['', '']]
        this.setState({ children: new_children })
    }
    martixAddQuestionHandler = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        let options = new_children[parentIndex][childIndex]['options'];
        let length = options[0].length;
        let new_options = []
        for (let i = 0; i < length; i++) {
            new_options.push('')
        }
        options.push(new_options)
        this.setState({ children: new_children })

    }
    martixAddOptionHandler = (parentIndex, childIndex) => {
        let new_children = [...this.state.children];
        let options = new_children[parentIndex][childIndex]['options'];
        for (let i = 0; i < options.length; i++) {
            //
            options[i].push('')
        }
        this.setState({ children: new_children })
    }
    onAddMatrixQ = (option, parentIndex, childIndex, i, i2) => {
        let new_children = [...this.state.children];
        let options = new_children[parentIndex][childIndex]['options'];
        console.log(option, options[i], options[i][i2], 'mmmm')
        options[i][i2] = option;

        this.setState({ children: new_children })
    }



    deleteQ = (index, childIndex) => {
        let new_children = [...this.state.children];
        delete new_children[index][childIndex];
        this.setState({ children: new_children })

    }
    deleteQuestion = (item) => {
        this.props.deletequestionnairestart(item);
    }

    duplicateQuestion = (item) => {
        // let new_questions = [...this.state.questions];
        // new_questions.push(item)
        // this.setState({ questions: new_questions })
        this.props.copyquestionnairestart(item);
    }
    //   selectNextQ = (item, child) => {
    //     let items = []
    //     item.map((itm, i) => {
    //         itm.question != child.question && items.push({label: itm.question, value: i})
    //     })
    //     return ite
    //   }

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
                                            <input type="text" className="form-control" placeholder="アンケート検索" />
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



                    <Row>
                        <Card className='card-4' style={{ height: 230, width: 230, borderRadius: 8, margin: 8 }}>
                            <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button onClick={() => this.setState({ modal_large: true })} type="button" color="primary" size="lg" className="waves-effect waves-light">作成</Button>
                            </CardBody>
                        </Card>

                        {
                            this.props.questions.map((item, ind) => (
                                console.log('INSIDE MAP : ', item._id),
                                <Card className='card-4' style={{ height: 230, width: 230, borderRadius: 8, margin: 8 }}>
                                    <UncontrolledDropdown style={{ position: 'absolute', top: 5, right: 5, border: 0, backgroundColor: 'white', borderRadius: '50%' }} >
                                        <DropdownToggle className='toggler-custom' style={{ backgroundColor: 'transparent', width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0 }}>
                                            <i style={{ color: 'black', fontSize: 17 }} className='mdi mdi-dots-vertical'></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => this.duplicateQuestion(item._id)} >アンケート複製</DropdownItem>
                                            {/* <DropdownItem divider /> */}
                                            <DropdownItem onClick={() => this.toggleEditModal(ind)} >再編集</DropdownItem>
                                            <DropdownItem onClick={() => this.deleteQuestion(item._id)} >削除</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <img style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} className="card-img-top img-fluid" src={smimg1} alt="veltrix" />
                                    <CardBody style={{ padding: 10 }}>
                                        <Row>
                                            <Col className="mt-3" md='12 text-center'>
                                                {/* <p>
                                                    <Editable
                                                        name="username"
                                                        dataType="text"
                                                        mode="inline"
                                                        title="Please enter username"
                                                        validate={(value) => {
                                                            if (!value) {
                                                                return 'Required';
                                                            } else {
                                                                let questions = [...this.state.questions]
                                                                questions[ind].name = value
                                                                this.setState({ questions: questions })
                                                            }
                                                        }}
                                                        value={item.name.slice(0, 20)}
                                                    />
                                                </p> */}
                                                <span>{item.questname.slice(0,20)}</span>
                                                <br />
                                                <span>{item.createdAt}</span>
                                            </Col>
                                            <Col md='4 p-0 mt-3'>
                                                {/* <Switch
                                                    uncheckedIcon={<Offsymbol />}
                                                    checkedIcon={<OnSymbol />}
                                                    onColor="#626ed4"
                                                    onChange={() => this.setState({ switch1: ind })}
                                                    checked={this.state.switch1 == ind}
                                                    /> */}
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
                            <button onClick={() => this.setState({ modal_edit: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                    this.state.selectedQuestion ? 
                                    this.state.selectedQuestion.questions.map((item, index) => (
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
                                                                        child.options.map(it =>
                                                                            <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                                                <option value="">次の質問へ</option>
                                                                                {
                                                                                    item.map((itm, i) =>
                                                                                        itm.question != child.question &&
                                                                                        <option value={i}>{itm.question}</option>
                                                                                    )
                                                                                }
                                                                                <option value="DI">アンケートを送信</option>
                                                                            </Input>
                                                                        )
                                                                        :
                                                                        <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                                            <option value="">次の質問へ</option>
                                                                            {
                                                                                item.map((itm, i) =>
                                                                                    itm.question != child.question &&
                                                                                    <option value={i}>{itm.question}</option>
                                                                                )
                                                                            }
                                                                            <option value="DI">アンケートを送信</option>
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
                                                                    <Input type="checkbox" />
                                                            必須
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
                                                name="username"
                                                dataType="text"
                                                mode="inline"
                                                title="Please enter username"
                                                validate={(value) => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                }}
                                                value="ご協力ありがとうございました。"
                                            />

                                        </Row>
                                    </Card>
                                }
                            </Col>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => this.setState({ modal_edit: false })} className="waves-effect">閉じる</Button>
                            <Button onClick={this.onReEditSubmit} type="button" color="primary" className="waves-effect waves-light">変更を保存</Button>
                        </ModalFooter>
                    </Modal>


                    {/* Create Survay PopUP */}
                    <Modal className="modal-lg" isOpen={this.state.modal_large} toggle={this.tog_large} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">新しいアンケートを作成しています。</h5>
                            <button onClick={() => this.setState({ modal_large: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                                                        child.options.map(it =>
                                                                            <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                                                <option value="">次の質問へ</option>
                                                                                {
                                                                                    item.map((itm, i) =>
                                                                                        itm.question != child.question &&
                                                                                        <option value={i}>{itm.question}</option>
                                                                                    )
                                                                                }
                                                                                <option value="DI">アンケートを送信</option>
                                                                            </Input>
                                                                        )
                                                                        :
                                                                        <Input className='mt-2' type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                                            <option value="">次の質問へ</option>
                                                                            {
                                                                                item.map((itm, i) =>
                                                                                    itm.question != child.question &&
                                                                                    <option value={i}>{itm.question}</option>
                                                                                )
                                                                            }
                                                                            <option value="DI">アンケートを送信</option>
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
                                                                    <Input type="checkbox" />
                                                            必須
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
                                                name="username"
                                                dataType="text"
                                                mode="inline"
                                                title="Please enter username"
                                                validate={(value) => {
                                                    if (!value) {
                                                        return 'Required';
                                                    }
                                                }}
                                                value="ご協力ありがとうございました。"
                                            />

                                        </Row>
                                    </Card>
                                }
                            </Col>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => this.setState({ modal_large: false })} className="waves-effect">閉じる</Button>
                            <Button onClick={this.onSubmitForm} type="button" color="primary" className="waves-effect waves-light">変更を保存</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.questionnaireManagement.questions);
    return {
        success: state.questionnaireManagement.success,
        questions: state.questionnaireManagement.questions
    }
}

export default withRouter(connect(mapStateToProps, 
                                { activateAuthLayout, 
                                    addquestionnairesuccessful, 
                                    getquestionnairestart,
                                    copyquestionnairestart,
                                    deletequestionnairestart })(Questionnaire));
