var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuid = require('uuid');

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});


let users = [];
let connnections = [];

io.on('connection', (socket) => {
    connnections.push(socket)

    //listen on change_username
    socket.on('ADD_USER', username => {
        const id = uuid.v4(); // create a random id for the user
        socket.id = id;
        socket.username = username;
        users.push( { id, username: socket.username, avatar: `https://api.adorable.io/avatars/285/${socket.id}.png` } );
        updateUsernames();
    })

    //update Usernames in the client
    const updateUsernames = () => {
        io.sockets.emit('UPDATE_USERS', users)
    }

    //listen on new_message
    socket.on('ADD_MESSAGE', (data) => {
        //broadcast the new message
        io.sockets.emit('UPDATE_MESSAGES', { id: uuid.v4(), text: data, user: users.find(user => user.id === socket.id) });
    })

    //listen on typing
    socket.on('typing', data => {
        socket.broadcast.emit('typing',{username: socket.username})
    })

    //Disconnect
    socket.on('disconnect', data => {

        if(!socket.username)
            return;
        //find the user and delete from the users list
        let user = undefined;
        for(let i= 0;i<users.length;i++){
            if(users[i].id === socket.id){
                user = users[i];
                break;
            }
        }
        users = users.filter( x => x !== user);
        //Update the users list
        updateUsernames();
        connnections.splice(connnections.indexOf(socket),1);
    })
})

http.listen(3000, function(){
	console.log('listening on *:3000');
});
