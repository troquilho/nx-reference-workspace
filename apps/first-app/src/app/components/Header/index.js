import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MaterialIcon from "material-icons-react";

export default class Header extends Component {

    render() {

        return (
            <Row className="mb-4">
                <Col xs={12} sm={6} className="d-flex align-items-center justify-content-start">
                    <h2 className="mb-0 text-primary">{this.props.title}</h2>
                    {(this.props.btn) &&
                        <span className="ml-3 c-pointer" onClick={(event) => this.props.callbackParent(event)}><MaterialIcon icon="add_circle_outline" /></span>
                    }
                    {(this.props.btnExport) &&
                        <span className="ml-3 c-pointer" onClick={(event) => this.props.callbackExport(event)}><MaterialIcon icon="launch" /></span>
                    }
                </Col>
                <Col xs={12} sm={6} className="d-flex align-items-center justify-content-start justify-content-sm-end">
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}