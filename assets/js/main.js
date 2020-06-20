import { initBoard, delay, animate, frame, CTX } from "./animation.js";
import { createColor } from "./color.js";

const links = document.querySelectorAll("a");
const colorLinks = (links) => {
  const color = createColor();
  links.forEach((link) => (link.style.borderBottomColor = color));
};

window.addEventListener("click", () => {
  colorLinks(links);

  CTX.clearRect(0, 0, window.innerWidth, window.innerHeight);
  cancelAnimationFrame(frame);
  initBoard();

  delay(performance.now(), animate);
});

colorLinks(links);
initBoard();
delay(performance.now(), animate);
