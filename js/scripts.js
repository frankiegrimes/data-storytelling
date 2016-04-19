//Graph 1 - Interactive Pie Chart with Tooltips -----------------------------------------------------------------------------------------------------------  

(function(d3) {



var dataset = [
  { label: 'Newspapers', count: 60 }, 
  { label: 'TV', count: 20 },
  { label: 'Social Media', count: 15 },
  { label: 'Film', count: 1 }
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

var tooltip = d3.select('#chart-1')            // NEW 
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

})(window.d3);



//Graph 2 - Interactive Colour Based Bar Chart with axis -----------------------------------------------------------------------------------------------------------  

function chart2() {

//Width and Height
var w = 500;
var h = 100;
var barPadding = 1;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
              11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];


//Create empty SVG element and add to DOM

var graph2 = d3.select("#chart-2")
      .append("svg")
      .attr("width", w)
      .attr("height", h);



//Generate rectangles and add them to SVG



graph2.selectAll("rect")
         .data(dataset)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
            return i * (w / dataset.length);
         })
         .attr("y", function(d) {
            return h - (d * 4);
         })
         .attr("width", w / dataset.length - barPadding)
         .attr("height", function(d) {
            return d * 4;
         })
         .attr("fill", function(d) {
          return "rgb(0, 0, " + (d * 10) + ")";
         });

      graph2.selectAll("text")
         .data(dataset)
         .enter()
         .append("text")
         .text(function(d) {
            return d;
         })
         .attr("text-anchor", "middle")
         .attr("x", function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
         })
         .attr("y", function(d) {
            return h - (d * 4) + 14;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "11px")
         .attr("fill", "white");

}

chart2();

// Graph 5 ------------------------------------------------------

function graph3() {

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var svg = d3.select("#chart-3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("assets/data/data.tsv", function(error, data) {

  data.forEach(function(d) {
    d.frequency = +d.frequency;
  });

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

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
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });

  d3.select("input").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked ? function(a, b) { return b.frequency - a.frequency; }
        : function(a, b) { return d3.ascending(a.letter, b.letter); })
        .map(function(d) { return d.letter; }))
        .copy();

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.letter) - x0(b.letter); });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.letter); });

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }
});

}

graph3();

// Graph 4 - Grouped Bar Chart with filter ----------------------------------

function graph5() {

var matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .matrix(matrix);

var width = 960,
    height = 500,
    innerRadius = Math.min(width, height) * .41,
    outerRadius = innerRadius * 1.1;

var fill = d3.scale.ordinal()
    .domain(d3.range(4))
    .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

var svg = d3.select("#chart-5").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").selectAll("path")
    .data(chord.groups)
  .enter().append("path")
    .style("fill", function(d) { return fill(d.index); })
    .style("stroke", function(d) { return fill(d.index); })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

var ticks = svg.append("g").selectAll("g")
    .data(chord.groups)
  .enter().append("g").selectAll("g")
    .data(groupTicks)
  .enter().append("g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius + ",0)";
    });

ticks.append("line")
    .attr("x1", 1)
    .attr("y1", 0)
    .attr("x2", 5)
    .attr("y2", 0)
    .style("stroke", "#000");

ticks.append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return d.label; });

svg.append("g")
    .attr("class", "chord")
  .selectAll("path")
    .data(chord.chords)
  .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { return fill(d.target.index); })
    .style("opacity", 1);

// Returns an array of tick angles and labels, given a group.
function groupTicks(d) {
  var k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, 1000).map(function(v, i) {
    return {
      angle: v * k + d.startAngle,
      label: i % 5 ? null : v / 1000 + "k"
    };
  });
}

// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
      .transition()
        .style("opacity", opacity);
  };
}

}

graph5();


// Graph 5 - Grouped Bar Chart with filter ----------------------------------

function graph4() {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#chart-4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../assets/data/data.csv", function(error, data) {
  if (error) throw error;

  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.State; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

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
      .text("Population");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "state")
      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

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

});
}

graph4();



