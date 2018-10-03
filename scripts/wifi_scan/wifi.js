//set dimensions of graph
var margin = {
	top: 30,
	right: 30,
	bottom: 55,
	left: 50
};
var width = 600 - margin.left - margin.right;
var height = 270 - margin.top - margin.bottom;

//parse timestamp for d3 compatible format
var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

//set x, y ranges: ensure x value fits on graph; 
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

//define axes
var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

//define line
var qualityLine = d3.svg.line()
	.x(function(d) { return x(d.timestamp); })
	.y(function(d) { return y(d.quality); });

//define main svg format
var svg = d3.select("body")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", 
		"translate(" + margin.left + "," + margin.top + ")");
		
var allPoints = {};

//global object for data points
var dict = {};

//data retrieval for first scan
d3.json("scan_data1.json", function(error, data) {
	if (error) return console.warn(error);				
	//console.log(data);
	
	for (var k in data) {
		var k_data = data[k];
		//console.log(k_data);
		
		for (var v in k_data) {			
			if (v == "mac") {
				var mac = k_data[v];
				dict[mac] = {};
			}
			else if (v == "channel") {
				var channel = k_data[v];
			}
			else if (v == "frequency") {
				var frequency = k_data[v];
			}
			else if (v == "encryption") {
				var encryption = k_data[v];
			}
			else if (v == "essid") {
				var essid = k_data[v];
			}
			else if (v == "quality") {
				var quality = k_data[v];				
				dict[mac]["quality"] = quality;
			}
			else if (v == "timestamp") {
				timestamp = parseDate(k_data[v]);
				dict[mac]["timestamp"] = timestamp;
			}				
		}
		
		d3.select("body").append("p").text("Mac Address: " + mac);
		/*d3.select("body").append("p").text("Channel: " + channel);
		d3.select("body").append("p").text("Frequency: " + frequency);
		d3.select("body").append("p").text("Encryption: " + encryption);
		d3.select("body").append("p").text("ESSID: " + essid);
		*/
		//d3.select("body").append("p").text("Signal Quality: " + quality);
		//d3.select("body").append("p").text("Date: " + timestamp);
		
		//set min and max date for x axis
		var mindate = d3.time.minute.offset(timestamp, -10);
		var maxdate = d3.time.hour.offset(timestamp, 1);
		
		//d3.select("body").append("p").text("mindate: " + mindate);
		//d3.select("body").append("p").text("maxdate: " + maxdate);
		
		//set range of x and y axis
		x.domain([mindate, maxdate]);
		y.domain([0, 100]);

		//draw x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
			
		//name x axis
		svg.append("text")
			.attr("x", width/2)
			.attr("y", height + margin.bottom - 10)
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.text("Date");
		
		//draw y axis			
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", ".71em");

		//name y axis
		svg.append("text")
			.attr("x", 0 - height / 2)
			.attr("y", -margin.left + 20)
			.attr("transform", "rotate(-90)")
			.style("text-anchor", "middle")
			.style("font-size", "12px")
			.text("Signal Quality (%)")
		
		//temp array containing data points as objects
		var pointData = [{'timestamp': timestamp, 'quality': quality}
		//,{'timestamp': d3.time.minute.offset(timestamp, 10), 'quality': quality - 10}
		];
		
		//draw data pointss
		svg.selectAll("dot")
			.data(pointData)
			.enter().append("circle")
				.attr("r", 3.5)
				.attr("cx", function(d) { return x(d.timestamp); })
				.attr("cy", function(d) { return y(d.quality); });

		// Add the valueline path.
		svg.append("path")
        .attr("class", "line")
        .attr("d", qualityLine(pointData));

	}
	console.log(dict);
});	

//update graph with new data points from next scan
function updateData(file) {
	console.log("updateData called");
	d3.json(file, function(error, data) {	
		for (var k in data) {
			var k_data = data[k];
			//console.log(k_data);
		
			for (var v in k_data) {
				if (v == "mac") {
					var mac = k_data[v];
				}
				else if (v == "channel") {
					var channel = k_data[v];
				}
				else if (v == "frequency") {
					var frequency = k_data[v];
				}
				else if (v == "encryption") {
					var encryption = k_data[v];
				}
				else if (v == "essid") {
					var essid = k_data[v];
				}
				else if (v == "quality") {
					var quality = k_data[v];
				}
				else if (v == "timestamp") {
					timestamp = parseDate(k_data[v]);
				}				
			}	
		
			//d3.select("body").append("p").text("Mac Address: " + mac);
			//d3.select("body").append("p").text("Signal Quality: " + quality);
			//d3.select("body").append("p").text("Date: " + timestamp);

			var pointData = [{'timestamp': timestamp, 'quality': quality}];

			svg.selectAll("dot")
				.data(pointData)
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("cx", function(d) { return x(timestamp); })
				.attr("cy", function(d) { return y(quality); });

			for (var i in dict)	{
				if(mac == i) {
					var newPoint = dict[i];
					pointData.push(newPoint);
					
					// Add the valueline path.
					svg.append("path")
        				.attr("class", "line")
        				.attr("d", qualityLine(pointData));

					
				}
			}
		}
	});
}
