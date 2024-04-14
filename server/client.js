const socket = io('http://localhost:4000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');

  // Send the message to the server
  socket.emit('send', message);
  
  // Clear the input field
  messageInput.value = '';
});

const name = prompt("Enter your name to join..");

socket.emit("new-user-joined", name);

socket.on('user-joined', data => {
  append(`${data} joined the chat`, 'right');
});

socket.on('receive', message => {
  append(`${message.name}: ${message.message}`, 'left');
});
