import React from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Input,
    Label,
} from 'reactstrap';
import Select from 'react-select';
import Rating from 'react-rating';

import Editable from 'react-x-editable';

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

class QuestionModal extends React.Component {
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
                                            disabled={this.props.fillForm}
                                            value={item ? item : 'オプションを追加'}
                                        />
                                    </Label>
                                </div>
                            </Row>
                        ))}
                        {
                            !this.props.fillForm &&
                            <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2 pull-left' >オプションを追加</a>

                        }
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
                                            disabled={this.props.fillForm}
                                            value={item ? item : 'オプションを追加'}
                                        />
                                    </Label>
                                </div>
                            </Row>
                        ))}
                        {
                            !this.props.fillForm &&
                            <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a>
                        }
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
                        {
                            !this.props.fillForm &&
                            <a href='javascript:void(0)' onClick={() => this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a>
                        }
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
                        {
                            !this.props.fillForm &&
                            <Editable
                                style={{ marginBottom: 3 }}
                                validate={option => this.onAddSelectOption(option, parentIndex, childIndex)}
                                name="username"
                                dataType="text"
                                mode="inline"
                                value={'オプションを追加'}
                            />
                        }


                        {/* <a href='javascript:void(0)' onClick={() =>this.addOption(parentIndex, childIndex)} className='m-2  ml-4 pull-left' >オプションを追加</a> */}
                    </Col>
                )
            case 5:
                return (
                    <Col md='12'>
                        <Row className='text-center'>
                            <div style={{ width: '100%' }} className="custom-control custom-radio custom-control-inline mt-3 mb-1 p-0">
                                <Input disabled={!this.props.fillForm} />
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
                                        <Button onClick={() => this.martixQuestionHandler(parentIndex, childIndex)} color='primary' size='sm mt-2'>Add</Button>
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
                                                                                        value={itm ? itm : 'edit'}
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
                            options.length > 1 || !this.state.fillForm &&
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
                                        <Button onClick={() => this.martixQuestionHandler(parentIndex, childIndex)} color='primary' size='sm mt-2'>Add</Button>
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
                                                                                        value={itm ? itm : 'edit'}
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
                            options.length > 1 || !this.props.fillForm &&
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
                                <Input type={'textarea'} disabled={!this.props.fillForm} />
                            </div>
                        </Row>
                    </Col>
                )
        }
    }

    handleSelectGroup = (selectedGroup, parentIndex, childIndex) => {
        console.log(parentIndex, childIndex, 'Modal lllllllllll')
        let new_children = [...this.state.children];
        new_children[parentIndex][childIndex].type = selectedGroup;

        this.setState({ children: new_children });
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

    deleteQ = (index, childIndex) => {
        let new_children = [...this.state.children];
        delete new_children[index][childIndex];
        this.setState({ children: new_children })

    }

    render() {
        return (
            <>
                {
                    console.log(this.props.children.questions),
                    this.props.children.questions.map((item, index) => (
                        <>
                            {
                                this.props.children.questions.length > 1 &&
                                <h5 className='pull-left'>section {index + 1} of {this.props.children.questions.length}</h5>
                            }
                            {
                                item.map((child, childIndex) => (
                                    <Card className='mt-3' style={{ width: '100%', minHeight: 120, border: '1px solid grey', borderRadius: 5 }}>
                                        {
                                            !this.props.fillForm &&
                                            <>
                                                <Button onClick={() => this.splitChildren(index, childIndex)} style={{ position: 'absolute', bottom: 5, right: 5, border: 0, backgroundColor: 'transparent' }}><i style={{ color: 'black', fontSize: 20 }} className='mdi mdi-arrow-split-horizontal'></i></Button>
                                                <Button onClick={() => this.deleteQ(index, childIndex)} style={{ position: 'absolute', top: 5, right: 5, border: 0, backgroundColor: 'transparent' }}>
                                                    <i style={{ color: 'red', fontSize: 20 }} className='mdi mdi-trash-can'></i>
                                                </Button>
                                            </>
                                        }

                                        <Row>
                                            <Col xs='5 text-center' style={{ marginTop: 21, marginLeft: 20 }}>
                                                <Input disabled={this.props.fillForm} placeholder='Type your question here' value={child.question} type="text" id="example-text-input" onChange={(e) => this.onChangeQuestion(e, childIndex, index)} />
                                                {this.questionTypeHandler(child.type, child.options, index, childIndex)}
                                                <Input style={{marginTop:12}} disabled  type="text" name={'form_header'}  
                                                        id="example-text-input" />

                                            </Col>
                                            {
                                                !this.props.fillForm &&
                                                <>
                                                    <Col xs='3' style={{ marginTop: 20 }}>
                                                        <Select
                                                            value={child.type}
                                                            onChange={(value) => this.handleSelectGroup(value, index, childIndex)}
                                                            options={options}
                                                        />
                                                        <Select
                                                            className='mt-2'
                                                            options={item.map((itm, i) => itm.question != child.question && { label: itm.question, value: i })}

                                                        />
                                                    </Col>
                                                    <Col xs='2' style={{ marginTop: 20 }}>
                                                        <Label check>
                                                            <Input type="checkbox" />
                                            必須
                                        </Label>
                                                    </Col>
                                                    <Col xs='1' style={{ marginTop: 20 }}>

                                                    </Col>
                                                </>
                                            }

                                        </Row>
                                    </Card>
                                ))}
                            <hr />
                            {
                                this.props.children.questions.length > 1 &&
                                <Col md='6'>
                                    <Row>
                                        {
                                            index + 1 != this.props.children.questions.length &&
                                            <>
                                                <Col className='col-md-3' style={{ marginTop: 5, padding: 0 }}>
                                                    <p>After section {index + 1}</p>
                                                </Col>
                                                <Col className={{ padding: 0 }}>
                                                    <Input type="select" name="ddlCreditCardType" id="ddlCreditCardType">
                                                        <option value="">Continue to next section</option>
                                                        {
                                                            this.props.children.questions.map((item, index) => (
                                                                <option value="DI">Section {index + 1}</option>
                                                            ))
                                                        }
                                                        <option value="DI">Submit form</option>
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
                {
                    !this.props.fillForm &&
                    <Button type="button" color="primary" onClick={this.addChildren} className="waves-effect">質問を追加</Button>
                }

                {
                    this.props.children.questions[0].length > 0 &&
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
                                value="このアンケートにご参加いただきありがとうございます。"
                            />
                        </Row>
                    </Card>
                }
            </>
        )
    }
}

export default QuestionModal
