import { createColor } from "./utils.js";
console.log(createColor);

export class Grid {
  constructor(grid, circle, ctx) {
    this.grid = grid;
    this.circle = circle;
    this.circleCtx = ctx;
  }

  initGrid() {
    const commonCellDimension = Math.floor(Math.random() * 100 + 25);
    const cellHeight = commonCellDimension;
    const cellWidth = commonCellDimension;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    const coords = this.generateCoords(cellWidth, cellHeight);
    [this.grid, this.circle].forEach(canvas => {
      canvas.setAttribute("width", this.windowWidth);
      canvas.setAttribute("height", this.windowHeight);
    });

    this.drawGrid(coords);
  }

  generateCoords(cellWidth, cellHeight) {
    // Create grid coordinates
    const coords = [];
    for (let i = 0; i < this.windowWidth; i++) {
      if (i % cellWidth === 0) {
        coords.push({
          start: [i, 0],
          end: [i, this.windowHeight],
          translateKey: 1
        });
      }
    }
    for (let i = 0; i < this.windowHeight; i++) {
      if (i % cellHeight === 0) {
        coords.push({
          start: [0, i],
          end: [this.windowWidth, i],
          translateKey: 0
        });
      }
    }
    return coords;
  }

  drawGrid(coords) {
    const ctx = this.grid.getContext("2d");
    ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
    ctx.lineWidth = 0.4;
    ctx.strokeStyle = "rgb(202,202,202)";

    coords.forEach(coord => {
      ctx.beginPath();
      ctx.moveTo(coord.start[0], coord.start[1]);
      ctx.lineTo(coord.end[0], coord.end[1]);
      ctx.stroke();
      ctx.closePath();
    });
  }

  getCircleData() {
    let coordinate = coords[Math.floor(Math.random() * coords.length)];
    let startEndPoints = getStartEndPoints(coordinate);

    let circleData = {
      coords: [coordinate.start[0], coordinate.start[1]],
      r: Math.floor(Math.random() * (40 - 5) + 10),
      c: createColor(),
      d: startEndPoints[1] - startEndPoints[0] > 0 ? "increment" : "decrement",
      target: startEndPoints[1],
      translateKey: coordinate.translateKey
    };
    circleData.coords[circleData.translateKey] = startEndPoints[0];
    return circleData;
  }

  getStartEndPoints(coordinate) {
    let startEndPoints = [
      coordinate.start[coordinate.translateKey],
      coordinate.end[coordinate.translateKey]
    ];
    let randomIndex = Math.round(Math.random() * (startEndPoints.length - 1));
    startEndPoints.push(startEndPoints.splice(randomIndex, 1)[0]);
    return startEndPoints;
  }

  runAnimation() {
    const circleData = this.getCircleData();
    let start = performance.now();
    requestAnimationFrame(timestamp => {
      animate(timestamp, start, circleData);
    });
  }

  circleOffScreen(circleData) {
    if (circleData.d === "increment") {
      return circleData.target - circleData.coords[circleData.translateKey] < 0;
    }
    if (circleData.d === "decrement") {
      return circleData.target - circleData.coords[circleData.translateKey] > 0;
    }
  }

  animate(timestamp, start, circleData) {
    drawCircle(circleData);
    let delta = timestamp - start;
    let circleIsOffScreen = this.circleOffScreen(circleData);

    if (delta > 6000 && circleIsOffScreen) {
      start = timestamp;
      circleData = this.getCircleData();
    }
    requestAnimationFrame(timestamp => {
      this.animate(timestamp, start, circleData);
    });
  }

  drawCircle(circleData) {
    this.circleCtx.clearRect(0, 0, this.circle.width, this.circle.height);
    this.circleCtx.fillStyle = circleData.c;
    this.circleCtx.beginPath();
    this.circleCtx.arc(
      circleData.coords[0],
      circleData.coords[1],
      circleData.r,
      0,
      2 * Math.PI
    );
    this.circleCtx.fill();
    this.circleCtx.closePath();
    circleData.d === "increment"
      ? (circleData.coords[circleData.translateKey] += 5)
      : (circleData.coords[circleData.translateKey] -= 5);
  }
}
