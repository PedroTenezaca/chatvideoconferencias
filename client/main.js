//El cliente se va a poder conectar a nuestro socket
var port = process.env.PORT || 8080;;
var socket = io.connect(`https://chatvideoconferencias.herokuapp.com:${port}` , {'forceNew':true}); /*El primer parametro es la URL del servidor 
                                                                            y el segundo la indicacion de forzar la 
                                                                            conexion 
                                                                            */

//Mostramos la informacion  que nos proporciono el servidor
socket.on('messages' , function(data){
    console.log(data);
    render(data);
});

//Mostrar los datos en la ventana del navegador
function render(data){
    //Recorrer el arreglo
    var html = data.map(function(message, index){ //Iterar con un indice y el mensaje correspondiente
        //Retornamos la informacion del arreglo en un html
        //console.log(message.nickname);
        return `
            <div class = 'messages'>
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `
    }).join(' '); 
    //Pasamos la informacion a la etiqueta del html 'messages'
    document.getElementById('messages').innerHTML = html;
};

//Funcion que obtiene los datos(nickname , message) del html 
function addMessage(event){
    //Creamos un JSON con la informacion de los campos 'nikname' y 'text' del html
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    //Deshabilitamos el campo de 'nickname'
    document.getElementById("nickname").style.display = "none";
    
    //Enviamos la informacion al servidor 
    socket.emit('add-message' , message);
    return false;

};
