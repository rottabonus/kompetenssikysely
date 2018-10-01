import React, { Component } from 'react';

import Chart from 'chart.js';

class BarChart extends Component {

    constructor(props){
        super(props);
        this.state={
            data: []
        };
    }

    componentDidMount(data){
    var data = {labels: this.props.profAverages.answers.map((a) => a), //tähän kyssärit db:stä
    datasets: [{
            "label": "Minun Kompetenssini",
            "yAxisID": "A",
            "backgroundColor": "rgba(0, 159, 227, 0.7)",
            "borderColor": "rgba(53,81,103,.4)",
            "data": this.props.answers.map((a) => a.value), //tähän käyttäjän vastaukset db:stä
            "borderWidth": "3",
                "borderColor": "rgba(0, 159, 227, 1.0)",
        },{
            "label": "Kompetenssi keskiarvo",
            "yAxisID": "A",
            "backgroundColor": "rgba(249, 176, 0, 0.7)",
                "borderColor": "rgba(255,153,0,.4)",
            "data": this.props.profAverages.values.map(a => a), //tähän keskiarvo db:stä, tietty sama amatiryhma kun vastaajalla
            "borderWidth": "3",
                "borderColor": "rgba(249, 176, 0, 1.0)",
         }]
    }
    // Chartin asetukset
        var options = {
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
                    stepSize: 0.5,
                }
            }]
            },
        };
      const ctx = document.getElementById("myChart");
       const myChart = new Chart(ctx, {type: "horizontalBar",data:data, options:options});
    }


    render() {
    return (
      <div>
       <canvas id="myChart" width="300" height="300"></canvas>
      </div>
    );
  }
}

export default BarChart;
