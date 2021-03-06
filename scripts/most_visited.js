// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 100, left: 130},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#us_sites")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("datasets/all_domains_output.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 200000000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.name; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.value); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#FEDD8D")

  svg.append("text")
    .attr("x", (width-20))             
    .attr("y", (height + margin.bottom/1.5))
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(0)")  
    .style("font-size", "10px")   
    .text("Number of visits")

})