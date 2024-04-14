const io = require("socket.io")(4000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });
  
  const users = {};
  
  io.on('connection', socket => {
    console.log('A user connected');
  
    socket.on('new-user-joined', name => {
      users[socket.id] = name;
      console.log("New user", name);
      io.emit('user-joined', name);
    });
  
    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
      delete users[socket.id];
    });
  });
  