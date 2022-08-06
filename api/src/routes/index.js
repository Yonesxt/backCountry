const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryMiddelware =require('./country')
const actividadMiddelware =require('./actividad')


const server = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
server.use('/country', countryMiddelware);
server.use('/actividad', actividadMiddelware);

server.get('/', (req, res) => {
  res.send('app');
});

module.exports = server;
