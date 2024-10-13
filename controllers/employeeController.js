const Employee = require('../models/Employee');

// Obtener todos los empleados
exports.getEmployees = async (req, res) => {
  try {
    // Simplemente obtenemos todos los empleados
    const employees = await Employee.find(); 
    if (!employees.length) {
      return res.status(200).json([]); // Si no hay empleados, devuelve un array vacío
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees.', error: error.message });
  }
};

// Crear un nuevo empleado
exports.createEmployee = async (req, res) => {
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

  // Validar que el contenido no esté vacío
  if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully.', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee.', error: error.message });
  }
};

// Obtener un empleado por su ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee.', error: error.message });
  }
};

// Actualizar un empleado
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(200).json({ message: 'Employee updated successfully.', updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee.', error: error.message });
  }
};

// Eliminar un empleado
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.query.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    res.status(204).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee.', error: error.message });
  }
};
