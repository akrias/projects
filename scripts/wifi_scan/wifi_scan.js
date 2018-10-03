//set dimensions of graph
var margin = {
	top: 30,
	right: 20,
	bottom: 30,
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

		

d3.csv("test.csv", function(error, data) {			
	console.log(data);
	
	data.forEach(function(d) {
		d.timestamp = parseDate(d.timestamp);
		d.quality = +d.quality;
		d.mac = d.mac;
		d.channel = d.channel;
		d.frequency = +d.frequency;
		d.encryption = d.encryption;
		d.essid = d.essid;		
		
		d3.select("body").append("p").text("Mac Address: " + d.mac);
		d3.select("body").append("p").text("ESSID: " + d.essid);
		d3.select("body").append("p").text("Encryption: " + d.encryption);				
		d3.select("body").append("p").text("Frequency: " + d.frequency);
		d3.select("body").append("p").text("Channel: " + d.channel);
		
		d3.select("body").append("p").text("Signal Quality: " + d.quality);
		d3.select("body").append("p").text("Date: " + d.timestamp);
		
		//set min and max date for x axis
		var mindate = d3.time.minute.offset(d.timestamp, -10);
		var maxdate = d3.time.hour.offset(d.timestamp, 1);
		
		d3.select("body").append("p").text("mindate: " + mindate);
		d3.select("body").append("p").text("maxdate: " + maxdate);
		
		x.domain([mindate, maxdate]);
		y.domain([0, 100]);

		var svg = d3.select("body")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");
		
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
			
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", ".71em")
			.style("text-anchor", "end")
			.text("Signal (%)");
		
		var pointData = [{'timestamp': d.timestamp, 'quality': d.quality}, 
						{'timestamp': d3.time.minute.offset(d.timestamp, 10), 'quality': d.quality}, 
						{'timestamp': d3.time.minute.offset(d.timestamp, 20), 'quality': d.quality - 10}];
			
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

	});
	
});

