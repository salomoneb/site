const grid = document.querySelector("#grid")
const circle = document.querySelector("#circle")
const circleCtx = circle.getContext("2d")
let windowWidth, windowHeight, coords

window.addEventListener("resize", init)
document.addEventListener("click", init)

init()
runAnimation()

function init() {
  const commonCellDimension = Math.floor(Math.random() * 100 + 25)
  const cellHeight = commonCellDimension
  const cellWidth = commonCellDimension
  windowWidth = window.innerWidth
  windowHeight = window.innerHeight

  coords = generateCoords(cellWidth, cellHeight)

  ;[grid, circle].forEach(canvas => {
    canvas.setAttribute("width", windowWidth)
    canvas.setAttribute("height", windowHeight)
  })

  drawGrid(coords)
}
function generateCoords(cellWidth, cellHeight) { // Create grid coordinates
  coords = []
  for (let i = 0; i < windowWidth; i++) {
    if (i % cellWidth === 0) {
      coords.push({
        start: [i, 0],
        end: [i, windowHeight],
        translateKey: 1
      })
    }
  }
  for (let i = 0; i < windowHeight; i++) {
    if (i % cellHeight === 0) {
      coords.push({
        start: [0, i],
        end: [windowWidth, i],
        translateKey: 0
      })
    }
  }
  return coords
}
function drawGrid(coords) {
  const ctx = grid.getContext("2d")
  ctx.clearRect(0, 0, windowWidth, windowHeight)
  ctx.lineWidth = 0.4
  ctx.strokeStyle = "rgb(202,202,202)"

  coords.forEach(coord => {
    ctx.beginPath()
    ctx.moveTo(coord.start[0], coord.start[1])
    ctx.lineTo(coord.end[0], coord.end[1])
    ctx.stroke()
    ctx.closePath()
  })
}
function getCircleData() {
  let coordinate = coords[Math.floor(Math.random() * coords.length)]
  let startEndPoints = getStartEndPoints(coordinate)

  let circleData = {
    coords: [coordinate.start[0], coordinate.start[1]],
    r: Math.floor(Math.random() * (40 - 5) + 10),
    c: createColor(),
    d: startEndPoints[1] - startEndPoints[0] > 0 ? "increment" : "decrement",
    target: startEndPoints[1],
    translateKey: coordinate.translateKey,
  }
  circleData.coords[circleData.translateKey] = startEndPoints[0]
  return circleData
}
function getStartEndPoints(coordinate) {
  let startEndPoints = [
    coordinate.start[coordinate.translateKey],
    coordinate.end[coordinate.translateKey]
  ]
  let randomIndex = Math.round(Math.random() * (startEndPoints.length-1))
  startEndPoints.push(startEndPoints.splice(randomIndex, 1)[0])
  return startEndPoints
}
function runAnimation() {
  circleData = getCircleData()
  let start = performance.now()
  requestAnimationFrame(timestamp => {
    animate(timestamp, start, circleData)
  })
}
function circleOffScreen(circleData) {
  if (circleData.d === "increment") {
    return circleData.target - circleData.coords[circleData.translateKey] < 0
  }
  if (circleData.d === "decrement") {
    return circleData.target - circleData.coords[circleData.translateKey] > 0
  }
}
function animate(timestamp, start, circleData) {
  drawCircle(circleData)
  let delta = timestamp - start
  let circleIsOffScreen = circleOffScreen(circleData)

  if (delta > 6000 && circleIsOffScreen) {
    start = timestamp
    circleData = getCircleData()
  }
  requestAnimationFrame(timestamp => {
    animate(timestamp, start, circleData)
  })
}
function drawCircle(circleData) {
  circleCtx.clearRect(0, 0, circle.width, circle.height)
  circleCtx.fillStyle = circleData.c
  circleCtx.beginPath()
  circleCtx.arc(circleData.coords[0], circleData.coords[1], circleData.r, 0, 2 * Math.PI)
  circleCtx.fill()
  circleCtx.closePath()
  circleData.d === "increment"
    ? circleData.coords[circleData.translateKey]+=5
    : circleData.coords[circleData.translateKey]-=5
}
