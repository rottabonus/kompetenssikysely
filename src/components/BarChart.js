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
            "backgroundColor": "rgba(53,81,103,0.6)",
            "borderColor": "rgba(53,81,103,.4)",
            "data": this.props.answers.map((a) => a.value), //tähän käyttäjän vastaukset db:stä
        },{
            "label": "Kompetenssi keskiarvo",
            "yAxisID": "A",
            "backgroundColor": "rgba(255,153,0.3)",
            "borderColor": "rgba(255,153,0,.4)",
            "data": this.props.profAverages.values.map(a => a), //tähän keskiarvo db:stä, tietty sama amatiryhma kun vastaajalla
         }]
    }
    var options = {
        scales: {
          yAxes: [{
            stacked: true,
            id: 'A',
            position: 'left',
            ticks: {
                beginAtZero: true,
            },
            maxBarThickness: 20,
            categoryPercentage: 1.0,
            barPercentage: 0.9,
          }],
          xAxes: [{
              ticks: {
                  beginAtZero: true,
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
