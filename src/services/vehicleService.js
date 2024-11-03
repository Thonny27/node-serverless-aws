require('dotenv').config();
const db = require('../db/db');

const createVehicle = async (vehicle) => {
  const query = `
    INSERT INTO Vehicles (
      nombre, modelo, fabricante, costo_en_creditos, longitud, 
      velocidad_maxima_atmosferica, tripulacion, pasajeros, 
      capacidad_de_carga, consumibles, clase_de_vehiculo, 
      pilotos, peliculas, creado, editado, url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    vehicle.nombre, vehicle.modelo, vehicle.fabricante, vehicle.costo_en_creditos, vehicle.longitud,
    vehicle.velocidad_maxima_atmosferica, vehicle.tripulacion, vehicle.pasajeros,
    vehicle.capacidad_de_carga, vehicle.consumibles, vehicle.clase_de_vehiculo,
    JSON.stringify(vehicle.pilotos), JSON.stringify(vehicle.peliculas), vehicle.creado, vehicle.editado, vehicle.url
  ];

  const [result] = await db.query(query, values);
  return result.insertId;
};

const getVehicles = async () => {
  const [rows] = await db.query('SELECT * FROM Vehicles');
  return rows;
};

module.exports = { createVehicle, getVehicles };