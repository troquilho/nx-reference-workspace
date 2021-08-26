import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Button, Form } from 'react-bootstrap';
import MaterialIcon from "material-icons-react";
import CardHeader from '../../components/CardHeader';
import CardBody from "../../components/CardBody";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { clearForm } from "../../services/utils";
import swal from "sweetalert";
import api from "../../services/api";

export default class Home extends Component {

    state = {
        arr: [],
        arrInfo: {},
        pet: {
            person: this.props.match.params.id
        },
        error: true,
        modal: false,
        load: false,
        message: '',
        page: 1
    }

    componentDidMount() {
        document.getElementsByTagName('html')[0].classList.add("h-100");
        document.getElementsByTagName('body')[0].classList.add("h-100");
        document.getElementById('root').classList.add("h-100");
        this.getPet();
    }

    getPet = async (page = this.state.page) => {
        this.setState({ load: !this.state.true })
        await api.get(`pet?person=${this.props.match.params.id}&paginate=true&page=${page}&sortBy=name&order=asc`)
            .then(res => {
                const { docs, ...arrInfo } = res.data;
                this.setState({ arr: docs, arrInfo, page, load: false })
            }).catch(error => {
                console.log(error);
            });
    }

    toggleModal = async (unit = {}) => {
        this.setState({ modal: !this.state.modal });
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            pet: {
                ...this.state.pet,
                [nam]: val
            }
        });
    }

    save = async (event) => {
        event.preventDefault();
        this.setState({ load: true });
        await api.post("/pet", this.state.pet)
            .then(res => {
                clearForm();
                this.getPet();
                this.setState({ load: false, modal: !this.state.modal });
                swal({ icon: "success", title: "Sucesso!", text: "Informações cadastradas com sucesso." });
            }).catch(err => {
                clearForm();
                this.setState({ load: false });
                let error = err.response.data !== undefined ? err.response.data.error : "Dados insuficientes.";
                swal({ icon: "error", title: "Erro!", text: `Erro ao cadastrar as informações! ${error}` });
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
        const { pet = {}, modal = false } = this.state;
        const pets = this.state.arr;

        return (
            <>
                <Container className="h-100 login" fluid>
                    <Row className="h-100">
                        <Col xs={12} sm={12}>
                            <Navbar className="fixed-top justify-content-end">
                                <Link to={"/people"} className="removeLink">
                                    <Button variant="primary" className="text-uppercase font-semi-bold">
                                        Pessoas
                                    </Button>
                                </Link>
                            </Navbar>
                            <Row className="h-100 justify-content-center align-items-center">
                                <Col sm={12}>
                                    <Row>
                                        <h1 className="pb-4 text-center">Relação de pets</h1>
                                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                                            <Button variant="primary" className="text-uppercase font-semi-bold" onClick={() => this.toggleModal()}>
                                                Cadastrar pet
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <CardHeader>
                                                <Row>
                                                    <Col xs={12} sm={3}>
                                                        Nome
                                                    </Col>
                                                    <Col xs={12} sm={3}>
                                                        Tipo
                                                    </Col>
                                                    <Col xs={12} sm={3}>
                                                        Dono
                                                    </Col>
                                                    <Col xs={12} sm={3} className="text-center">
                                                        Status
                                                    </Col>
                                                </Row>
                                            </CardHeader>
                                        </Col>
                                        <Col xs={12}>
                                            {pets.length > 0 ?
                                                pets.map((p, index) => (
                                                    <CardBody key={index}>
                                                        <Row className="align-items-center">
                                                            <Col xs={12} sm={3}>
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Nome:</span>{p.name}
                                                            </Col>
                                                            <Col xs={12} sm={3}>
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Tipo:</span>{
                                                                    (p.category === 'dog' && 'Cachorro') ||
                                                                    (p.category === 'cat' && 'Gato') ||
                                                                    (p.category === 'other' && 'Outro')
                                                                }
                                                            </Col>
                                                            <Col xs={12} sm={3}>
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Dono:</span>{p.person.name}
                                                            </Col>
                                                            <Col xs={12} sm={3} className="text-center">
                                                                <span className="d-inline-flex d-sm-none text-primary font-semi-bold small mr-1">Status:</span>{p.active ? "Ativo" : "Inativo"}
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
                <Modal show={modal}>
                    <Row>
                        <Col xs={12} md={8}>
                            <h2 className="font-semi-bold text-primary">Cadastrar Pet</h2>
                        </Col>
                        <Col xs={12} md={4} className="d-flex justify-content-end">
                            <span className="c-pointer" onClick={() => this.toggleModal()}><MaterialIcon icon="close" /></span>
                        </Col>
                    </Row>
                    <Row className="mt-4 mb-2">
                        <Container fluid>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col xs={12} lg={6}>
                                        <Form.Label className="mb-1 txt-clickview">Nome <sup className="ml-1 text-danger">*</sup></Form.Label>
                                        <Form.Control type="text" name="name" defaultValue={pet.name} onChange={this.myChangeHandler} required />
                                    </Col>
                                    <Col xs={12} lg={6}>
                                        <Form.Label className="mb-1 txt-clickview ">Tipo <sup className="ml-1 text-danger">*</sup></Form.Label>
                                        <Form.Group>
                                            <Form.Select defaultValue={pet.category || ''} className="form-control" name="category" onChange={this.myChangeHandler} required>
                                                <option disabled value=''></option>
                                                <option value={"cat"}>Gato</option>
                                                <option value={"dog"}>Cachorro</option>
                                                <option value={"other"}>Outro</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={12} className="mt-3 d-flex justify-content-end">
                                        <Button variant="primary" type="submit" className="text-uppercase font-semi-bold" disabled={Object.keys(pet).length > 2 ? false : true}>Cadastrar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Row>
                </Modal>
                <Loading show={this.state.load} />
            </>
        );
    }
}