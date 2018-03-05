queue()
    .defer(d3.csv, "data/ks-projects.csv")
    .await(makeGraph);
        
function makeGraph(error, ksproject){
    var ndx = crossfilter(ksproject);

    // pokemon.forEach(function(d){
    //     d.Generation = Number(d.Generation);
    //     });
    
    var m = ndx.dimension(dc.pluck("name"));
    var n = m.group().reduceCount();
    drawBarChart("#chart01", m, n, "x", "y");
    
    var q = ndx.dimension(dc.pluck("Type2"));
    var w = q.group().reduceCount();
    drawBarChart("#chart02", q, w, "x", "y");
    
    var genDim = ndx.dimension(dc.pluck("Generation"));
    var genGroup = genDim.group().reduceCount();
    
    drawGenChart("#genPie", genDim, genGroup, "jelly");
    

    
    // dc.numberDisplay("#otherNumber")
    //     .formatNumber(d3.format(".2%"))
    //     .valueAccessor(function (d) {
    //         return d.percent;
    //     })
    //     .group(allCount);
    
    
    
    
    ///                                                       If you need to change the typeOf(data)                                                       /// 
    
    
    
    dc.renderAll();
    
    // var pVTiles =  ndx.dimension(dc.pluck("Name"));
    // var yy = pVTiles.group().reduce();

    // var pokemonTiles = [];
    // for (var c in yy) {
    //     console.log(c);
    //     var toAdd = "<div style='width: 150px; height: 150px; display: inline-block; background-color: red'>"+ "This is where the name goes" +"</div>";
    //     pokemonTiles.push(toAdd);
    // document.getElementById("what").innerHTML = pokemonTiles;
    // }
  
    
}
function drawGenChart(ele, dim, group, x){
    dc.pieChart(ele)
        .width(768)
        .height(480)
        .slicesCap(8)
        .innerRadius(10)
        .dimension(dim)
        .group(group)
        .legend(dc.legend())
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            });
        });

}

function drawBarChart(ele, dim, groups, xlabel, ylabel){
    dc.barChart(ele)
        .width(900)
        .height(450)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(groups)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel(xlabel)
        .yAxisLabel(ylabel)
        .yAxis().ticks(4);
}




