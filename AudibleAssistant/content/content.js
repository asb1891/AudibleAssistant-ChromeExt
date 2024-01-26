const floatingContainer = document.createElement("div");
floatingContainer.id = "my-floating-container";
floatingContainer.style.display = "flex";
floatingContainer.style.flexDirection = "column";
floatingContainer.style.alignItems = "center"; // This centers the buttons horizontally
floatingContainer.style.justifyContent = "space-evenly"; // This distributes space evenly between children
// Add any desired styles to floatingContainer here or in a linked CSS file

const recordingStatusImg = document.createElement("img");
recordingStatusImg.id = "recordingStatus";
recordingStatusImg.src = chrome.runtime.getURL("images/nomic.gif");
console.log(chrome.runtime.getURL("images/nomic.gif"));
recordingStatusImg.style.width = "50px";
recordingStatusImg.style.height = "50px";
recordingStatusImg.style.marginBottom = "10px";
recordingStatusImg.style.display = "block";
// Create the start recording button
const startRecordingButton = document.createElement("button");
startRecordingButton.id = "startRecording";
startRecordingButton.textContent = "Turn On Mic";

//Function to send start recording message over websocket
startRecordingButton.addEventListener("click", () => {
  // Logic for starting recording
  try {
    chrome.runtime.sendMessage({ command: "start_recording" }, function (response) {
      if (chrome.runtime.lastError) {
        console.error("Error sending 'start_recording' message:", chrome.runtime.lastError);
      }

      // Proceed to change the image even if there was a non-critical lastError
      console.log("Changing to mic.gif");
      recordingStatusImg.src = chrome.runtime.getURL("images/mic.gif");
      console.log("New src: ", recordingStatusImg.src);
    });
  } catch (error) {
    console.error("Error in click handler for startRecordingButton:", error);
  }
});

// Create the stop recording button
const stopRecordingButton = document.createElement("button");
stopRecordingButton.id = "stopRecording";
stopRecordingButton.textContent = "Turn Off Mic";
stopRecordingButton.borderColor = "#2F4F4F";

//Function to send stop recording message over websocket
stopRecordingButton.addEventListener("click", () => {
  // Logic for stopping recording
  try {
    chrome.runtime.sendMessage({ command: "stop_recording" }, function (response) {
      if (chrome.runtime.lastError) {
        console.error("Error sending 'stop_recording' message:", chrome.runtime.lastError);
      }

      // Proceed to change the image even if there was a non-critical lastError
      console.log("Changing to nomic.gif");
      recordingStatusImg.src = chrome.runtime.getURL("images/nomic.gif");
      console.log("New src: ", recordingStatusImg.src);
    });
  } catch (error) {
    console.error("Error in click handler for stopRecordingButton:", error);
  }
});

// Create a title for the floating container
const floatingTitle = document.createElement("h2");
floatingTitle.textContent = "AUDIBLE ASSISTANT";
floatingTitle.style.fontStyle = "bold";
floatingTitle.style.color = "#ffffff";
floatingTitle.style.backgroundColor = "#2F4F4F";
floatingTitle.style.borderRadius = "5px";
floatingTitle.style.border = "2px solid #2F4F4F";
floatingTitle.style.padding = "5px";
floatingTitle.style.textAlign = "center";
floatingTitle.style.fontSize = "14px";
floatingTitle.style.fontWeight = "bold";
floatingTitle.style.marginBottom = "10px";

//Append Title to floating container
floatingContainer.appendChild(floatingTitle);
//Append the img element to the floating container
floatingContainer.appendChild(recordingStatusImg);
// Append buttons to the floating container
floatingContainer.appendChild(startRecordingButton);
floatingContainer.appendChild(stopRecordingButton);

// Append the floating container to the body
document.body.appendChild(floatingContainer);
