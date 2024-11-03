const axios = require('axios');

const translateAttributes = (data) => {
  return {
    nombre: data.name,
    modelo: data.model,
    fabricante: data.manufacturer,
    costo_en_creditos: data.cost_in_credits,
    longitud: data.length,
    velocidad_maxima_atmosferica: data.max_atmosphering_speed,
    tripulacion: data.crew,
    pasajeros: data.passengers,
    capacidad_de_carga: data.cargo_capacity,
    consumibles: data.consumables,
    clase_de_vehiculo: data.vehicle_class,
    pilotos: data.pilots,
    peliculas: data.films,
    creado: data.created,
    editado: data.edited,
    url: data.url
  };
};

const fetchVehicle = async () => {
  const response = await axios.get('https://swapi.py4e.com/api/vehicles/4/');
  return translateAttributes(response.data);
};

module.exports = { fetchVehicle };