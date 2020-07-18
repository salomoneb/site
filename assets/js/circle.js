export default class Circle {
  constructor(color, radius) {
    let canvas = document.querySelector(".circle");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.classList.add("circle");
      document.body.appendChild(canvas);
    }

    const dpr = window.devicePixelRatio;
    const ctx = canvas.getContext("2d");

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    this.width = width;
    this.height = height;
    this.color = color;
    this.radius = radius;
    this.ctx = ctx;

    this.ctx.scale(dpr, dpr);
  }

  draw(x, y) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      x / window.devicePixelRatio,
      y / window.devicePixelRatio,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();
  }
}
