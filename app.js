"use strict";

class DrumKit {
  constructor() {
    this.padBox = document.querySelector(".pads");
    this.pads = document.querySelectorAll(".pads__pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll(".beat__controls__select");
    this.beats = document.querySelectorAll(".beat");
    this.playBtn = document.querySelector(".play");
    this.muteBtn = document.querySelectorAll(".beat__controls__mute");
    this.index = 0;
    this.bpm = 150; //Beat Per Minute
    this.isPlaying = null;
    this.volume = 0.3;
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);

    this.index++;
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.2s alternate ease-in 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("pads__pad--kick")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("pads__pad--hihat")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("pads__pad--snare")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
      }
    });
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      // Changing Icon to Stop
      this.playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.index = 0;
      // Changing Icon to Play
      this.playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  }

  changeSound(e) {
    switch (e?.name) {
      case "kick-select":
        drumKit.kickAudio.src = e?.value;
        break;
      case "snare-select":
        drumKit.snareAudio.src = e?.value;
        break;
      case "hihat-select":
        drumKit.hihatAudio.src = e?.value;
        break;
    }
  }

  mute(e) {
    switch (e.getAttribute("data-track")) {
      case "0":
        this.kickAudio.volume = 0;
        break;
      case "1":
        this.hihatAudio.volume = 0;
        break;
      case "2":
        this.snareAudio.volume = 0;
        break;
    }
  }

  inmute(e) {
    switch (e.getAttribute("data-track")) {
      case "0":
        this.kickAudio.volume = this.volume;
        break;
      case "1":
        this.hihatAudio.volume = this.volume;
        break;
      case "2":
        this.snareAudio.volume = this.volume;
        break;
    }
  }

  normalVolume() {
    this.kickAudio.volume = this.volume;
    this.hihatAudio.volume = this.volume;
    this.snareAudio.volume = this.volume;
  }
}

const drumKit = new DrumKit();

// Lowering initial audio volume
drumKit.normalVolume();

// EVENT LISTENERS

// Click buttons eventListener
// e.target.closest(".beat__controls__mute")?.classList.toggle("active");
window.addEventListener("click", (e) => {
  const muteButton = e.target.closest(".beat__controls__mute");
  e.target.closest(".pads__pad")?.classList.toggle("active");
  if (e.target.closest(".play")) drumKit.start();

  if (!muteButton) return;
  muteButton.classList.toggle("active");
  if (muteButton.classList.contains("active")) {
    drumKit.mute(muteButton);
  } else {
    drumKit.inmute(muteButton);
  }
});

// drumKit.muteBtn.forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     console.log(
//       e.target.closest(".beat__controls__mute").getAttribute("data-track")
//     );
//   });
// });

// Select eventListener
window.addEventListener("change", function (e) {
  const selection = e.target.closest(".beat__controls__select");
  drumKit.changeSound(selection);
});

// Reseting the animations after final pad
window.addEventListener("animationend", function (e) {
  const test = e.target.closest(".pads__pad");
  test.style.animation = "";
});
