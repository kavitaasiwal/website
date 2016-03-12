function changeTab () {
	var content = document.getElementsByClassName("content"),
		contentType = event.target.dataset.navigateTo, tabContents, counter;
	tabContents = content[0].children;

	for (counter = 0; counter < tabContents.length; counter++) {
		if (tabContents[counter].id === contentType) {
			if (contentType === "eggData") {
				loadEggData(tabContents[counter]);
			}
			tabContents[counter].hidden = false;
		} else {
			tabContents[counter].hidden = true;
		}
	}
}


function loadEggData (eggDataTab) {
	if (eggDataTab.innerHTML === "") {
		d3.json("https://data.gov.in/api/datastore/resource.json?resource_id=36114153-8213-4845-ba41-4e3e8249f9c5&api-key=e385932c4cc4ed1b02ae29633754e999", function(error, response) {
 			var data = processData(response.records);

			var colors = [
				'steelblue',
				'green',
				'red',
				'purple'
			];

			var width = 1000,
			    height = 400;
			
			var minMax = findDataMinMax(data);
			var x = d3.scale.linear()
			    .domain([minMax.minX, minMax.maxX])
			    .range([0, width]);
			 
			var y = d3.scale.linear()
			    .domain([minMax.minY, minMax.maxY])
			    .range([height, 0]);
				
			var xAxis = d3.svg.axis()
			    .scale(x)
				.tickSize(-height)
				.tickPadding(10)	
				.tickSubdivide(true)	
			    .orient("bottom");	
				
			var yAxis = d3.svg.axis()
			    .scale(y)
				.tickPadding(10)
				.tickSize(-width)
				.tickSubdivide(true)	
			    .orient("left");

			// var svg = d3.select(".eggData").append("svg")
			// 	.attr("width", width + margin.left + margin.right)
			//     .attr("height", height + margin.top + margin.bottom)
			// 	.append("g")
			//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var svg = d3.select(".eggData")
			   .append("div")
			   .classed("svg-container", true) //container class to make it responsive
			   .append("svg")
			   //responsive SVG needs these 2 attributes and no width and height attr
			   .attr("preserveAspectRatio", "xMinYMin meet")
			   .attr("viewBox", "-60 20 " + width + " " + height)
			   //class to make it responsive
			   .classed("svg-content-responsive", true); 
			 
			svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + height + ")")
			    .call(xAxis);
			 
			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis);
			 
			svg.append("g")
				.attr("class", "y axis")
				.append("text")
				.attr("class", "axis-label")
				.attr("transform", "rotate(-90)")
				.attr("y", 10)
				.attr("x", -height/2)
				.text('Axis Label');	
			 
			svg.append("clipPath")
				.attr("id", "clip")
				.append("rect")
				.attr("width", width)
				.attr("height", height);
				
			var line = d3.svg.line()
			    .interpolate("linear")	
			    .x(function(d) { return x(d.x); })
			    .y(function(d) { return y(d.y); });		
				
			svg.selectAll('.line')
				.data(data)
				.enter()
				.append("path")
			    .attr("class", "line")
				.attr("clip-path", "url(#clip)")
				.attr('stroke', function(d,i){ 			
					return colors[i%colors.length];
				})
			    .attr("d", line);		
				
			var points = svg.selectAll('.dots')
				.data(data)
				.enter()
				.append("g")
			    .attr("class", "dots")
				.attr("clip-path", "url(#clip)");	
			 
			points.selectAll('.dot')
				.data(function(d, index){ 		
					var a = [];
					d.forEach(function(point,i){
						a.push({'index': index, 'point': point});
					});		
					return a;
				})
				.enter()
				.append('circle')
				.attr('class','dot')
				.attr("r", 2.5)
				.attr('fill', function(d,i){ 	
					return colors[d.index%colors.length];
				})	
				.attr("transform", function(d) { 
					return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")"; }
				);
			});
	}
}


function processData(response) {
	var record, data = [], entry = [], desiredStates = ["Delhi", "Assam", "Karnataka"], year;
	Object.keys(response).forEach(function(key) {
		if (desiredStates.indexOf(response[key]["States/UTs"]) > -1) {
			record = response[key];
			Object.keys(record).forEach( function(field) {
				if (field.indexOf("Egg Production") > -1) {
					year = Number(field.match(/\d{4}-\d{2}/)[0].split("-")[1]);
					entry.push({x: year, y: Number(record[field])});
				}
			});

			data.push(entry);
			entry = [];
		}

	});
	console.log(data);
	return data;
}

function findDataMinMax(data) {
	var minMax = {};
	data.forEach(function(line) {
		line.forEach(function(dataPoint) {
			if (!minMax.minX) {
				minMax.minX = dataPoint.x;
				minMax.minY = dataPoint.y;
				minMax.maxX = dataPoint.x;
				minMax.maxY = dataPoint.y;
			}

			if (minMax.minX > dataPoint.x) {
				minMax.minX = dataPoint.x;
			}
			if (minMax.minY > dataPoint.y) {
				minMax.minY = dataPoint.y;
			}
			if (minMax.maxX < dataPoint.x) {
				minMax.maxX = dataPoint.x;
			}
			if (minMax.maxY < dataPoint.y) {
				minMax.maxY = dataPoint.y;
			}
		})
	});
	return minMax;
}
