import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    © {new Date().getFullYear()} <span className="d-none d-sm-inline-block">  <i className="mdi mdi-heart text-danger"></i> アンケート管理システム</span>.
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;






