import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Input, Table,Dropdown,DropdownMenu,DropdownItem, DropdownToggle } from 'reactstrap';
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
            success_dlg:'',
            error_dlg:''
        };
    }

    componentDidMount() {
        this.props.activateAuthLayout();
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
              name: '最終更新日' ,
              selector: 'action',
              cell: row => <p>{row.updated}</p>
              // sortable: true,
              // right: true,
            },
            {
              name: '最終提出日' ,
              selector: 'action',
              cell: row => <p>{row.submission}</p>
              // sortable: true,
              // right: true,
            },
            {
              name: 'ダウンロード',
              selector: 'action',
              cell: row => <Button onClick={() => this.setState({ confirm_both: true })} style={{backgroundColor:'transparent',border:0}}><i  class="mdi mdi-cloud-download-outline cloud-download" style={{color:'grey'}}></i></Button>,
              // sortable: true,
              // right: true,
            },
          ];
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
                                
                                // value={selectedGroup}
                                onChange={this.handleSelectGroup}
                                options={optionGroup}
                                placeholder='検索。。'
                            />
                        </Col>
                        
                    </div>
                  


                    <Row style={{marginTop:30}}>
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
                   

                </Container>

            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Responses));