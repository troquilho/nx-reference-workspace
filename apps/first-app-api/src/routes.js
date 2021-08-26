const express = require("express");
const routes = express.Router();

const AuthController = require('./app/controllers/AuthController');
const PersonController = require('./app/controllers/PersonController');
const PetController = require('./app/controllers/PetController');

routes.get("/health", AuthController.getHealth);

// Person
routes.get("/person", PersonController.getPerson);
routes.post("/person", PersonController.addPerson);

// Person
routes.get("/pet", PetController.getPet);
routes.post("/pet", PetController.addPet);

module.exports = routes;