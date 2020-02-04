const sio = require('socket.io');
// module.exports = function(server) {
//   const io = sio(server);
//   return {
//         register:function(namespace,message) {
//             let nsp = io.of(namespace);
//             nsp.on('connection', function(socket) {
//                 console.log('test');
//                 socket.emit('update',message);
//             });
//         }
//     }
// }
let io; 
function connect(server){
    sio(server).on('connection', function(socket) {
        console.log("Connected socket");
        io = socket;
    })
}
function getIO(){
    console.log("inisde")
    if(!io){
        throw new Error('Socket Doesn\'t exists');
    }
    return io;
}
module.exports = {
    connect: connect,
    getIO: getIO
}
