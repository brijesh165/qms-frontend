import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Input, Table,Dropdown,DropdownMenu,DropdownItem, DropdownToggle, UncontrolledDropdown ,
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
import data from  '../../data/questions.json'
import Select from 'react-select';

import 'chartist/dist/scss/chartist.scss';
import SweetAlert from 'react-bootstrap-sweetalert';
import questions from '../../data/sample.json'
import questions2 from '../../data/sample2.json'

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
            success_dlg:'',
            error_dlg:'',
            questions:questions,
            questions2:questions2,

            fillFormToggle: false,
            selectedQuestion:''
        };
    }

    componentDidMount() {
        this.props.activateAuthLayout();

    }

    fillFormToggle = (index) => {
        let question = this.state.questions[index]
        this.setState({selectedQuestion: question}, () => {
            this.setState({fillFormToggle: !this.state.fillFormToggle})
        })
    }

    render() {

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
                        <Scrollbars style={{ height: 300,display:'flex',alignItems:'center',border:'1px solid grey' }}>
                            <Col xl='12'>
                                {
                                    this.state.questions.map((item, index) =>
                                        <Card className='card-4 mt-3'>
                                            <Row>
                                            <Col xl='5 text-center mt-3' >{item.name}</Col>
                                                <Col xl='2 text-center mt-3' >{item.date}</Col>
                                                <Col xl='2 text-center mt-3' >締切日：2020年6月11日</Col>
                                                <Col xl='2  text-center mt-2' ><i  class="mdi mdi-cloud-download-outline cloud-download"></i></Col>
                                                <Col xl='1  text-center' >
                                                    <UncontrolledDropdown  >
                                                        <DropdownToggle className='toggler-custom' style={{backgroundColor:'transparent',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',border:0}}>
                                                            <i className="mdi mdi-dots-vertical-circle" style={{color:'grey',fontSize:25}}></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu  right>
                                                            <DropdownItem onClick={() => this.fillFormToggle(index)}>アンケート記入</DropdownItem>
                                                            <DropdownItem tag="a" href="#">アンケートを提出</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </Col>
                                            </Row>
                                        </Card>
                                        )
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
                        <Scrollbars style={{ height: 300,display:'flex',alignItems:'center',border:'1px solid grey' }}>
                            <Col xl='12'>
                                {
                                    this.state.questions2.map((item, index) =>
                                        <Card className='card-4 mt-3'>
                                            <Row>
                                                <Col xl='5 text-center mt-3' >{item.name}</Col>
                                                <Col xl='2 text-center mt-3' >{item.date}</Col>
                                                <Col xl='2 text-center mt-3' >締切日：2020年6月14日</Col>
                                                <Col xl='2  text-center mt-2' ><i  class="mdi mdi-cloud-download-outline cloud-download"></i></Col>
                                                <Col xl='1  text-center' >
                                                    <UncontrolledDropdown  >
                                                        <DropdownToggle className='toggler-custom' style={{backgroundColor:'transparent',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',border:0}}>
                                                            <i className="mdi mdi-dots-vertical-circle" style={{color:'grey',fontSize:25}}></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu  right>
                                                            <DropdownItem onClick={() => this.fillFormToggle(index)}>アンケートを開く</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </Col>
                                            </Row>
                                        </Card>
                                        )
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



                   <Modal className="modal-lg" isOpen={this.state.fillFormToggle} toggle={() => this.setState({fillFormToggle: false})} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">Fill questions here</h5>
                            <button onClick={() => this.setState({ fillFormToggle: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <Form>
                                <FormGroup row>
                                    <Label htmlFor="example-text-input" sm="2">Header</Label>
                                    <Col sm="10">
                                        <Input type="text" name={'form_header'} value={this.state.selectedQuestion.name} id="example-text-input" onChange={this.onChangeText}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="example-search-input" sm="2">Name</Label>
                                    <Col sm="10">
                                        <Input type="search" name={'form_name'} value={this.state.selectedQuestion.header} id="example-search-input"onChange={this.onChangeText} />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Col xs='12 text-center'>

                            <QuestionModal
                            children = {this.state.selectedQuestion.children}
                            fillForm={true}
                            />
                            </Col>


                        </ModalBody>
                        <ModalFooter>
                            <Button  type="button" color="secondary" onClick={() => this.setState({fillFormToggle: false})} className="waves-effect">Close</Button>
                            <Button diabled onClick={() => this.setState({fillFormToggle: false})} type="button" color="primary" className="waves-effect waves-light">Save changes</Button>
                        </ModalFooter>
                    </Modal>


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


export default withRouter(connect(mapStateToProps, { activateAuthLayout })(EndUserDash));
