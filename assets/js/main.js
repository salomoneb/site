import { initBoard, delay, animate, frame, CTX } from "./animation.js";
import { createColor } from "./color.js";

const links = document.querySelectorAll("a");

window.addEventListener("click", () => {
  CTX.clearRect(0, 0, window.innerWidth, window.innerHeight);
  cancelAnimationFrame(frame);
  initBoard();
  delay(performance.now(), animate);
  colorLinks();
});

initBoard();
delay(performance.now(), animate);
colorLinks();

function colorLinks() {
  const color = createColor();
  links.forEach(link => (link.style.borderBottomColor = color));
}
