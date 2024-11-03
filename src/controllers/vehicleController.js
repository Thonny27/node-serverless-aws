const vehicleService = require('../services/vehicleService');

const createVehicle = async (req, res) => {
  try {
    const vehicle = req.body;
    const requiredFields = ['nombre', 'modelo', 'fabricante'];

    for (const field of requiredFields) {
      if (!vehicle[field]) {
        return res.status(400).json({ 
          status: 'error', 
          code: 400, 
          message: `Bad Request: Missing required field: ${field}` 
        });
      }
    }

    await vehicleService.createVehicle(vehicle);
    res.status(201).json({ status: 'success', message: 'Vehicle created successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { createVehicle, getVehicles };