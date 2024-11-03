const db = require('../src/db/db');
const vehicleService = require('../src/services/vehicleService');

jest.mock('../src/db/db');

describe('VehicleService', () => {
  describe('createVehicle', () => {
    it('shouldInsertAVehicleAndReturnTheInsertId', async () => {
      const vehicle = {
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
      };

      db.query.mockResolvedValue([{ insertId: 1 }]);

      const insertId = await vehicleService.createVehicle(vehicle);

      expect(insertId).toBe(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    });

    it('shouldThrowAnErrorIfTheQueryFails', async () => {
      db.query.mockRejectedValue(new Error('Query failed'));

      await expect(vehicleService.createVehicle({})).rejects.toThrow('Query failed');
    });
  });

  describe('getVehicles', () => {
    it('shouldReturnAListOfVehicles', async () => {
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

      db.query.mockResolvedValue([vehicles]);

      const result = await vehicleService.getVehicles();

      expect(result).toEqual(vehicles);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM Vehicles');
    });

    it('shouldThrowAnErrorIfTheQueryFails', async () => {
      db.query.mockRejectedValue(new Error('Query failed'));

      await expect(vehicleService.getVehicles()).rejects.toThrow('Query failed');
    });
  });
});