import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class CardBody extends Component {

    render() {
        return (
            <Card className="card-list-body mb-2 border-0">
                <Card.Body>
                    {this.props.children}
                </Card.Body>
            </Card>
        );
    }
}