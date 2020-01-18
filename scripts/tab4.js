function drawBar(datafile, cssselector, colorrange) {

var svg = d3.select(cssselector),
    margin = {top: 50, right: 20, bottom: 0, left: 150},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()      // x = d3.scaleBand() 
    .rangeRound([0, height])  // .rangeRound([0, width])
    .paddingInner(0.1)
    .align(0.1);

var x = d3.scaleLinear()    // y = d3.scaleLinear()
    .rangeRound([0, width]);  // .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(colorrange);

d3.csv(datafile, function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;
  var keys = data.columns.slice(1);

  data.sort(function(a, b) { return b.total - a.total; });
  y.domain(data.map(function(d) { return d.State; }));          // x.domain...
  x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();  // y.domain...
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y(d.data.State); })     //.attr("x", function(d) { return x(d.data.State); })
      .attr("x", function(d) { return x(d[0]); })         //.attr("y", function(d) { return y(d[1]); }) 
      .attr("width", function(d) { return x(d[1]) - x(d[0]); }) //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("height", y.bandwidth());               //.attr("width", x.bandwidth());


  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)")           
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-size", 14);                  //   .call(d3.axisBottom(x));  

  g.append("g")
      .attr("class", "axis")
    .attr("transform", "translate(0,"+0+")")       // New line
      .call(d3.axisTop(x).ticks(null, "s"))          //  .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("y", - 15)   
      .attr("font-size", 12)                    //     .attr("y", 2)
      .attr("x", x(x.ticks().pop()) -8)            //     .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")                   //     .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Index Scale")
    .attr("transform", "translate("+ (-width) +",-10)");    // Newline


  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
    //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   .attr("transform", function(d, i) { return "translate(0," + (400 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width -10)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

});

};


function update(cssselector) {
  $(".barchart").hide();
  $(cssselector).show();
}


drawBar("../datasets/50_4index.csv", "#bar1", ["#D13C4B", "#FCAC64", "#FEDD8D", "#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);
drawBar("../datasets/osi.csv", "#bar2", ["#FCAC64", "#FEDD8D", "#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);
drawBar("../datasets/tii.csv", "#bar3", [ "#FEDD8D", "#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);
drawBar("../datasets/hci.csv", "#bar4", ["#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);

update("#bar1")


