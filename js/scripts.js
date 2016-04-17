//Graph 4 ------------------------------------------------------------------------------------------------------------  

var dataset = [
  { label: 'Procrastination', count: 60 }, 
  { label: 'Fear', count: 20 },
  { label: 'Feeling The Bern', count: 15 },
  { label: 'Study', count: 1 }
];

var width = 360;
var height = 360;

var radius = Math.min(width, height) / 2; 
var donutWidth = 75;
var legendRectSize = 18;
var legendSpacing = 4;

var color = d3.scale.category20b();


var graph4 = d3.select('#chart-1')
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

var tooltip = d3.select('#area4')            // NEW 
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
      if (totalEnabled < 2) return;                         // NEW
      rect.attr('class', 'disabled');                       // NEW
      enabled = false;                                      // NEW
    }                                                       // NEW

    pie.value(function(d) {                                 // NEW
      if (d.label === label) d.enabled = enabled;           // NEW
      return (d.enabled) ? d.count : 0;                     // NEW
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



// Graph 2 ----------------------------

var margin = {top: 40, right: 40, bottom: 40, left: 80};
var width = '%';
var height = '%';
var padding = 1;

var x = d3.scale.ordinal()
    .domain(flatData.map(xKey))
    .rangeRoundBands([padding, 100 - 2*padding]);

var y = d3.scale.linear()
    .domain([0, d3.max(flatData, yKey)])
    .range([100 - 2*padding, padding]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(15, "$");

var legendRectSize = 16;
var legendSpacing = 4;

var color = d3.scale.category20();

var svg = d3.select("#chart-2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

d3.csv('assets/data/shitlist.csv', function(error, dataset) {  
      dataset.forEach(function(d) {                   
        d.count = +d.count;      
        d.enabled = true;                     
      });     

  x.domain(dataset.map(function(d) { return d.label; }));
  y.domain([0, d3.max(dataset, function(d) { return d.count; })]);

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

  svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.label); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); })
      .attr("fill", function(d) { return color(d.nation); })
      .each(function(d) { this._current = d; });



      var legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 40;
        var horz = 50 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + (2 * vert) + ')';
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
        
        if (rect.attr('class') === 'disabled') {
          rect.attr('class', '');
        } else {
          if (totalEnabled < 2) return;
          rect.attr('class', 'disabled');
          enabled = false;
        }

        (function(d) {  
          if (d.label === label) d.enabled = enabled;
          return (d.enabled) ? d.count : 0;
        });

        path = data(dataset); 

        rect.transition()
          .duration(750)
          .attrTween('d', function(d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              return arc(interpolate(t));
            };
          });
      });

      legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });
    
});

