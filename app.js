const fs = require('fs');
  
// 서버생성
const server = require('http').createServer();
const io = require('socket.io').listen(server);
  
// 서버실행
server.listen(3000, function(){
    console.log('Server Running at http:127.0.0.1:3000');
});
  
// 웹 서버 이벤트 연결
server.on('request', function(request, response){
    //html 파일 읽기
    fs.readFile('index.html', function(error, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
});
  
  
// 소켓서버 이벤트 연결
io.sockets.on('connection', function(socket){
    // join 이벤트
    socket.on('join', function(data){
        socket.join(data);
        socket.room = data
    });
    
    // message 이벤트
    socket.on('message', function(data){
        room = socket.room
        io.sockets.in(room).emit('message', data);
        
    });
});
