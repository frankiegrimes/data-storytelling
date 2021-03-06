// Chart 1 - Grouped Bar Chart - Have You Heard of the term Cisgender (Age Groups)
function chart1() {


	// Margin, width & height

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // Scales
    	// X Axis - Yes/No
	var x0 = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0.1);

		// Age Names & Age Groups    
	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
	    .range([height, 0]);

	// Colour

	    // 18-24: #4db8ff
		// 25-34: 0099ff
		// 35-54: #006bb3

	var color = d3.scale.ordinal()
	    .range(["#FC575E", "#44BBFF", "#66CC99"]);

	 // Axes

	var xAxis = d3.svg.axis()
	    .scale(x0)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// Canvas Element

	var svg = d3.select("#chart-1").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Tooltips

	var tooltip = d3.select("#chart-1")          
  		.append('div')                            
  		.attr('class', 'tooltip');                            

	tooltip.append('div')                     
  		.attr('class', 'value');                           

	// Link CSV

	d3.csv("assets/data/cisgender-int.csv", function(error, data) {
	  if (error) {throw error;}

	  // Filter data for age keys (that aren't the answer key) and assign to variable

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Answer"; });

	  data.forEach(function(d) {
	    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
	  });

	  // Map data to domain

	  x0.domain(data.map(function(d) { return d.Answer; }));
	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

	  // Add x axis

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  // Add y axis

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Percentage");

	  // Create placeholders for bars

	  var answer = svg.selectAll(".answer")
	      .data(data)
	      .enter().append("g")
	      .attr("class", "answer")
	      .attr("transform", function(d) { return "translate(" + x0(d.Answer) + ",0)"; });

	  // Add bars

	  var bars = answer.selectAll("rect")
	      .data(function(d) { return d.ages; })
	      .enter().append("rect")
	      .attr("class", "rectangle")
	      .attr("width", x1.rangeBand())
	      .attr("x", function(d) { return x1(d.name); })
	      .attr("y", function(d) { return y(d.value); })
	      .attr("height", function(d) { return height - y(d.value); })
	      .style("fill", function(d) { return color(d.name); });

	  // Create Legend

	  var legend = svg.selectAll(".legend")
	      .data(ageNames.slice().reverse())
	      .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  legend.append("rect")
	      .attr("x", width - 18)
	      .attr("width", 18)
	      .attr("height", 18)
	      .style("fill", color);

	  legend.append("text")
	      .attr("x", width - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "end")
	      .text(function(d) { return d; });


	   // Tooltips

	   bars.on('mouseover', function(d) {
		  tooltip.select('.value').html(d.value+"%");  
		  tooltip.style('display', 'block');
		});

	   bars.on('mouseout', function() {
		  tooltip.style('display', 'none');
		});

	   bars.on('mousemove', function() {
		  tooltip.style('top', (d3.event.layerY + 10) + 'px')
		    .style('left', (d3.event.layerX + 10) + 'px');
		});

	   // Update Data

	   

	}); // End of CSV callback

	/*

	function updateData() {

			    // Get the data again
			    d3.csv("../assets/data/cisgender-int.csv", function(error, data) {

					var ageGroups = d3.keys(data[0]).filter(function(key) { return key !== "Answer"; });

					data.forEach(function(d) {

						    d.ages = ageGroups.map(function(name) { return {name: name, value: +d[name]}; });
					
					});

			    	// Scale the range of the data again 
			   	  x0.domain(data.map(function(d) { return d.Answer; }));
				  x1.domain(ageGroups).rangeRoundBands([0, x0.rangeBand()]);
				  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

				     

				    // Select the section we want to apply our changes to
				    var svg = d3.select("#chart-1").transition();

				    // Make the changes
			        svg.selectAll(".rectangle")
			          .duration(750)
				      .style("fill", function(d) { return color(d.ages); });
			            				 
	   		  
				});
	}

	*/

}


	chart1();



function chart2() {

// Chart 1 - Grouped Bar Chart - Have You Heard of the term Cisgender (Age Groups)



	// Margin, width & height

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // Scales
    	// X Axis - Yes/No
	var x0 = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0.1);

		// Age Names & Age Groups    
	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
	    .range([height, 0]);

	// Colour

	    // 18-24: #4db8ff
		// 25-34: 0099ff
		// 35-54: #006bb3

	var color = d3.scale.ordinal()
	    .range(["#4db8ff", "0099ff", "#006bb3"]);

	 // Axes

	var xAxis = d3.svg.axis()
	    .scale(x0)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// Canvas Element

	var svg = d3.select("#chart-15").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Tooltips

	var tooltip = d3.select("#chart-1")          
  		.append('div')                            
  		.attr('class', 'tooltip');                            

	tooltip.append('div')                     
  		.attr('class', 'value');                           

	// Link CSV

	d3.csv("assets/data/cisgender-int.csv", function(error, data) {
	  if (error) {throw error;}

	  // Filter data for age keys (that aren't the answer key) and assign to variable

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Answer"; });

	  data.forEach(function(d) {
	    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
	  });

	  // Map data to domain

	  x0.domain(data.map(function(d) { return d.Answer; }));
	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

	  // Add x axis

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  // Add y axis

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Percentage");

	  // Create placeholders for bars

	  var answer = svg.selectAll(".answer")
	      .data(data)
	      .enter().append("g")
	      .attr("class", "answer")
	      .attr("transform", function(d) { return "translate(" + x0(d.Answer) + ",0)"; });

	  // Add bars

	  var bars = answer.selectAll("rect")
	      .data(function(d) { return d.ages; })
	      .enter().append("rect")
	      .attr("class", "rectangle")
	      .attr("width", x1.rangeBand())
	      .attr("x", function(d) { return x1(d.name); })
	      .attr("y", function(d) { return y(d.value); })
	      .attr("height", function(d) { return height - y(d.value); })
	      .style("fill", function(d) { return color(d.name); });

	  // Create Legend

	  var legend = svg.selectAll(".legend")
	      .data(ageNames.slice().reverse())
	      .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  legend.append("rect")
	      .attr("x", width - 18)
	      .attr("width", 18)
	      .attr("height", 18)
	      .style("fill", color);

	  legend.append("text")
	      .attr("x", width - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "end")
	      .text(function(d) { return d; });


	   // Tooltips

	   bars.on('mouseover', function(d) {
		  tooltip.select('.value').html(d.value+"%");  
		  tooltip.style('display', 'block');
		});

	   bars.on('mouseout', function() {
		  tooltip.style('display', 'none');
		});

	   bars.on('mousemove', function() {
		  tooltip.style('top', (d3.event.layerY + 10) + 'px')
		    .style('left', (d3.event.layerX + 10) + 'px');
		});

	   // Update Data

	   

	}); // End of CSV callback

}

function chart3() {

// Chart 3 - Grouped Bar Chart - Do you know anyone who is trans? (Age Groups)



	// Margin, width & height

	var margin = {top: 40, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 800 - margin.top - margin.bottom;

    // Scales
    	// X Axis - Yes/No
	var x0 = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0.1);

		// Age Names & Age Groups    
	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
	    .range([height, 0]);

	// Colour

	    // 18-24: #4db8ff
		// 25-34: 0099ff
		// 35-54: #006bb3

	var color = d3.scale.ordinal()
	    .range(["#FC575E", "#44BBFF", "#66CC99"]);

	 // Axes

	var xAxis = d3.svg.axis()
	    .scale(x0)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// Canvas Element

	var svg = d3.select("#chart-3").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Tooltips

	var tooltip = d3.select("#chart-1")          
  		.append('div')                            
  		.attr('class', 'tooltip');                            

	tooltip.append('div')                     
  		.attr('class', 'value');                           

	// Link CSV

	d3.csv("assets/data/trans-friend-int.csv", function(error, data) {
	  if (error) {throw error;}

	  // Filter data for age keys (that aren't the answer key) and assign to variable

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Answer"; });

	  data.forEach(function(d) {
	    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
	  });

	  // Map data to domain

	  x0.domain(data.map(function(d) { return d.Answer; }));
	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

	  // Add x axis

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  // Add y axis

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Percentage");

	  // Create placeholders for bars

	  var answer = svg.selectAll(".answer")
	      .data(data)
	      .enter().append("g")
	      .attr("class", "answer")
	      .attr("transform", function(d) { return "translate(" + x0(d.Answer) + ",0)"; });

	  // Add bars

	  var bars = answer.selectAll("rect")
	      .data(function(d) { return d.ages; })
	      .enter().append("rect")
	      .attr("class", "rectangle")
	      .attr("width", x1.rangeBand())
	      .attr("x", function(d) { return x1(d.name); })
	      .attr("y", function(d) { return y(d.value); })
	      .attr("height", function(d) { return height - y(d.value); })
	      .style("fill", function(d) { return color(d.name); });

	  // Create Legend

	  var legend = svg.selectAll(".legend")
	      .data(ageNames.slice().reverse())
	      .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  legend.append("rect")
	      .attr("x", width - 18)
	      .attr("width", 18)
	      .attr("height", 18)
	      .style("fill", color);

	  legend.append("text")
	      .attr("x", width - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "end")
	      .text(function(d) { return d; });


	   // Tooltips

	   bars.on('mouseover', function(d) {
		  tooltip.select('.value').html(d.value+"%");  
		  tooltip.style('display', 'block');
		});

	   bars.on('mouseout', function() {
		  tooltip.style('display', 'none');
		});

	   bars.on('mousemove', function() {
		  tooltip.style('top', (d3.event.layerY + 10) + 'px')
		    .style('left', (d3.event.layerX + 10) + 'px');
		});

	   // Update Data

	   

	}); // End of CSV callback

}

chart3();

//Graph 5 - Interactive Pie Chart with Tooltips - Media Consuption Habits ----------------------------------------------------------------------------------------------------------  

function chart5() {

var dataset = [
  { label: 'Newspapers', count: 8 }, 
  { label: 'Television', count: 23 },
  { label: 'Magazines', count: 71 },
  { label: 'None', count: 3 },
  { label: 'Friends & Family', count: 3 },
  { label: 'Radio', count: 16 },
  { label: 'Internet', count: 144 }
];

var width = 700;
var height = width;

var radius = Math.min(width, height) / 2; 
var donutWidth = width / 5;
var legendRectSize = width / 20;
var legendSpacing = width / 100;

var color = d3.scale.category20c();


var graph4 = d3.select('#chart-5')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var tooltip = d3.select('#chart-5')            // NEW 
  .append('div')                             // NEW
  .attr('class', 'tooltip');                 // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'label');                   // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'count');                   // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'percent');                 // NEW


dataset.forEach(function(d) {
            d.count = +d.count;
            d.enabled = true;                                         // NEW
          });

var path = graph4.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    return color(d.data.label);
  })
  .each(function(d) { this._current = d; });

path.on('mouseover', function(d) {
  var total = d3.sum(dataset.map(function(d) {
    return (d.enabled) ? d.count : 0;
  }));
  var percent = Math.round(1000 * d.data.count / total) / 10;
  tooltip.select('.label').html(d.data.label);
  tooltip.select('.count').html(d.data.count); 
  tooltip.select('.percent').html(percent + '%'); 
  tooltip.style('display', 'block');
});

path.on('mouseout', function(d) {
  tooltip.style('display', 'none');
});

var legend = graph4.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });



}

chart5();

//Graph 4- Interactive Pie Chart with Tooltips - Do you recall Transgender repesentation? ----------------------------------------------------------------------------------------------------------  

function chart4() {



var nativeDataset = [
  { label: 'Newspapers', count: 37 }, 
  { label: 'Television', count: 77 },
  { label: 'Magazines', count: 43 },
  { label: 'Film', count: 68 },
  { label: 'Books', count: 24 },
  { label: 'Radio', count: 16 },
  { label: 'Internet', count: 86 },
  { label: 'Unsure', count: 15}
];

var immigrantDataset = [
  { label: 'Newspapers', count: 40 }, 
  { label: 'Television', count: 63 },
  { label: 'Magazines', count: 28 },
  { label: 'Film', count: 114 },
  { label: 'Books', count: 14 },
  { label: 'Radio', count: 22 },
  { label: 'Internet', count: 50 }
];

var dataset = nativeDataset;

var width = 700;
var height = width;

var radius = Math.min(width, height) / 2; 
var donutWidth = width / 5;
var legendRectSize = width / 20;
var legendSpacing = width / 100;

var color = d3.scale.category20c();


var graph4 = d3.select('#chart-4')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var tooltip = d3.select('#chart-4')            // NEW 
  .append('div')                             // NEW
  .attr('class', 'tooltip');                 // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'label');                   // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'count');                   // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'percent');                 // NEW


var path = graph4.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    return color(d.data.label);
  })
  .each(function(d) { this._current = d; });


path.on('mouseover', function(d) {
  var total = d3.sum(dataset.map(function(d) {
    return d.count;
  }));
  var percent = Math.round(1000 * d.data.count / total) / 10;
  tooltip.select('.label').html(d.data.label);
  tooltip.select('.count').html(d.data.count); 
  tooltip.select('.percent').html(percent + '%'); 
  tooltip.style('display', 'block');
});

path.on('mouseout', function(d) {
  tooltip.style('display', 'none');
});

var legend = graph4.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);                     

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });

}

chart4();

function chart14() {



var nativeDataset = [
  { label: 'Newspapers', count: 37 }, 
  { label: 'Television', count: 77 },
  { label: 'Magazines', count: 43 },
  { label: 'Film', count: 68 },
  { label: 'Books', count: 24 },
  { label: 'Radio', count: 16 },
  { label: 'Internet', count: 86 },
  { label: 'Unsure', count: 15}
];

var immigrantDataset = [
  { label: 'Newspapers', count: 40 }, 
  { label: 'Television', count: 63 },
  { label: 'Magazines', count: 28 },
  { label: 'Film', count: 114 },
  { label: 'Books', count: 14 },
  { label: 'Radio', count: 22 },
  { label: 'Internet', count: 50 }
];

var dataset = immigrantDataset;

var width = 700;
var height = width;

var radius = Math.min(width, height) / 2; 
var donutWidth = width / 5;
var legendRectSize = width / 20;
var legendSpacing = width / 100;

var color = d3.scale.category20c();


var graph4 = d3.select('#chart-4')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

var pie = d3.layout.pie()
  .value(function(d) { return d.count; })
  .sort(null);

var tooltip = d3.select('#chart-4')            // NEW 
  .append('div')                             // NEW
  .attr('class', 'tooltip');                 // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'label');                   // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'count');                   // NEW

  tooltip.append('div')                        // NEW
    .attr('class', 'percent');                 // NEW


var path = graph4.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) { 
    return color(d.data.label);
  })
  .each(function(d) { this._current = d; });


path.on('mouseover', function(d) {
  var total = d3.sum(dataset.map(function(d) {
    return d.count;
  }));
  var percent = Math.round(1000 * d.data.count / total) / 10;
  tooltip.select('.label').html(d.data.label);
  tooltip.select('.count').html(d.data.count); 
  tooltip.select('.percent').html(percent + '%'); 
  tooltip.style('display', 'block');
});

path.on('mouseout', function(d) {
  tooltip.style('display', 'none');
});

var legend = graph4.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color)
  .on('click', function(label) {
    var rect = d3.select(this);
    var enabled = true;
    var totalEnabled = d3.sum(dataset.map(function(d) {
      return (d.enabled) ? 1 : 0;
    }));
  
    if (rect.attr('class') === 'disabled') {                // NEW
                    rect.attr('class', '');                               // NEW
    } else {                                                // NEW
      if (totalEnabled < 2) {
      return;         
      }                // NEW
      rect.attr('class', 'disabled');                       // NEW
      enabled = false;                                      // NEW
    }                                                       // NEW

    pie.value(function(d) {                                 // NEW
      if (d.label === label) {
      d.enabled = enabled;           // NEW
      return (d.enabled) ? d.count : 0;   
      }                  // NEW
    });                                                     // NEW

    path = path.data(pie(dataset));                         // NEW

    path.transition()                                       // NEW
      .duration(750)                                        // NEW
      .attrTween('d', function(d) {                         // NEW
        var interpolate = d3.interpolate(this._current, d); // NEW
        this._current = interpolate(0);                     // NEW
        return function(t) {                                // NEW
          return arc(interpolate(t));                       // NEW
        };                                                  // NEW
      });                                                   // NEW
  });                     

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });

}

chart14();

//-------------- Chart 6 - Stacked Bar Chart - Do you know any of these organisations? -----------------


function chart6() {

var margin = {top: 30, right: 30, bottom: 40, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#FC575E", "#44BBFF", "#66CC99"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#chart-6").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/organisations-int.csv", function(error, data) {
  if (error) { throw error; }

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "organisation"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.organisation; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage");

  var state = svg.selectAll(".organisation")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.organisation) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});

}

chart6();

//-------------- Chart 7 - Stacked Bar Chart - Do you think being transgender is a choice? -----------------


function chart7() {

var margin = {top: 30, right: 30, bottom: 40, left: 50},
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#FC575E", "#44BBFF", "#66CC99"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#chart-7").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/choice-int.csv", function(error, data) {
  if (error) { throw error; }

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "answer"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.answer; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percentage");

  var state = svg.selectAll(".answer")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.answer) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});

}

chart7();

function chart8() {

// Chart 3 - Grouped Bar Chart - Do you know anyone who is trans? (Age Groups)



	// Margin, width & height

	var margin = {top: 20, right: 40, bottom: 30, left: 40};
    var width = 1200;
    var height = width / 2 - margin.top - margin.bottom;

    // Scales
    	// X Axis - Yes/No
	var x0 = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0.1);

		// Age Names & Age Groups    
	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
	    .range([height, 0]);

	// Colour

	    // 18-24: #4db8ff
		// 25-34: 0099ff
		// 35-54: #006bb3

	var color = d3.scale.ordinal()
	    .range(["#FC575E", "#44BBFF", "#66CC99"]);

	 // Axes

	var xAxis = d3.svg.axis()
	    .scale(x0)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	// Canvas Element

	var svg = d3.select("#chart-8").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Tooltips

	var tooltip = d3.select("#chart-8")          
  		.append('div')                            
  		.attr('class', 'tooltip');                            

	tooltip.append('div')                     
  		.attr('class', 'value');                           

	// Link CSV

	d3.csv("assets/data/trans-term.csv", function(error, data) {
	  if (error) {throw error;}

	  // Filter data for age keys (that aren't the answer key) and assign to variable

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Answer"; });

	  data.forEach(function(d) {
	    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
	  });

	  // Map data to domain

	  x0.domain(data.map(function(d) { return d.Answer; }));
	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

	  // Add x axis

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  // Add y axis

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Percentage");

	  // Create placeholders for bars

	  var answer = svg.selectAll(".answer")
	      .data(data)
	      .enter().append("g")
	      .attr("class", "answer")
	      .attr("transform", function(d) { return "translate(" + x0(d.Answer) + ",0)"; });

	  // Add bars

	  var bars = answer.selectAll("rect")
	      .data(function(d) { return d.ages; })
	      .enter().append("rect")
	      .attr("class", "rectangle")
	      .attr("width", x1.rangeBand())
	      .attr("x", function(d) { return x1(d.name); })
	      .attr("y", function(d) { return y(d.value); })
	      .attr("height", function(d) { return height - y(d.value); })
	      .style("fill", function(d) { return color(d.name); });

	  // Create Legend

	  var legend = svg.selectAll(".legend")
	      .data(ageNames.slice().reverse())
	      .enter().append("g")
	      .attr("class", "legend")
	      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  legend.append("rect")
	      .attr("x", width - 18)
	      .attr("width", 18)
	      .attr("height", 18)
	      .style("fill", color);

	  legend.append("text")
	      .attr("x", width - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "end")
	      .text(function(d) { return d; });


	   // Tooltips

	   bars.on('mouseover', function(d) {
		  tooltip.select('.value').html(d.value+"%");  
		  tooltip.style('display', 'block');
		});

	   bars.on('mouseout', function() {
		  tooltip.style('display', 'none');
		});

	   bars.on('mousemove', function() {
		  tooltip.style('top', (d3.event.layerY + 10) + 'px')
		    .style('left', (d3.event.layerX + 10) + 'px');
		});

	   // Update Data

	   

	}); // End of CSV callback

}

chart8();