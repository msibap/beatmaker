"use strict";

class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pads__pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.beats = document.querySelectorAll(".beat");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150; //Beat Per Minute
    this.isPlaying = null;
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);

    this.index++;
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.2s alternate ease-in 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("pads__pad--kick")) {
          this.kickAudio.volume = 0.2;
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("pads__pad--hihat")) {
          this.hihatAudio.volume = 0.2;
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("pads__pad--snare")) {
          this.snareAudio.volume = 0.2;
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
}

const drumKit = new DrumKit();

// Click buttons eventListener
window.addEventListener("click", (e) => {
  e.target.closest("button")?.classList.toggle("active");
  e.target.closest(".pads__pad")?.classList.toggle("active");
  if (e.target.closest(".play")) drumKit.start();
});

// Reseting the animations after final pad
drumKit.pads.forEach((pad) => {
  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});
