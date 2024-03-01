document.addEventListener("DOMContentLoaded", function () {
    connectToChat();
});

let socket;

function connectToChat() {
    socket = io();

    socket.on('message', function (data) {
        appendMessage(`${data.username}: ${data.message}`, "user");
    });
}

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();

    if (message === "") return;

    appendMessage(`You: ${message}`, "user");
    socket.emit('message', { message });

    userInput.value = "";
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const newMessage = document.createElement("div");
    newMessage.className = sender;
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}
