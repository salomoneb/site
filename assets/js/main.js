import { initBoard, delay, animate, frame, CTX } from "./animation.js";

initBoard();
delay(performance.now(), animate);

window.addEventListener("click", () => {
  CTX.clearRect(0, 0, window.innerWidth, window.innerHeight);
  cancelAnimationFrame(frame);
  initBoard();
  delay(performance.now(), animate);
});
