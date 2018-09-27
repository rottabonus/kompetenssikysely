import React, { Component } from 'react';

import Chart from 'chart.js';

class BarChart extends Component {

    constructor(props){
        super(props);
        this.state={
            data: []
        };
    }

    HandleAnswers = () => {
        const answerNames = this.props.answers.map((a) => a.answer);
        console.log(answerNames);
        return answerNames;
    }

    HandleValues = () => {
        const answerValues = this.props.answers.map((a) => a.value);
        console.log(answerValues);
        return answerValues;
    }


    componentDidUpdate(data){
        if(this.props.calculated){
            console.log("987" + this.props.professionAnswers);
    var data = {labels: this.HandleAnswers(), //tähän kyssärit db:stä
    datasets: [{
            "label": "Minun Kompetenssini",
            "yAxisID": "A",
            "backgroundColor": "rgba(53,81,103,1)",
            "borderColor": "rgba(53,81,103,.4)",
            "data": this.HandleValues(), //tähän käyttäjän vastaukset db:stä
        },{
            "label": "Kompetenssi keskiarvo",
            "yAxisID": "A",
            "backgroundColor": "rgba(255,153,0,1)",
            "borderColor": "rgba(255,153,0,.4)",
            "data": this.props.professionAnswers, //tähän keskiarvo db:stä, tietty sama amatiryhma kun vastaajalla
         }]
    }
    var options = {
        scales: {
          yAxes: [{
            id: 'A',
            position: 'left',
            ticks: {
                beginAtZero: true,
            },
          }],
          xAxes: [{
              ticks: {
                  beginAtZero: true,
              }
          }]
        }
      };
      const ctx = document.getElementById("myChart");
       const myChart = new Chart(ctx, {type: "horizontalBar",data:data, options:options});
    }
        }
        

    render() {
    return (
      <div>
       <canvas id="myChart" width="500" height="300"></canvas>
      </div>
    );
  }
}

export default BarChart;