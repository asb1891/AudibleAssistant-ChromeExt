let primaryWebSocket;
let secondaryWebSocket;

// Define WebSocket connection function for primary WebSocket
function connectPrimaryWebSocket() {
  primaryWebSocket = new WebSocket("ws://localhost:6789");

  primaryWebSocket.onopen = () => {
    console.log("Primary WebSocket is connected");
  };

  primaryWebSocket.onmessage = (event) => {
    console.log("Message from the server:", event);
  };

  primaryWebSocket.onclose = () => {
    console.log("Primary WebSocket is closed, attempting to reconnect...");
    setTimeout(connectPrimaryWebSocket, 3000); // Attempt to reconnect after a delay
  };
}

// Define WebSocket connection function for secondary WebSocket
function connectSecondaryWebSocket() {
  secondaryWebSocket = new WebSocket("ws://localhost:5678");

  secondaryWebSocket.onopen = () => {
    console.log("Secondary WebSocket is connected");
  };

  secondaryWebSocket.onmessage = (event) => {
    console.log("Message from the server:", event.data);
  };

  secondaryWebSocket.onclose = () => {
    console.log("Secondary WebSocket is closed, attempting to reconnect...");
    setTimeout(connectSecondaryWebSocket, 3000); // Attempt to reconnect after a delay
  };
}

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "start_recording") {
    if (primaryWebSocket.readyState === WebSocket.OPEN) {
      primaryWebSocket.send(JSON.stringify({ command: "start_recording"}));
      console.log("Sending Start Recording message to the primary WebSocket");
    } else {
      console.error("Primary WebSocket is not connected");
    }
  } else if (request.command === "stop_recording") {
    if (
      secondaryWebSocket &&
      secondaryWebSocket.readyState === WebSocket.OPEN
    ) {
      secondaryWebSocket.send("stop_recording");
      console.log("Sending Stop Recording message to the secondary WebSocket");
    } else {
      console.error("Secondary WebSocket is not connected");
    }
  }
});

// Connect WebSockets when the extension is loaded
connectPrimaryWebSocket();
connectSecondaryWebSocket();