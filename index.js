const express = require('express');
require('dotenv').config();

// Create the express server
const app = express();

// Public Directory
app.use( express.static('public')); // "use" es como un middleware, es una funcion que se ejecuta cuando llegue al server

// Lectura y parseo del body
app.use( express.json() );

// Routes
app.use( '/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos


// Listen to requests
const envPort = process.env.PORT;
app.listen( envPort, () => {
    console.log(`Servidor corriendo en puerto ${ envPort }`);
});
