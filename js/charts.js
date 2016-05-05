// Chart 1 - Grouped Bar Chart - Have You Heard of the term Cisgender (Age Groups)



	// Margin, width & height

	var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // Scales

	var x0 = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0.1);

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
	    .orient("left")
	    .tickFormat(d3.format(".2s"));

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

	d3.csv("../assets/data/cisgender-age.csv", function(error, data) {
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

	function updateData() {

			    // Get the data again
			    d3.csv("../assets/data/cisgender-int.csv", function(error, data) {
			       	data.forEach(function() {

				    	var ageGroups = d3.keys(data[0]).filter(function(key) { return key !== "Answer"; });
				   

					    data.forEach(function(d) {
					    	d.ages = ageGroups.map(function(name) { return {name: name, value: +d[name]};  });
					  
					  	});
				  

			    	// Scale the range of the data again 
			    	x0.domain(data.map(function(d) { return d.Answer; }));
				    x1.domain(ageGroups).rangeRoundBands([0, x0.rangeBand()]);
				    y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

				     

				    // Select the section we want to apply our changes to
				    var svg = d3.select("#chart-1").transition();

				    // Make the changes
			        svg.selectAll(".rectangle")
				      .style("fill", "red");

					svg.select(".x.axis") // change the x axis
			            .duration(750)
			            .call(xAxis);

			        svg.select(".y.axis") // change the y axis
			            .duration(750)
			            .call(yAxis);

				      	});
	   		  
				});
		}

