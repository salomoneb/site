const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight
const animationDuration = 1000

const color = createColor()
document.querySelectorAll("a").forEach(function(link) {
	link.style.borderBottomColor = color
})

const cellDimensions = function() {
	return {
		cellHeight: 100,
		cellWidth: 100
	}
}

function createGridData() {
	const data = []
	let { cellHeight, cellWidth } = cellDimensions()

	const rows = Math.ceil(viewportHeight / cellHeight)
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

const square = row.selectAll(".square")
	.data(function(d) { 
		return d 
	})
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
	// then reduce to a single object
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

function calculateTransform(x,y) {	
	const { cellHeight, cellWidth } = cellDimensions()

	if (y === gridBoundaries.minY) { // Top row
		return `translate(0, ${viewportHeight})`
	}	
	if (y === gridBoundaries.maxY) { // Bottom row
		return `translate(0, -${viewportHeight + cellHeight})`
	}	
	if (x === gridBoundaries.minX && (y > gridBoundaries.minY && y < gridBoundaries.maxY)) { // Left side middle
		return `translate(${viewportWidth}, 0)`
	}	
	if (x === gridBoundaries.maxX && (y > gridBoundaries.minY && y < gridBoundaries.maxY)) { // Right side middle
		return `translate(-${viewportWidth}, 0)`
	}
}

function shapeAttrs() {
	return {
		radius: 12
	}
}

function createColor() {
	const hue = Math.round(Math.random() * 360)
	return `hsl(${hue}, 80%, 45%)`
}

function createTimeInterval(min, max) {
	console.log(Math.floor(Math.random() * (max - min + 1) + min))
	return Math.floor(Math.random() * (max - min + 1) + min)
}
function selectTimeInterval(delay) {
	return Math.ceil(Math.random() * createTimeInterval(delay * 2, delay * 20))
}

function createParticles(elapsed) {
	const particleData = createParticleData()
	const circleAttrs = shapeAttrs()
	const color = createColor()
	const { cellHeight, cellWidth } = cellDimensions()

	const circle = grid.selectAll(".particle")
		.data(particleData)
		.enter().append("circle")
		.attr("cx", function(d) { return d.x })
		.attr("cy", function(d) {
			if (d.y === gridBoundaries.maxY) { return d.y + cellHeight }
			if (d.x === gridBoundaries.maxX) { return d.x + cellWidth }
			return d.y
		})
		.attr("r", function(d) { return circleAttrs.radius })		
		.attr("fill", color)
		.attr("stroke", color)
		.transition()
		.ease(d3.easeLinear)
		.attr("transform", function(d) { return calculateTransform(d.x, d.y) })
		.duration(animationDuration)
	
	circle.remove()		
}

d3.interval(createParticles, selectTimeInterval(animationDuration))