let windowWidth, windowHeight, coords
const gridCanvas = document.querySelector("#grid")
const circleCanvas = document.querySelector("#circle")
const circleCtx = circleCanvas.getContext("2d")

init()
;["resize", "click"].forEach(event => window.addEventListener(event, init))
window.addEventListener("touchmove", (event) => event.prevenDefault())

function init() {
  let commonCellDimension = Math.floor(Math.random() * 100 + 25)
  cellHeight = commonCellDimension
  cellWidth = commonCellDimension
  windowWidth = window.innerWidth
  windowHeight = window.innerHeight
  ;[gridCanvas, circleCanvas].forEach(canvas => {
    canvas.setAttribute("width", windowWidth)
    canvas.setAttribute("height", windowHeight)
  })
  coords = generateCoords(cellWidth, cellHeight)
  drawGrid(coords, runAnimation)
}

function generateCoords() { // Create grid coordinates
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

function drawGrid(coords, runAnimation) {
  const ctx = gridCanvas.getContext("2d")
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
  return runAnimation()
}

function getCircleData() {
  let randomPoint = coords[Math.floor(Math.random() * coords.length)] 
  let startEndPoints = getStartEndPoints(randomPoint)
  let circleData = {
    coords: [...randomPoint.start],
    r: Math.floor(Math.random() * (40 - 5) + 10),
    c: createColor(), 
    d: startEndPoints[1] - startEndPoints[0] > 0 ? "increment" : "decrement",
    translateKey: randomPoint.translateKey   
  }
  circleData.coords[randomPoint.translateKey] = startEndPoints[0]
  return circleData 
}

function getStartEndPoints(randomPoint) {
  let startEndPoints = [randomPoint.start[randomPoint.translateKey], randomPoint.end[randomPoint.translateKey]]
  let randomIndex = Math.round(Math.random() * (startEndPoints.length-1))

  startEndPoints.push(startEndPoints.splice(randomIndex, 1)[0])
  return startEndPoints  
}

function runAnimation() {
  circleData = getCircleData()
  let start = performance.now()  
  requestAnimationFrame(function(timestamp) {
    animate(timestamp, start, circleData)
  })
}

function animate(timestamp, start, circleData) {
  drawCircle(circleData) 
  let delta = timestamp - start
  if (delta > 6000) {
    start = timestamp
    circleData = getCircleData()
  }
  requestAnimationFrame(function(timestamp) {
    animate(timestamp, start, circleData)
  })
}

function drawCircle(circleData) { // Draw the circle
  let translateDiff = circleData.frozenEnd - circleData.frozenStart
  circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
  circleCtx.fillStyle = circleData.c
  circleCtx.beginPath()
  circleCtx.arc(circleData.coords[0], circleData.coords[1], circleData.r, 0, 2 * Math.PI)
  circleCtx.fill()
  circleCtx.closePath()
  circleData.d === "increment" 
    ? circleData.coords[circleData.translateKey]+=5 
    : circleData.coords[circleData.translateKey]-=5  
}
