"use strict";

let test;

const beats = document.querySelectorAll(".beat");

beats.forEach((beat) => {
  addEventListener("click", (e) => {
    e.target.closest("button")?.classList.toggle("active");
    e.target.closest(".pads__pad")?.classList.toggle("active");
  });
});
