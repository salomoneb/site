export default class Circle {
  constructor(width, height, color, radius) {
    let canvas = document.querySelector(".circle");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.classList.add("circle");
      document.body.appendChild(canvas);
    }

    const dpr = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this.width = width;
    this.height = height;
    this.color = color;
    this.radius = radius;
    this.ctx = ctx;

    ctx.scale(dpr, dpr);
  }

  draw(x, y) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
