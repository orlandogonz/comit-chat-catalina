/**
  Aqui estara todo el codigo de nuestro proyecto
*/

//6 - Vamos a requerir el modulo Http
const http = require('http');

//10- Modulo path
const path = require('path');

//1- Vamos a inicializar express
const express = require('express');

//5- Aqui requerimos a websockets. Permite hacer conexion en tiempo real
const socketio = require('socket.io');

//2 -Ahora vamos a ejecutar Express y guardarla en una variable llamada app
//Una vez que ejecutamos esto estamos listos para crear un servidor.
const app = express();

//7 - Creamos el servidor que reciba todos los parametros de app
const server = http.createServer(app);

//8-Ahora si podemos tener una conexion en tiempo real
const io = socketio.listen(server);

//12- Settings - Establezco un puerto
app.set('port', process.env.PORT || 3000);

//9-Codigo para un nuevo usuario conectado
//io.on('connection', socket =>{
//  console.log('new user connected');
//});

//11 - Requerimos el modulo del folder socksts.js
require('./sockets')(io);

//4-Va a enviar el folder public al navegador cada vez que un usuario entra
app.use(express.static(path.join(__dirname, 'public')));

//3- Creamos un metodo llamado Listen. Este metodo se encarga de ejecutar un servior
//Aqui empezamos el servidor. Primero fue app.listen y luego de crear el punto 6 y 7 lo cambiamos a server.listen
server.listen(app.get('port'), ()=>{
  console.log('Server on port', app.get('port'));
})
