const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight
const animationDuration = 3000
const color = createColor()

const cellDimensions = function() {
	return {
		cellHeight: 100,
		cellWidth: 100
	}
}

function createGridData() {
	const data = []
	const { cellHeight, cellWidth } = cellDimensions()

	const rows = Math.ceil(viewportHeight / cellHeight )
	const columns = Math.ceil(viewportWidth / cellWidth)	

	let xPos = 1
	let yPos = 1

	for (let i = 0; i < rows; i++) {
		data.push([])
		for (let j = 0; j < columns; j++) {
			let square = {
				x: xPos, 
				y: yPos,
				cellWidth: cellWidth, 
				cellHeight: cellHeight
			}
			data[i].push(square)
			xPos += cellWidth
		}
		xPos = 1
		yPos += cellHeight
	}		
	return data
}

const gridData = createGridData()

// Make the grid
const grid = d3.select("#grid")
	.attr("width", `${viewportWidth}px`)
	.attr("height", `${viewportHeight}px`)

// Make the rows
const row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row")	

// Make the squares
const square = row.selectAll(".square")
	.data(function(d) { return d })
	.enter().append("rect")
	.attr("class", "square")
	.attr("x", function(d) { return d.x })
	.attr("y", function(d) { return d.y })	
	.attr("width", function(d) { return d.cellWidth })
	.attr("height", function(d) { return d.cellHeight })
	.style("fill", "transparent")
	.style("stroke", "#eee")	

// Get the max and min coordinate values on the board
function getGridBoundaries(gridData) {
	const gridDataLength = gridData.length-1

	return {
		minX: gridData[0][0].x,
		minY: gridData[0][0].y,
		maxX: gridData[0][gridData[0].length-1].x,
		maxY: gridData[gridDataLength][gridData[gridDataLength].length-1].y
	}
}

const gridBoundaries = getGridBoundaries(gridData)

function createParticleData() {
	// Create a filtered, flattened array of square coordinates
	// and reduce to a single object
	const filteredData = gridData.map(row => {
		row = row.filter(data => {
			return data.x === gridBoundaries.minX 
				|| data.x === gridBoundaries.maxX 
				|| data.y === gridBoundaries.minY 
				||  data.y === gridBoundaries.maxY
		})
		return row.map(square => {
			return { x: square.x, y: square.y }
		})
	})
	.reduce((accumulator, currentValue) => {
		return accumulator.concat(currentValue)
	})	
	return [filteredData[Math.floor(Math.random() * filteredData.length)]]
}	

// Get the key that we'll use to calculate the transform
function getTransformKey(x,y,middle) {
	const keyObj = {
		[`${y === gridBoundaries.minY}`]: "top",
		[`${y === gridBoundaries.maxY}`]: "bottom",
		[`${x === gridBoundaries.minX && middle}`]: "middleLeft",
		[`${x === gridBoundaries.maxX && middle}`]: "middleRight"
	}	
	return keyObj[true]
}

// Return a string that we'll use to translate the shape
function calculateTransform(x,y) {	
	const { cellHeight, cellWidth } = cellDimensions()
	const middleRow = y > gridBoundaries.minY && y < gridBoundaries.maxY
	let key = getTransformKey(x,y,middleRow)

	const boardLocations = {
		top: `0, ${viewportHeight + cellHeight}`, 
		bottom: `0, -${viewportHeight + cellHeight}`,
		middleLeft: `${viewportWidth + cellWidth}, 0`,
		middleRight: `-${viewportWidth}, 0`
	}

	return `translate(${boardLocations[key]})`
}

function createParticles() {
	const particleData = createParticleData()	
	const particleColor = createColor()
	const { cellHeight, cellWidth } = cellDimensions()

	const circle = grid.selectAll(".particle")
		.data(particleData)
		.enter().append("circle")
		.attr("cx", function(d) { return d.x })
		.attr("cy", function(d) { return d.y })
		.attr("r", getNumberInRange(5, 30))
		.attr("fill", particleColor)
		.attr("stroke", particleColor)
		.transition()
		.ease(d3.easeLinear)
		.attr("transform", function(d) { return calculateTransform(d.x, d.y) })		
		.duration(animationDuration)		
	
	circle.remove()	
}

function getNumberInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function runAnimation() {	
	let previousTime = performance.now()

	function animateParticles(currentTime) {		
		const delay = getNumberInRange(animationDuration * 2, animationDuration * 7)
		const delta = currentTime - previousTime
		if (delta >= delay) {		
			console.log(delay)		
			previousTime = currentTime
			createParticles()
		}
		window.requestAnimationFrame(animateParticles)
	}
	animateParticles()
}
runAnimation()