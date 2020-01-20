function drawBar(datafile, cssselector, colorrange) {

// position the svg 
var svg = d3.select(cssselector),
    margin = {top: 50, right: 20, bottom: 0, left: 150},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()      
    .rangeRound([0, height])  
    .paddingInner(0.1)
    .align(0.1);

var x = d3.scaleLinear()    
    .rangeRound([0, width]);  

var z = d3.scaleOrdinal()
    .range(colorrange);

// read data from datafiles
d3.csv(datafile, function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;
  var keys = data.columns.slice(1);

  data.sort(function(a, b) { return b.total - a.total; });
  y.domain(data.map(function(d) { return d.State; }));          
  x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();  
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y(d.data.State); })     
      .attr("x", function(d) { return x(d[0]); })         
      .attr("width", function(d) { return x(d[1]) - x(d[0]); }) 
      .attr("height", y.bandwidth());               

// y axis
  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)")           
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("font-size", 14);                  

//x axis 
  g.append("g")
      .attr("class", "axis")
    .attr("transform", "translate(0,"+0+")")       
      .call(d3.axisTop(x).ticks(null, "s"))          
    .append("text")
      .attr("y", - 15)   
      .attr("font-size", 12)                    
      .attr("x", x(x.ticks().pop()) -8)            
      .attr("dy", "0.32em")                   
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Index Scale")
    .attr("transform", "translate("+ (-width) +",-10)");    

// legend position, text, etc.
  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
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

// create function to assist the buttons to show and hide graphs
function update(cssselector) {
  $(".barchart").hide();
  $(cssselector).show();
}

//call function to create four graphs 
drawBar("datasets/50_4index.csv", "#bar1", ["#D13C4B", "#FCAC64", "#FEDD8D", "#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);
drawBar("datasets/osi.csv", "#bar2", ["#FCAC64", "#FEDD8D", "#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);
drawBar("datasets/tii.csv", "#bar3", [ "#FEDD8D", "#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);
drawBar("datasets/hci.csv", "#bar4", ["#FCF8B0", "#E1F4A1", "#4289B5", "#69BDA9", "#A9DCA1"]);

//set initial graph
update("#bar1")


