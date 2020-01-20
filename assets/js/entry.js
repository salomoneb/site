console.log("%c👋", "font-size:x-large");
import { Grid } from "./grid.js";

const $grid = document.querySelector("#grid");
const $circle = document.querySelector("#circle");
const $circleCtx = circle.getContext("2d");

const grid = new Grid($grid, $circle, $circleCtx);
console.log(grid);
console.log(grid.initGrid());
console.log(grid.runAnimation());

// document.addEventListener("click", assignColor);
// emailLink.addEventListener("click", deobfuscate);

// assignColor();
// init();
// runAnimation();

// window.addEventListener("resize", init);
// document.addEventListener("click", init);
