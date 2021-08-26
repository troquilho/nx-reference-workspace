import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Header extends Component {

    render() {

        return (
            <Row className="my-3">
                <Col xs={6} sm={6} className="d-flex align-items-center justify-content-start">
                    <span className="small text-primary font-semi-bold">Página {this.props.page} de {this.props.arrInfo.pages}</span>
                </Col>
                <Col xs={6} sm={6} className="d-flex align-items-center justify-content-end">
                    <nav>
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <Link disabled={this.props.page === 1} to={"#"} className="btn btn-primary" onClick={(event) => this.props.callbackPrev(event)}>Anterior</Link>
                            </li>
                            <li className="page-item">
                                <Link disabled={this.props.page === this.props.arrInfo.pages} to={"#"} className="btn btn-primary" onClick={(event) => this.props.callbackNext(event)}>Próxima</Link>
                            </li>
                        </ul>
                    </nav>
                </Col>
            </Row>
        );
    }
}