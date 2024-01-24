document.getElementById("startRecordingButton").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "start_recording" }); 
});

document.getElementById("stopRecordingButton").addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "stop_recording" }); 
});


