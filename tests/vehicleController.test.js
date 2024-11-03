const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const vehicleController = require('../src/controllers/vehicleController');
const vehicleService = require('../src/services/vehicleService');

jest.mock('../src/services/vehicleService');

const app = express();
app.use(bodyParser.json());
app.post('/vehicles', vehicleController.createVehicle);
app.get('/vehicles', vehicleController.getVehicles);

describe('VehicleController', () => {
  describe('POST /vehicles', () => {
    it('shouldReturn400IfRequiredFieldsAreMissing', async () => {
      const response = await request(app)
        .post('/vehicles')
        .send({ modelo: 'Digger Crawler', fabricante: 'Corellia Mining Corporation' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 'error',
        code: 400,
        message: 'Bad Request: Missing required field: nombre'
      });
    });

    it('shouldReturn201IfVehicleIsCreatedSuccessfully', async () => {
      vehicleService.createVehicle.mockResolvedValue(1);

      const response = await request(app)
        .post('/vehicles')
        .send({
          nombre: 'Sand Crawler',
          modelo: 'Digger Crawler',
          fabricante: 'Corellia Mining Corporation',
          costo_en_creditos: '150000',
          longitud: '36.8',
          velocidad_maxima_atmosferica: '30',
          tripulacion: '46',
          pasajeros: '30',
          capacidad_de_carga: '50000',
          consumibles: '2 months',
          clase_de_vehiculo: 'wheeled',
          pilotos: [],
          peliculas: [
            'https://swapi.py4e.com/api/films/1/',
            'https://swapi.py4e.com/api/films/5/'
          ],
          creado: '2014-12-10T15:36:25.724000Z',
          editado: '2014-12-20T21:30:21.661000Z',
          url: 'https://swapi.py4e.com/api/vehicles/4/'
        });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        status: 'success',
        message: 'Vehicle created successfully'
      });
    });

    it('shouldReturn500IfThereIsAServerError', async () => {
      vehicleService.createVehicle.mockRejectedValue(new Error('Server error'));

      const response = await request(app)
        .post('/vehicles')
        .send({
          nombre: 'Sand Crawler',
          modelo: 'Digger Crawler',
          fabricante: 'Corellia Mining Corporation',
          costo_en_creditos: '150000',
          longitud: '36.8',
          velocidad_maxima_atmosferica: '30',
          tripulacion: '46',
          pasajeros: '30',
          capacidad_de_carga: '50000',
          consumibles: '2 months',
          clase_de_vehiculo: 'wheeled',
          pilotos: [],
          peliculas: [
            'https://swapi.py4e.com/api/films/1/',
            'https://swapi.py4e.com/api/films/5/'
          ],
          creado: '2014-12-10T15:36:25.724000Z',
          editado: '2014-12-20T21:30:21.661000Z',
          url: 'https://swapi.py4e.com/api/vehicles/4/'
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Server error'
      });
    });
  });

  describe('GET /vehicles', () => {
    it('shouldReturn200AndTheListOfVehicles', async () => {
      const vehicles = [
        {
          id: 1,
          nombre: 'Sand Crawler',
          modelo: 'Digger Crawler',
          fabricante: 'Corellia Mining Corporation',
          costo_en_creditos: '150000',
          longitud: '36.8',
          velocidad_maxima_atmosferica: '30',
          tripulacion: '46',
          pasajeros: '30',
          capacidad_de_carga: '50000',
          consumibles: '2 months',
          clase_de_vehiculo: 'wheeled',
          pilotos: [],
          peliculas: [
            'https://swapi.py4e.com/api/films/1/',
            'https://swapi.py4e.com/api/films/5/'
          ],
          creado: '2014-12-10T15:36:25.724000Z',
          editado: '2014-12-20T21:30:21.661000Z',
          url: 'https://swapi.py4e.com/api/vehicles/4/'
        }
      ];

      vehicleService.getVehicles.mockResolvedValue(vehicles);

      const response = await request(app).get('/vehicles');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(vehicles);
    });

    it('shouldReturn500IfThereIsAServerError', async () => {
      vehicleService.getVehicles.mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/vehicles');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Server error'
      });
    });
  });
});