queue()
    .defer(d3.json, "/data")
    .await(makeGraph);
        
function makeGraph(error, pokemon){
    var ndx = crossfilter(pokemon);

    pokemon.forEach(function(d){
        d.Generation = parseInt(d.Generation);
        d.Total = parseInt(d.Total);
        d.HP = parseInt(d.HP);
        d.Attack = parseInt(d.Attack);
        d.Defense = parseInt(d.Defense);
        d.SpAtt = parseInt(d.SpAtt);
        d.SpDef= parseInt(d.SpDef);
        d.Speed = parseInt(d.Speed);
        
        });
    
    var m = ndx.dimension(dc.pluck("Type1"));
    var n = m.group().reduceCount();
    drawBarChart("#chart01", m, n, "x", "y");
    
    var q = ndx.dimension(dc.pluck("Type2"));
    var w = q.group().reduceCount();
    drawBarChart("#chart02", q, w, "x", "y");
    
    var genDim = ndx.dimension(dc.pluck("Generation"));
    var genGroup = genDim.group().reduceCount();
    
    drawGenChart("#genPie", genDim, genGroup, "jelly");
    
    
    var leg_dim = ndx.dimension(dc.pluck("Legendary"));
    var leg_group = leg_dim.group();
    dc.selectMenu("#selectlegend")
        .dimension(leg_dim)
        .group(leg_group);
    
    // var meg_dim = ndx.dimension(dc.pluck("Generation"));
    // var meg_group = meg_dim.group().reduce(
    //     function (p, v){
    //         p.total++;
    //         if(v.Generation == "9"){
    //             p.count++;
    //     }
      
    //     return p;
        
    // },
    
    // function (p, v){
    //     p.total--;
    //     if (p.total>0){
    //         if(v.Generation == "9"){
    //         p.count--;
            
    //         }
    //     }
        
    //     else {
    //         p.count = 0;
            
    //     }
    //     return p;
        
    // },
    // function (){
    //     return { count : 0, total : 0};
            
        
    // });
    // dc.selectMenu("#selectmega")
    //     .dimension(meg_group)
    //     .group(meg_group);
    
    
    // var totalDim = ndx.dimension(dc.pluck("Total"));
    // var dimGroup = totalDim.group();
    scatterServiceStats(ndx, "Total", "#chart04");
    // scatterPlotGenStat("#chart03", 1, 800, totalDim, dimGroup);
    

    
    // dc.numberDisplay("#otherNumber")
    //     .formatNumber(d3.format(".2%"))
    //     .valueAccessor(function (d) {
    //         return d.percent;
    //     })
    //     .group(allCount);
    
    
    
    
    ///                                                       If you need to change the typeOf(data)                                                       /// 
    
    
    
    dc.renderAll();
    
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
        .width(750)
        .height(400)
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

// function scatterPlotGenStat(ele, minExperience, maxExperience, statTotal, highestStat){
//     dc.scatterPlot(ele)
//         .width(800)
//         .height(400)
//         .x(d3.scale.linear().domain([minExperience,maxExperience]))
//         .brushOn(true)
//         .symbolSize(8)
//         .clipPadding(10)
//         .yAxisLabel("Salary")
//         .xAxisLabel("Years Of Service")
//         .title(function (d) {
//             return d.key[2] + " earned " + d.key[1];
//         })
//         // .colorAccessor(function (d) {
//         //     return d.key[3];
//         // })
//         // .colors(genderColors)
//         .dimension(statTotal)
//         .group(highestStat)
//         .margins({top: 10, right: 50, bottom: 75, left: 75});
        
// }
function scatterServiceStats(ndx, what, ele) {
    var genColors = d3.scale.ordinal()
        .domain(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
        .range(["red", "blue", "green", "yellow", "pink", "purple", "brown", "orange", "black"]);
    var eDim = ndx.dimension(dc.pluck(what));
    var totalDim = ndx.dimension(function(d){
        
        let best = Math.max(d.HP, d.Attack, d.Defense, d.SpAtk, d.SpDef, d.Speed);
        // let best = Math.max(d.HP, d.Attack, d.Defense, d.SpAtt, d.SpDef, d.Speed);
        return [d.Total, best, d.Name, d.Generation];
    });
        
    //     return [d.Total, function(d){
    //         if (d.HP > d.Attack && d.HP > d.Defense && d.HP > d.SpAtk && d.HP > d.SpDef && d.HP > d.Speed){
    //             return d.HP;
    //         }
    //         else if (d.Attack > d.Defense && d.Attack > d.SpAtk && d.Attack > d.SpDef && d.Attack > d.Speed){
    //             return d.Attack;
    //         }
    //         else if (d.Defense > d.SpAtk && d.Defense > d.SpDef && d.Defense > d.Speed){
    //             return d.Defense;
    //         }
    //         else if (d.SpAtk > d.SpDef && d.SpAtk > d.Speed){
    //             return d.SpAtk;
    //         }
    //         else if (d.SpDef > d.Speed){
    //             return d.SpDef;
    //         }
    //         else{
    //             return d.Speed;
    //         }
    //     }, d.Name, d.Generation];
    // });
    var highestStatGroup = totalDim.group();
    console.log(highestStatGroup.all());
    var minExperience = eDim.bottom(1)[0].Total;
    var maxExperience = (eDim.top(1)[0].Total + 50);

    dc.scatterPlot(ele)
        .width(800)
        .height(800)
        .x(d3.scale.linear().domain([minExperience,maxExperience]))
        .brushOn(true)
        .symbolSize(8)
        .clipPadding(5)
        .yAxisLabel("Highest Stats")
        .xAxisLabel("Total Stats")
        .title(function (d) {
            return d.key[2] + " at " + d.key[0];
        })
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(genColors)
        .dimension(totalDim)
        .group(highestStatGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
        
}

