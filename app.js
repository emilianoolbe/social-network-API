// --> Conexión a DB + Express + importaciones(routers - middlewares) <--
const connection = require('./src/database/connection');
const express = require('express');
const cors = require('cors');
const user = require('./src/routes/user');
const publication = require('./src/routes/publication');
const follow = require('./src/routes/follow');

// --> Bienvenida <--
connection();
console.log('API NODE arrancada');

// --> Servidor <--
const app = express();
const puerto = 3010;

// --> Middlewares <--

//Cors
app.use(cors());

//Parseo de datos
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Autenticado de usuarios

// --> Rutas <--
app.use('/api/users', user);
app.use('/api/publication', follow);
app.use('/api/follow', publication);

// --> Escucha del servidor <--
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto: ${puerto}`);
});
