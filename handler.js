const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const vehicleController = require('./src/controllers/vehicleController');

app.post('/vehicles', vehicleController.createVehicle);
app.get('/vehicles', vehicleController.getVehicles);

module.exports.handler = serverless(app);