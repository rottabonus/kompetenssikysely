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
    var kusilistAvg = [];
    var kusilistNam = [];
    kusilistAvg = this.props.answers.map((a) => a.value);
    kusilistNam = this.props.answers.map((a) => a.answer);
    var twoDlist = [];
    for (var i = 0; i < kusilistAvg.length && kusilistNam.length; i++){
    } 
        twoDlist[i] = [kusilistNam[i], [kusilistAvg[i]]];
    /*joku kikka jolla saa profAveragen menemää samaan järkkään ton twoDlistin kanssa */
    var profKusivalue = [];
    var profKusinam = [];
    profKusivalue = this.props.profAverages.values.map(a => a);
    profKusinam = this.props.profAverages.answers.map(a => a);
    var kusiDlist = [];
    for (var i = 0; i < profKusivalue.length && profKusinam.lenght; i++){
        kusiDlist[i] = [profKusinam[i], [profKusivalue[i]]];
    }
    /*vertailla näitä kahta 2dlarraytä toisiinsa ja pyörittää niin kauan että osuvat kohilleen [0] arvoilta*/
    

    console.log(kusilistAvg, kusilistNam, twoDlist);
    var data = {labels: twoDlist.map((a) => a).sort((a, b) => a[1] - b[1]).reverse(), //tähän kyssärit db:stä
    datasets: [{
            "label": "Minun Kompetenssini",
            "yAxisID": "A",
            "backgroundColor": "rgba(0, 159, 227, 0.7)",
            "borderColor": "rgba(53,81,103,.4)",
            "data": this.props.answers.map((a) => a.value).sort((a, b) => a - b).reverse(), //tähän käyttäjän vastaukset db:stä
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
