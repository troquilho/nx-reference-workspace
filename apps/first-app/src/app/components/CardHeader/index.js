import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class CardHeader extends Component {

    render() {
        return (
            <Card className="d-none d-sm-flex border-0 bg-transparent">
                <Card.Body className="text-primary font-semi-bold p-3 small">
                    {this.props.children}
                </Card.Body>
            </Card>
        );
    }
}