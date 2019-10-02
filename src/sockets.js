/**
  - Este modulo sera el encargado de aceptar a conexion websockets
*/

module.exports = function(io){

  let nicknames = [];


  io.on('connection', socket =>{
    console.log('new user connected');

    socket.on('new user', (data, cb)=>{
      if(nicknames.indexOf(data)!= -1){
        cb(false);
      } else{
        cb(true);
        socket.nickname = data;
        nicknames.push(socket.nickname);
        //Evento que envie los usuarios conectados
        //io.sockets.emit('usernames', nicknames);
        updateNicknames();
      }
    });

    socket.on('send message', data =>{
      io.sockets.emit('new message', {
        msg: data,
        nick:socket.nickname
      });

    });

    //Evento de desconexion de un sockets
    socket.on('disconnect', data=>{
      if(!socket.nickname) return;
      nicknames.splice(nicknames.indexOf(socket.nickname), 1);//metodo que saca elemento diciendo el indice
      //io.sockets.emit('usernames', nicknames);
      updateNicknames();
    });

    function updateNicknames(){
      io.sockets.emit('usernames', nicknames);
    }


  });

}
