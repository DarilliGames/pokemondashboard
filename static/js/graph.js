console.log("Surprise Motherfucker");
queue()
    .defer(d3.csv, "data/Salaries.csv")
    .await(makeGraph);
        
function makeGraph(error, salaryData){
    var ndx = crossfilter(salaryData);
    
    
    
    salaryData.forEach(function(d){
        d.salary = Number(d.salary);
        d.yrs_service = Number(d.yrs_service);
    
    });
    
    // doing as function calls
        
    // showAverageFunction(ndx);
    // showPercentSexProf(ndx, "Female", "#percWomanProf");
    // showPercentSexProf(ndx, "Male",  "#percManProf");
    // scatterServiceSalary(ndx, "yrs_service", "#service-salary");
    // scatterPHDSalary(ndx, "yrs_since_phd", "#phd-salary");
    show_rank_distrib(ndx);
    
    // Or back doing it lazy
    
    
    var gender_dim = ndx.dimension(dc.pluck("sex"));
    var rank_dim = ndx.dimension(dc.pluck("rank"));
    var discipline_dim = ndx.dimension(dc.pluck("discipline"));
    
    
    var count_sex = gender_dim.group().reduceCount();
    var count_rank = rank_dim.group().reduceCount();
    var discipline_group = discipline_dim.group();
    
    dc.selectMenu("#select-discipline")
        .dimension(discipline_dim)
        .group(discipline_group);
    
   
    
    var average_salary = gender_dim.group().reduce(add_item, remove_item, init);
    
    
    function add_item(p, v){
        p.count++;
        p.total += Number(v.salary);
        p.average = p.total / p.count;
        return p;
        
    }
    
    function remove_item(p, v){
        if (p.count>0){
            p.count--;
            p.total -= Number(v.salary);
            p.average = p.total / p.count;
        }
        else {
            p.total = 0;
            p.average = 0;
        }
        return p;
        
    }
    function init(){
        return { count : 0, total : 0, average : 0 };
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
    
    
    drawBarChart("#chart01", gender_dim, count_sex, "X", "Y");
    drawBarChart("#chart02", rank_dim, count_rank, "X", "Y");
    // drawBarChart("#chart03", gender_dim, average_salary, "X", "Y");
    drawBarChart("#chart04", rank_dim, count_rank, "X", "Y");
    
    
    
    dc.renderAll();


}



// //////////////////////////
function showPercentSexProf(ndx, gender, element){
    
    let all_Records = ndx.groupAll();
    
    let genderProfs = all_Records.reduce(add_items, remove_items, inits);
    
    function add_items(p,v) {
        if (v.sex == gender){
            p.total_byGender++;
            if (v.rank == "Prof"){
                p.are_professors ++;
            }
            p.percent = (p.are_professors / p.total_byGender)*100;
        }
        return p;

    }
    function remove_items(p,v){
        if (v.sex == gender){
            p.total_byGender--;
            if (v.rank == "Prof"){
                p.are_professors--;
            }
            if(p.total_byGender != 0){
                p.percent = (p.are_professors / p.total_byGender)*100;
            }
        }
        return p;
    }
    
    function inits(){
        return { total_byGender : 0, are_professors : 0, percent : 0 };
    }
    
    dc.numberDisplay(element)
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function (d) {
            return d.percent;
        })
        .group(genderProfs);
    

    
}

// /////////////////////////////////////////











function showAverageFunction(ndx){
    let gender_dim = ndx.dimension(dc.pluck("sex"));
    let salary_by_gender = gender_dim.group().reduce(add_item, remove_item, init);
    
    dc.barChart("#chart03")
        .width(900)
        .height(450)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(gender_dim)
        .group(salary_by_gender)
        .valueAccessor(function(p){
                return p.value.average.toFixed(2);})
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("x")
        .yAxisLabel("y")
        .yAxis().ticks(4);
    
    
    
    function add_item(p, v){
        p.count++;
        p.total += v.salary;
        p.average = p.total / p.count;
        return p;
        
    }
    
    function remove_item(p, v){
        p.count--;
        if (p.count>0){
            p.total -= v.salary;
            p.average = p.total / p.count;
        }
        
        else {
            p.total = 0;
            p.average = 0;
        }
        return p;
        
    }
    function init(){
        return { count : 0, total : 0, average : 0 };
    }

}

function scatterServiceSalary(ndx, what, ele) {
    var genderColors = d3.scale.ordinal()
        .domain(["Female", "Male"])
        .range(["pink", "blue"]);

    var eDim = ndx.dimension(dc.pluck(what));
    var experienceDim = ndx.dimension(function(d){
        return [d.yrs_service, d.salary, d.rank, d.sex];
    });
    var experienceSalaryGroup = experienceDim.group();

    var minExperience = eDim.bottom(1)[0].yrs_service;
    var maxExperience = eDim.top(1)[0].yrs_service;

    dc.scatterPlot(ele)
        .width(800)
        .height(400)
        .x(d3.scale.linear().domain([minExperience,maxExperience]))
        .brushOn(true)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Salary")
        .xAxisLabel("Years Of Service")
        .title(function (d) {
            return d.key[2] + " earned " + d.key[1];
        })
        .colorAccessor(function (d) {
            return d.key[3];
        })
        .colors(genderColors)
        .dimension(experienceDim)
        .group(experienceSalaryGroup)
        .margins({top: 10, right: 50, bottom: 75, left: 75});
        
}
    
// function scatterPHDSalary(ndx, what, ele) {
//     var genderColors = d3.scale.ordinal()
//         .domain(["Female", "Male"])
//         .range(["pink", "blue"]);

//     var eDim = ndx.dimension(dc.pluck(what));
//     var experienceDim = ndx.dimension(function(d){
//         return [d.yrs_since_phd, d.salary, d.rank, d.sex];
//     });
//     var experienceSalaryGroup = experienceDim.group();

//     var minExperience = eDim.bottom(1)[0].yrs_since_phd;
//     var maxExperience = eDim.top(1)[0].yrs_since_phd;

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
//         .colorAccessor(function (d) {
//             return d.key[3];
//         })
//         .colors(genderColors)
//         .dimension(experienceDim)
//         .group(experienceSalaryGroup)
//         .margins({top: 10, right: 50, bottom: 75, left: 75});
// }


function get_percent_rank_by_gender(ndx, rank){
    let gender_dim = ndx.dimension(dc.pluck("sex"));
    
    return gender_dim.group().reduce(
        function (p, v){
            p.total++;
            if(v.rank == rank){
                p.count++;
        }
        p.percent = p.count / p.total;
        return p;
        
    },
    
    function (p, v){
        p.total--;
        if (p.total>0){
            if(v.rank == rank){
            p.count--;
            p.percent = p.count / p.total;
            }
        }
        
        else {
            p.count = 0;
            p.percent = 0;
        }
        return p;
        
    },
    function (){
        return { count : 0, total : 0, percent : 0 };
    });
  
}

function show_rank_distrib(ndx){
    
    let gender_dim = ndx.dimension(dc.pluck("sex"));
    let percent_prof_by_gender = get_percent_rank_by_gender(ndx, "Prof");
    
    let percent_assoc_prof_by_gender = get_percent_rank_by_gender(ndx, "AssocProf");
    let percent_tools_prof_by_gender = get_percent_rank_by_gender(ndx, "AsstProf");
    dc.barChart("#chart99")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(gender_dim)
        .group(percent_prof_by_gender)
        .stack(percent_assoc_prof_by_gender)
        .stack(percent_tools_prof_by_gender)
        .valueAccessor(function(d){
                return d.value.percent;})
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("x")
        .yAxisLabel("y")
        .yAxis().ticks(4);
}
