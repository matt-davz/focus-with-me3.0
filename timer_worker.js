let startTime = null;
let timerInterval = null;
let elapsedTime = 0;

self.onmessage = function (e) {
  if (e.data === 'start') {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(sendElapsedTime, 1000);
  } else if (e.data === 'stop') {
    clearInterval(timerInterval);
  }
};

function sendElapsedTime() {
  
  self.postMessage('');
}
