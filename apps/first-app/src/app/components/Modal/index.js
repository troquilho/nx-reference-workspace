import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class Modal extends Component {
    render() {
        return (
            <div className={"simple-modal " + (this.props.show ? 'open' : '') } style={{zIndex: 9999}}>
                <Container className="mb-5" id={this.props.id}>
                    <Row>
                        <Col xs={12}>
                            <Card className="border-0">
                                <Card.Body className="border-0 p-3">
                                    {this.props.children}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}