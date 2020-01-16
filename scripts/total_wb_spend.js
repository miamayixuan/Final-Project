// set the dimensions and margins of the graph
var margin = {top: 50, right: 100, bottom: 30, left: 100},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page

//Read the data
d3.csv("../total_wb_spend.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%d/%m/%Y")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisRight(y))
      .attr("transform", "translate(" + width + ",0)").call(d3.axisRight(y))

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
// text label for left y-axis
    svg.append("text")
      .attr("x", (0))             
      .attr("y", (0 - margin.top/4))
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(0)")  
      .style("font-size", "10px")   
      .text("Annual spend (millions of $)");

// text label for right y-axis
    svg.append("text")
      .attr("x", (width - 30))             
      .attr("y", (0 - margin.top/4))
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(0)")  
      .style("font-size", "10px")   
      .text("Cumulative spend (billions of $)");


    
})
    