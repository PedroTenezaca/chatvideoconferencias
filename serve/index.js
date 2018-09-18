var express = require('express'); //Cargamos el paquete express
var app = express(); //Construir el Objeto Express
/*Cargamos el servidor HTTP, especificamos que utilizaremos express para 
inicir el servidor
*/
var server = require('http').Server(app); 
//Cargamos Socket.io y mandamos como parametro al servidor que va a estar escuchando
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;; //Especificamos el puerto 
//Inicializamos el servidor
server.listen(port , function(){ 
    console.log(`El servidor esta funcionando en http://localhost:${port}`);
});

//La informacion del chat se almacenara en un array de JSON
var messages = [{
    id: 1,
    text: 'Servicio de Chat',
    nickname: 'David Valladarez'
}]



//Abrimos una conexion al Socket 
//Este metodo se encargara de recibir la conexion de los clientes 
io.on('connection' , function(socket){ //Lanzamos un evento 'conection'
    console.log(`El cliente con IP: ${socket.handshake.address} se a conectado`); /*Detectar la IP del usuario que 
                                                                                    se a conectado al socket*/
    socket.emit('messages' , messages); //Emitimos al cliente el arreglo de mensaje 
    socket.on('add-message' , function(data){
        messages.push(data); // Guarda los nuevos mensajes 
        io.sockets.emit('messages', messages); // Actualiza la informacion del chat
    });
});

//Cargamos una vista estatica para el chat 
//Cargara HTML que tendra la carpeta 'client'
app.use(express.static('client'));//Usamos un middleware de express, el cual llamara al index.html que estara en 'client'

