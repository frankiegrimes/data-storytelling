function chart2(){var t=500,e=100,a=1,n=[5,10,13,19,21,25,22,18,15,13,11,12,15,20,18,17,16,18,23,25],r=d3.select("#chart-2").append("svg").attr("width",t).attr("height",e);r.selectAll("rect").data(n).enter().append("rect").attr("x",function(e,a){return a*(t/n.length)}).attr("y",function(t){return e-4*t}).attr("width",t/n.length-a).attr("height",function(t){return 4*t}).attr("fill",function(t){return"rgb(0, 0, "+10*t+")"}),r.selectAll("text").data(n).enter().append("text").text(function(t){return t}).attr("text-anchor","middle").attr("x",function(e,r){return r*(t/n.length)+(t/n.length-a)/2}).attr("y",function(t){return e-4*t+14}).attr("font-family","sans-serif").attr("font-size","11px").attr("fill","white")}function graph3(){var t={top:20,right:20,bottom:30,left:40},e=960-t.left-t.right,a=500-t.top-t.bottom,n=d3.format(".0%"),r=d3.scale.ordinal().rangeRoundBands([0,e],.1,1),l=d3.scale.linear().range([a,0]),o=d3.svg.axis().scale(r).orient("bottom"),c=d3.svg.axis().scale(l).orient("left").tickFormat(n),s=d3.select("#chart-3").append("svg").attr("width",e+t.left+t.right).attr("height",a+t.top+t.bottom).append("g").attr("transform","translate("+t.left+","+t.top+")");d3.tsv("assets/data/data.tsv",function(t,e){function n(){clearTimeout(i);var t=r.domain(e.sort(this.checked?function(t,e){return e.frequency-t.frequency}:function(t,e){return d3.ascending(t.letter,e.letter)}).map(function(t){return t.letter})).copy();s.selectAll(".bar").sort(function(e,a){return t(e.letter)-t(a.letter)});var a=s.transition().duration(750),n=function(t,e){return 50*e};a.selectAll(".bar").delay(n).attr("x",function(e){return t(e.letter)}),a.select(".x.axis").call(o).selectAll("g").delay(n)}e.forEach(function(t){t.frequency=+t.frequency}),r.domain(e.map(function(t){return t.letter})),l.domain([0,d3.max(e,function(t){return t.frequency})]),s.append("g").attr("class","x axis").attr("transform","translate(0,"+a+")").call(o),s.append("g").attr("class","y axis").call(c).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Frequency"),s.selectAll(".bar").data(e).enter().append("rect").attr("class","bar").attr("x",function(t){return r(t.letter)}).attr("width",r.rangeBand()).attr("y",function(t){return l(t.frequency)}).attr("height",function(t){return a-l(t.frequency)}),d3.select("input").on("change",n);var i=setTimeout(function(){d3.select("input").property("checked",!0).each(n)},2e3)})}function graph5(){function t(t){var e=(t.endAngle-t.startAngle)/t.value;return d3.range(0,t.value,1e3).map(function(a,n){return{angle:a*e+t.startAngle,label:n%5?null:a/1e3+"k"}})}function e(t){return function(e,a){i.selectAll(".chord path").filter(function(t){return t.source.index!=a&&t.target.index!=a}).transition().style("opacity",t)}}var a=[[11975,5871,8916,2868],[1951,10048,2060,6171],[8010,16145,8090,8045],[1013,990,940,6907]],n=d3.layout.chord().padding(.05).sortSubgroups(d3.descending).matrix(a),r=960,l=500,o=.41*Math.min(r,l),c=1.1*o,s=d3.scale.ordinal().domain(d3.range(4)).range(["#000000","#FFDD89","#957244","#F26223"]),i=d3.select("#chart-5").append("svg").attr("width",r).attr("height",l).append("g").attr("transform","translate("+r/2+","+l/2+")");i.append("g").selectAll("path").data(n.groups).enter().append("path").style("fill",function(t){return s(t.index)}).style("stroke",function(t){return s(t.index)}).attr("d",d3.svg.arc().innerRadius(o).outerRadius(c)).on("mouseover",e(.1)).on("mouseout",e(1));var d=i.append("g").selectAll("g").data(n.groups).enter().append("g").selectAll("g").data(t).enter().append("g").attr("transform",function(t){return"rotate("+(180*t.angle/Math.PI-90)+")translate("+c+",0)"});d.append("line").attr("x1",1).attr("y1",0).attr("x2",5).attr("y2",0).style("stroke","#000"),d.append("text").attr("x",8).attr("dy",".35em").attr("transform",function(t){return t.angle>Math.PI?"rotate(180)translate(-16)":null}).style("text-anchor",function(t){return t.angle>Math.PI?"end":null}).text(function(t){return t.label}),i.append("g").attr("class","chord").selectAll("path").data(n.chords).enter().append("path").attr("d",d3.svg.chord().radius(o)).style("fill",function(t){return s(t.target.index)}).style("opacity",1)}function graph4(){var t={top:20,right:20,bottom:30,left:40},e=960-t.left-t.right,a=500-t.top-t.bottom,n=d3.scale.ordinal().rangeRoundBands([0,e],.1),r=d3.scale.ordinal(),l=d3.scale.linear().range([a,0]),o=d3.scale.ordinal().range(["#98abc5","#8a89a6","#7b6888","#6b486b","#a05d56","#d0743c","#ff8c00"]),c=d3.svg.axis().scale(n).orient("bottom"),s=d3.svg.axis().scale(l).orient("left").tickFormat(d3.format(".2s")),i=d3.select("#chart-4").append("svg").attr("width",e+t.left+t.right).attr("height",a+t.top+t.bottom).append("g").attr("transform","translate("+t.left+","+t.top+")");d3.csv("../assets/data/data.csv",function(t,d){if(t)throw t;var u=d3.keys(d[0]).filter(function(t){return"State"!==t});d.forEach(function(t){t.ages=u.map(function(e){return{name:e,value:+t[e]}})}),n.domain(d.map(function(t){return t.State})),r.domain(u).rangeRoundBands([0,n.rangeBand()]),l.domain([0,d3.max(d,function(t){return d3.max(t.ages,function(t){return t.value})})]),i.append("g").attr("class","x axis").attr("transform","translate(0,"+a+")").call(c),i.append("g").attr("class","y axis").call(s).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Population");var p=i.selectAll(".state").data(d).enter().append("g").attr("class","state").attr("transform",function(t){return"translate("+n(t.State)+",0)"});p.selectAll("rect").data(function(t){return t.ages}).enter().append("rect").attr("width",r.rangeBand()).attr("x",function(t){return r(t.name)}).attr("y",function(t){return l(t.value)}).attr("height",function(t){return a-l(t.value)}).style("fill",function(t){return o(t.name)});var f=i.selectAll(".legend").data(u.slice().reverse()).enter().append("g").attr("class","legend").attr("transform",function(t,e){return"translate(0,"+20*e+")"});f.append("rect").attr("x",e-18).attr("width",18).attr("height",18).style("fill",o),f.append("text").attr("x",e-24).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(function(t){return t})})}!function(t){var e=[{label:"Newspapers",count:60},{label:"TV",count:20},{label:"Social Media",count:15},{label:"Film",count:1}],a=360,n=360,r=Math.min(a,n)/2,l=75,o=18,c=4,s=t.scale.category20b(),i=t.select("#chart-1").append("svg").attr("width",a).attr("height",n).append("g").attr("transform","translate("+a/2+","+n/2+")"),d=t.svg.arc().innerRadius(r-l).outerRadius(r),u=t.layout.pie().value(function(t){return t.count}).sort(null),p=t.select("#chart-1").append("div").attr("class","tooltip");p.append("div").attr("class","label"),p.append("div").attr("class","count"),p.append("div").attr("class","percent"),e.forEach(function(t){t.count=+t.count,t.enabled=!0});var f=i.selectAll("path").data(u(e)).enter().append("path").attr("d",d).attr("fill",function(t,e){return s(t.data.label)}).each(function(t){this._current=t});f.on("mouseover",function(a){var n=t.sum(e.map(function(t){return t.enabled?t.count:0})),r=Math.round(1e3*a.data.count/n)/10;p.select(".label").html(a.data.label),p.select(".count").html(a.data.count),p.select(".percent").html(r+"%"),p.style("display","block")}),f.on("mouseout",function(t){p.style("display","none")});var h=i.selectAll(".legend").data(s.domain()).enter().append("g").attr("class","legend").attr("transform",function(t,e){var a=o+c,n=a*s.domain().length/2,r=-2*o,l=e*a-n;return"translate("+r+","+l+")"});h.append("rect").attr("width",o).attr("height",o).style("fill",s).style("stroke",s).on("click",function(a){var n=t.select(this),r=!0,l=t.sum(e.map(function(t){return t.enabled?1:0}));if("disabled"===n.attr("class"))n.attr("class","");else{if(2>l)return;n.attr("class","disabled"),r=!1}u.value(function(t){return t.label===a&&(t.enabled=r),t.enabled?t.count:0}),f=f.data(u(e)),f.transition().duration(750).attrTween("d",function(e){var a=t.interpolate(this._current,e);return this._current=a(0),function(t){return d(a(t))}})}),h.append("text").attr("x",o+c).attr("y",o-c).text(function(t){return t})}(window.d3),chart2(),graph3(),graph5(),graph4();