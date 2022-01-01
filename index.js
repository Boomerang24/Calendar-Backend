const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create the express server
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use( express.static('public')); // "use" es como un middleware, es una funcion que se ejecuta cuando llegue al server

// Lectura y parseo del body
app.use( express.json() );

// Routes
app.use( '/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos
app.use( '/api/events', require('./routes/events') );


// Listen to requests
const envPort = process.env.PORT;
app.listen( envPort, () => {
    console.log(`Servidor corriendo en puerto ${ envPort }`);
});
