let timer;
let isRunning = false;
let lapCount = 1;
let startTime;
let elapsedTime = 0;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
    isRunning = true;
  }
}

function stop() {
  clearInterval(timer);
  document.getElementById('start').disabled = false;
  document.getElementById('stop').disabled = true;
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').textContent = '00:00:00:000';
  document.getElementById('start').disabled = false;
  document.getElementById('stop').disabled = true;
  isRunning = false;
  lapCount = 1;
  elapsedTime = 0;
  document.getElementById('laps').innerHTML = '';
}

function updateDisplay() {
  let currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let milliseconds = Math.floor((elapsedTime % 1000) / 10);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  document.getElementById('display').textContent =
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function lap() {
  if (isRunning) {
    let lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCount}: ${document.getElementById('display').textContent}`;
    document.getElementById('laps').appendChild(lapTime);
    lapCount++;
  }
}