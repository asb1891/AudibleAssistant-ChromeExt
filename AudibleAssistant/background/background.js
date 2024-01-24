let primaryWebSocket = new WebSocket("ws://localhost:6789");
let secondaryWebSocket = new WebSocket("ws://localhost:5678");

// Set up primary WebSocket connection
primaryWebSocket.onopen = () => {
    console.log('Primary WebSocket is connected');
};

primaryWebSocket.onmessage = (event) => {
    console.log('Message from the server:', event.data);
};

primaryWebSocket.onclose = () => {
    console.log('Primary WebSocket is closed, attempting to reconnect...');
    // Reconnection logic here if needed
};

// Set up secondary WebSocket connection
secondaryWebSocket.onopen = () => {
    console.log('Secondary WebSocket is connected');
};

secondaryWebSocket.onmessage = (event) => {
    console.log('Message from the server:', event.data);
};

secondaryWebSocket.onclose = () => {
    console.log('Secondary WebSocket is closed, attempting to reconnect...');
    // Reconnection logic here if needed
};

// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "start_recording") {
        primaryWebSocket.send("start_recording");
    } else if (message.command === "stop_recording") {
        secondaryWebSocket.send("stop_recording");
    }
    // Add more commands as needed
});