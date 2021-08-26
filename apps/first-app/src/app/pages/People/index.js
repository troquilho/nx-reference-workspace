import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';
import MaterialIcon from "material-icons-react";
import CardHeader from '../../components/CardHeader';
import CardBody from "../../components/CardBody";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import api from "../../services/api";

export default class Home extends Component {

    state = {
        arr: [],
        arrInfo: {},
        error: true,
        load: false,
        message: '',
        page: 1
    }

    componentDidMount() {
        document.getElementsByTagName('html')[0].classList.add("h-100");
        document.getElementsByTagName('body')[0].classList.add("h-100");
        document.getElementById('root').classList.add("h-100");
        this.getPeople();
    }

    getPeople = async (page = this.state.page) => {
        this.setState({ load: !this.state.true })
        await api.get(`person?paginate=true&page=${page}&sortBy=name&order=asc`)
            .then(res => {
                const { docs, ...arrInfo } = res.data;
                this.setState({ arr: docs, arrInfo, page, load: false })
            }).catch(error => {
                console.log(error);
            });
    }

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.getPeople(pageNumber);
    }

    nextPage = () => {
        const { page, arrInfo } = this.state;
        if (page === arrInfo.pages) return;
        const pageNumber = page + 1;
        this.getPeople(pageNumber);
    }

    render() {
        const people = this.state.arr;

        return (
            <>
                <Container className="h-100 login" fluid>
                    <Row className="h-100">
                        <Col xs={12} sm={12}>
                            <Navbar className="fixed-top justify-content-end">
                                <Link to={"/"} className="removeLink">
                                    <Button variant="primary" type="submit" className="text-uppercase font-semi-bold">
                                        Cadastrar Pessoas
                                    </Button>
                                </Link>
                            </Navbar>
                            <Row className="h-100 justify-content-center align-items-center">
                                <Col sm={12}>
                                    <Row>
                                        <h1 className="pb-4 text-center">Relação de pessoas</h1>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <CardHeader>
                                                <Row>
                                                    <Col xs={12} sm={4}>
                                                        Nome
                                                    </Col>
                                                    <Col xs={12} sm={4}>
                                                        Gênero
                                                    </Col>
                                                    <Col xs={12} sm={3} className="text-center">
                                                        Status
                                                    </Col>
                                                    <Col xs={12} sm={1}>

                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                        </Col>
                                        <Col xs={12}>
                                            {people.length > 0 ?
                                                people.map((p, index) => (
                                                    <CardBody key={index}>
                                                        <Row className="align-items-center">
                                                            <Col xs={12} sm={4}>
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Nome:</span>{p.name}
                                                            </Col>
                                                            <Col xs={12} sm={4}>
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Gênero:</span>{
                                                                    (p.gender === 'male' && "Masculino") ||
                                                                    (p.gender === 'female' && "Feminino") ||
                                                                    (p.gender === 'non-binarie' && "Não binário")
                                                                }
                                                            </Col>
                                                            <Col xs={12} sm={3} className="text-center">
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Status:</span>{p.active ? "Ativo" : "Inativo"}
                                                            </Col>
                                                            <Col xs={12} sm={1} className="mt-2">
                                                                <span className="c-pointer" onClick={() => window.location.href = "/people/" + p._id}><MaterialIcon icon="remove_red_eye" /></span>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                ))
                                                :
                                                <CardBody>
                                                    <Row className="align-items-center">
                                                        <Col xs={12} sm={12} className="text-center">
                                                            Não há registros encontrados.
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            }
                                        </Col>
                                        <Pagination page={this.state.page} arrInfo={this.state.arrInfo} callbackNext={this.nextPage} callbackPrev={this.prevPage} />
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} className="d-flex align-items-end">
                            <div className="w-100 py-3 text-center small text-muted">
                                Site Blindado &copy; {new Date().getFullYear()}
                            </div>
                        </Col>
                    </Row>
                </Container >
                <Loading show={this.state.load} />
            </>
        );
    }
}