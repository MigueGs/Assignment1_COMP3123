const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employee');
const userRoutes = require('./routes/user');

// URL de conexión a MongoDB Atlas
const DB_URL = "mongodb+srv://miguelgutiserrano:Carmenrosa1122%2B@cluster0.hhfnq.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority";

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Conectar a MongoDB Atlas
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Usar las rutas
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











