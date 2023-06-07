'use strict';

const song = document.querySelector('.js-song');
const play = document.querySelector('.js-play');
const replay = document.querySelector('.js-replay');
const outline = document.querySelector('.js-outline');
const video = document.querySelector('.js-video');
const soundBtn = document.querySelectorAll('.js-snd-btn');
const timer = document.querySelector('.js-timer');
const timeSelect = document.querySelectorAll('.js-time_select_button');

const outlineLength = outline.getTotalLength();
console.log(outlineLength);
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timer.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

//functions

function checkPlay(song) {
  if (song.paused) {
    song.play();
    video.play();
    play.src = './assets/images/pause.svg';
    play.classList.add('transparent');
  } else {
    song.pause();
    video.pause();
    play.src = './assets/images/play.svg';
    play.classList.add('transparent');
  }
}

song.ontimeupdate = function () {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  timer.textContent = `${minutes}:${seconds}`;
  if (currentTime >= fakeDuration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = './assets/images/play.svg';
  }
};

function reStartSong(song) {
  let currentTime = song.currentTime;
  currentTime = 0;
  console.log('hola');
}

//events
play.addEventListener('click', () => {
  checkPlay(song);
});
replay.addEventListener('click', reStartSong);

// acción de seleccionar lluvia o playa
soundBtn.forEach((sound) => {
  sound.addEventListener('click', function () {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlay(song);
  });
});

// acción de seleccionar el tiempo
timeSelect.forEach((button) => {
  button.addEventListener('click', function () {
    fakeDuration = this.getAttribute('data-time');
    timer.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});
