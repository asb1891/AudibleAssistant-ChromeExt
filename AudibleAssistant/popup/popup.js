document.addEventListener('DOMContentLoaded', () => {
    const startRecordingButton = document.getElementById('startRecording');
    const stopRecordingButton = document.getElementById('stopRecording');

    startRecordingButton.addEventListener('click', () => {
        // Logic for starting recording
        chrome.runtime.sendMessage({ command: "start_recording" });
        console.log('Recording started');
    });

    stopRecordingButton.addEventListener('click', () => {
        // Logic for stopping recording
        chrome.runtime.sendMessage({ command: "stop_recording" });
        console.log('Recording stopped');
    });
});