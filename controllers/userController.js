const User = require('../models/User');

// Registro de un nuevo usuario
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Validar que el contenido no esté vacío
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Guarda la contraseña tal cual sin hashearla
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.', error: error.message });
  }
};
// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Comparar la contraseña directamente (sin bcrypt)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
};







