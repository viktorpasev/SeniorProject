const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const volumeSlider = document.getElementById('volumeSlider');
const speedSelect = document.getElementById('speedSelect');
const fileName = document.getElementById('fileName');
const audioFileInput = document.getElementById('mp3File');
const logo = document.querySelector('.logo');

let isPlaying = false;

window.addEventListener('load', () => {
    const savedAudioData = localStorage.getItem('audioFile');
    const savedAudioPosition = localStorage.getItem('audioPosition');

    if (savedAudioData) {
        audioPlayer.src = savedAudioData;
        fileName.textContent = localStorage.getItem('audioFileName');
    }

    if (savedAudioPosition) {
        audioPlayer.currentTime = parseFloat(savedAudioPosition);
    }
});


audioFileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mpeg') {
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        fileName.textContent = file.name;
        audioPlayer.load();

        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem('audioFile', reader.result);
            localStorage.setItem('audioFileName', file.name);
        };
        reader.readAsDataURL(file);
    }
});

playButton.addEventListener('click', function () {
    if (isPlaying) {
        audioPlayer.pause();
        playButton.textContent = '▶';
    } else {
        audioPlayer.play();
        playButton.textContent = '❚❚';
    }
    isPlaying = !isPlaying;
});

audioPlayer.addEventListener('timeupdate', function () {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    timer.textContent = `${formatTime(currentMinutes)}:${formatTime(currentSeconds)} / ${formatTime(totalMinutes)}:${formatTime(totalSeconds)}`;
    localStorage.setItem('audioPosition', currentTime);
});

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

progressBar.addEventListener('click', function (event) {
    const clickPosition = (event.offsetX / progressBar.offsetWidth) * audioPlayer.duration;
    audioPlayer.currentTime = clickPosition;
});

volumeSlider.addEventListener('input', function () {
    audioPlayer.volume = volumeSlider.value / 100;
});

speedSelect.addEventListener('change', function () {
    audioPlayer.playbackRate = parseFloat(speedSelect.value);
});

logo.addEventListener('click', () => {
    window.location.href = 'main.html';
});