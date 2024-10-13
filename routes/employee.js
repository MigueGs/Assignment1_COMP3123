const express = require('express');
const { getEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

// GET: Obtener todos los empleados
router.get('/employees', getEmployees);

// POST: Crear un nuevo empleado
router.post('/employees', createEmployee);

// GET: Obtener un empleado por ID
router.get('/employees/:eid', getEmployeeById);

// PUT: Actualizar un empleado
router.put('/employees/:eid', updateEmployee);

// DELETE: Eliminar un empleado
router.delete('/employees', deleteEmployee);

module.exports = router;



