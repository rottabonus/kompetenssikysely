import React, { Component } from 'react';

import Chart from 'chart.js';

class BarChart extends Component {

    constructor(props){
        super(props);
        this.state={
        };
    }

    componentDidMount(){

        var myDataWithAnswers = this.props.answers.map((a) => a).sort((a, b) => a.value - b.value).reverse();
        var myData = myDataWithAnswers.map((a) => a.value);
        var answerKeys = myDataWithAnswers.map((a) => a.answer);
        var items = [];
        var answerItems = this.props.profAverages.answers;
        var valueItems = this.props.profAverages.values;
        console.log(valueItems[0] + answerItems[0]);
        for (var i = 0; i < answerItems.length; i++) {
            items[i] = [answerItems[i], [valueItems[i]]];
        }

        //var labelArray = this.props.profAverages.answers.map((a) => a).sort((a, b) => a[1] - b[1]).reverse();
        var result = [];
        answerKeys.forEach(function(key) {
            var found = false;
            items = items.filter(function(item) {
                if (!found && item[0] == key) {
                    found = true;
                    console.log("222" + item);
                    result.push(item);
                    return false;
                } else {
                    return true;
                }
                
            })
        })
        console.log("666" + result[0] + "777" + result[1]);
        console.log("555" + result);
        var resultMultiD = result.map((a) => a[1]);
        var avgData = resultMultiD.flat();
        console.log(avgData);

        var data = {labels: answerKeys, //tähän kyssärit db:stä
        datasets: [{
                "label": "Minun Kompetenssini",
                "yAxisID": "A",
                "backgroundColor": "rgba(0, 159, 227, 0.7)",
                "data": myData, //tähän käyttäjän vastaukset db:stä
                "borderWidth": "3",
                    "borderColor": "rgba(0, 159, 227, 1.0)",
            },{
                "label": "Kompetenssi keskiarvo",
                "yAxisID": "A",
                "backgroundColor": "rgba(249, 176, 0, 0.7)",
                "data": avgData, //tähän keskiarvo db:stä, tietty sama amatiryhma kun vastaajalla
                "borderWidth": "3",
                    "borderColor": "rgba(249, 176, 0, 1.0)",
            }]
        }
    // Chartin asetukset
        var options = {
            title: {
                display: true,
                text: "Test",
            },
            scales: {
            yAxes: [{
                stacked: true,
                id: 'A',
                position: 'left',
                ticks: {
                    beginAtZero: true,
                },
                maxBarThickness: 30,
                categoryPercentage: 0.9,
                barPercentage: 0.9,
            }],
            xAxes: [{
                display: true,
                position: 'bottom',
                ticks: {
                    beginAtZero: true,
                    max: 5.0,
                    min: 0,
                    stepSize: 1.0,
                }
            },
            {
                type: 'linear',
                display: true,
                position: 'top',
                ticks: {
                    beginAtZero: true,
                    max: 5.0,
                    min: 0,
                    stepSize: 1.0,
                }
            }]
            },
        };

        // Luodaan uusi BarChart
        const ctx = document.getElementById("myChart");
        const myChart = new Chart(ctx, {type: "horizontalBar",data:data, options:options});
    }


    render() {
    return (
      <div>
       <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default BarChart;
