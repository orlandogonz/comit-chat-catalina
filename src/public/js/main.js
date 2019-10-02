//console.log('Hola Mundo');

/**
  - Aqui va el codigo JQuery -
*/

$(function(){

  const socket = io();

  //Obteniendo el DOM desde la interfaz
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat= $('#chat');

  //Obteniendo el DOM del nicknameForm
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');
  const $users = $('#usernames');

  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $nickname.val(), data =>{
      if(data){
        $('#nickWrap').hide();
        $('#contentWrap').show();

      }else{
        $nickError.html(`
          <div class="alert alert-danger">
            El usuario ya existe
          </div>
        `);
      }
      $nickname.val('');

    });
  });

  //Eventos
  $messageForm.submit(e => {
    e.preventDefault();
    //console.log($messageBox.val());
    socket.emit('send message', $messageBox.val() );//Enviamos los mensajes al servidor
    $messageBox.val('');
  });

  socket.on('new message', function(data){
    $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
  });

  socket.on('usernames', data =>{
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i>${data[i]}</p>`
    }
    $users.html(html);
  });

})
