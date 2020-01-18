/* The World Bank data set was used to create this list of dictionaries. The data was cleaned
   using Stata and two columns were generated - one column with the text and the second column 
   with the number of times the text appears in the data set. 
*/
    var freq_list = [{"text": "Agriculture",  "size": 20}, {"text": "Digital Development", "size": 31}, {"text": "Education", "size": 229}, {"text": "Finance, Competitiveness, and Innovation", "size": 38},  {"text": "Governance", "size": 362}, {"text": "Health, Nutrition & Population", "size": 162}, {"text": "Macroeconomics, Trade and Investment", "size": 19}, {"text": "Poverty", "size": 18}, {"text": "Social Protection & Labor", "size": 112}, {"text": "Social, Urban, Rural and Resilience", "size": 40}, {"text": "Transport", "size": 118}]


    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            /*.range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]); */
            .range([0, 100]);

    d3.layout.cloud().size([2300, 800])
            .words(freq_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select("#cloud").append("svg")
                .attr("width", 9350)
                .attr("height", 450)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(80,300)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }

















