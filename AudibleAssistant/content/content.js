const floatingContainer = document.createElement("div");
floatingContainer.id = "my-floating-container";
floatingContainer.style.display = 'flex';
floatingContainer.style.flexDirection = 'column';
floatingContainer.style.alignItems = 'center'; // This centers the buttons horizontally
floatingContainer.style.justifyContent = 'space-evenly'; // This distributes space evenly between children
// Add any desired styles to floatingContainer here or in a linked CSS file

// Create the start recording button
const startRecordingButton = document.createElement("button");
startRecordingButton.id = "startRecording";
startRecordingButton.textContent = "Turn On Mic";
startRecordingButton.addEventListener("click", () => {
  // Logic for starting recording
  try {
    chrome.runtime.sendMessage(
      { command: "start_recording" },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error sending 'start_recording' message:",
            chrome.runtime.lastError
          );
        } else {
          console.log("Recording started. Background response:", response);
        }
      }
    );
  } catch (error) {
    console.error("Error in click handler for startRecordingButton:", error);
  }
});

// Create the stop recording button
const stopRecordingButton = document.createElement("button");
stopRecordingButton.id = "stopRecording";
stopRecordingButton.textContent = "Turn Off Mic";
stopRecordingButton.addEventListener("click", () => {
  // Logic for stopping recording
  try {
    chrome.runtime.sendMessage(
      { command: "stop_recording" },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error sending 'stop_recording' message:",
            chrome.runtime.lastError
          );
        } else {
          console.log("Recording stopped. Background response:", response);
        }
      }
    );
  } catch (error) {
    console.error("Error in click handler for stopRecordingButton:", error);
  }
});
// Create a title for the floating container
const floatingTitle = document.createElement("h2");
floatingTitle.textContent = "AUDIBLE ASSISTANT";
floatingTitle.style.fontStyle = "italic";
floatingTitle.style.color = "#2F4F4F";
floatingTitle.style.textAlign = "center";
floatingTitle.style.fontSize = "16px";
floatingTitle.style.fontWeight = "bold";
floatingTitle.style.marginBottom = "10px";
//Append Title to floating container
floatingContainer.appendChild(floatingTitle);
// Append buttons to the floating container
floatingContainer.appendChild(startRecordingButton);
floatingContainer.appendChild(stopRecordingButton);

// Append the floating container to the body
document.body.appendChild(floatingContainer);
