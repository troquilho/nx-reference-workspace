import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Navbar } from 'react-bootstrap';
import Loading from "../../components/Loading";
import api from "../../services/api";
import { clearForm } from "../../services/utils";
import swal from "sweetalert";

export default class Home extends Component {

    state = {
        person: [],
        error: true,
        message: ''
    }

    componentDidMount() {
        document.getElementsByTagName('html')[0].classList.add("h-100");
        document.getElementsByTagName('body')[0].classList.add("h-100");
        document.getElementById('root').classList.add("h-100");
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            person: {
                ...this.state.person,
                [nam]: val
            }
        });
    }

    save = async (event) => {
        event.preventDefault();
        this.setState({ load: true });
        await api.post("/person", this.state.person)
            .then(res => {
                clearForm();
                this.setState({ load: false });
                swal({ icon: "success", title: "Sucesso!", text: "Informações cadastradas com sucesso." });
            }).catch(err => {
                clearForm();
                this.setState({ load: false });
                let error = err.response.data !== undefined ? err.response.data.error : "Dados insuficientes.";
                swal({ icon: "error", title: "Erro!", text: `Erro ao cadastrar as informações! ${error}` });
            });
    }

    render() {
        return (
            <div className="login h-100">
                <Container className="h-100">
                    <Row className="h-100 align-items-stretch">
                        <Col xs={12} sm={12} className="d-flex align-items-center mt-3 mb-3">
                            <Navbar className="fixed-top justify-content-end">
                                <Link to={"/people"} className="removeLink">
                                    <Button variant="primary" type="submit" className="text-uppercase font-semi-bold">
                                        Pessoas
                                    </Button>
                                </Link>
                            </Navbar>
                        </Col>
                        <Col xs={12} sm={12} className="d-flex align-items-center justify-content-center">
                            <div className="w-100">
                                <Row>
                                    <Col sm={12} className="d-flex align-items-center justify-content-center">
                                        <h1 className="pb-4 text-center">Cadastrar pessoa</h1>
                                    </Col>
                                </Row>
                                <Form className="w-100" onSubmit={this.save}>
                                    <Row>
                                        <Col xs={12} sm={6} className="mb-3">
                                            <Form.Group className="pb-3">
                                                <Form.Control type="text" defaultValue={this.state.person.name} placeholder="Nome" name="name" onChange={this.myChangeHandler} required />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={6} className="mb-3">
                                            <Form.Group className="pb-3">
                                                <Form.Select defaultValue="1" className="form-control" placeholder="Gênero" name="gender" onChange={this.myChangeHandler} required>
                                                    <option disabled value="1">Gênero</option>
                                                    <option value={"male"}>Masculino</option>
                                                    <option value={"female"}>Feminino</option>
                                                    <option value={"non-binarie"}>Não-binário</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} sm={12} className="mb-3">
                                            <Row className="py-4">
                                                <Col xs={12} className="d-flex align-items-center justify-content-center">
                                                    <Button variant="primary" type="submit" className="text-uppercase font-semi-bold">
                                                        Cadastrar
                                                    </Button>
                                                </Col>
                                                {(this.state.error) ? (
                                                    <Col xs={12} className="d-flex align-items-center justify-content-center pt-5">
                                                        <small className="text-danger">{this.state.message}</small>
                                                    </Col>
                                                ) : <></>}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                        <Col xs={12} className="d-flex align-items-end justify-content-center">
                            <div className="w-100 py-3 text-center small text-muted">
                                Site Blindado &copy; {new Date().getFullYear()}
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Loading show={this.state.load} />
            </div>
        );
    }

}