import React, { Component } from 'react';
import jatka from '../img/PNG/jatka.png';
import Chart from 'chart.js';

class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state={
            canvases : [],
        };
    }

    async componentDidMount(){
        let chartConfig = [];
        let canvases = [];
        let answers = this.props.answers;
        let profAverages = this.props.profAverages;
        let selectedTopics = this.props.selectedTopics;
        selectedTopics.forEach(function(topic, y) {
            var onlyProfessionAnswers = answers.filter((answer) => answer.topic === topic.topic)
            var myDataWithAnswers = onlyProfessionAnswers.map((a) => a).sort((a, b) => a.value - b.value).reverse();
            var myData = myDataWithAnswers.map((a) => a.value);
            var answerKeys = myDataWithAnswers.map((a) => a.answer);
            var items = [];
            var answerItems = profAverages.answers;
            var valueItems = profAverages.values;
            console.log("val+answ" + valueItems[0] + answerItems[0]);
            for (var i = 0; i < answerItems.length; i++) {
                items[i] = [answerItems[i], [valueItems[i]]];
            }

            var result = [];
            answerKeys.forEach(function(key) {
                var found = false;
                items = items.filter(function(item) {
                    if (!found && item[0] === key) {
                        found = true;
                        console.log("222" + item);
                        result.push(item);
                        return false;
                    } else {
                        return true;
                    }
                })
            })
            var resultMultiD = result.map((a) => a[1]);
            var avgData = resultMultiD.flat();
            console.log("my" + myData);
            console.log("avg" + avgData);
            
            var data = {labels: answerKeys, //tähän kyssärit db:stä
        datasets: [{
                "label": "Minun Kompetenssini",
                "yAxisID": "A",
                "backgroundColor": "rgba(0, 159, 227, 0.2)",
                "data": myData, //tähän käyttäjän vastaukset db:stä
                "borderWidth": "2",
                "borderColor": "rgba(0, 159, 227, 1.0)",
            }, {
                "label": "Kompetenssi keskiarvo",
                "yAxisID": "A",
                "backgroundColor": "rgba(249, 176, 0, 0.6)",
                "data": avgData, //tähän keskiarvo db:stä, tietty sama amatiryhma kun vastaajalla
                "borderWidth": "3",
                "borderColor": "rgba(255, 80, 0, 1.0)",
            }]
        }
        // Chartin asetukset
        var options = {
            title: {
                display: true,
                text: topic.topic,
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
        let chartName = "myChart" + y;
        console.log(chartName);
        chartConfig.push([chartName, data, options]);
        canvases = [...canvases, chartName];
        }) // End of forEach loop for multi-charts

        await this.setState({canvases : canvases});
        console.log("canvases:" + this.state.canvases);
        console.log(chartConfig[0]);
        canvases.forEach(function(canvas, index) {
            const myChart = new Chart(canvas, {type: "horizontalBar",data:chartConfig[index][1], options:chartConfig[index][2]});
        })
    }

    render() {
    return (
    <div className="surveyContainer">
      <div className="barChartContainer">
      {this.state.canvases.map((canvas) =>
            <canvas class="barCanvas" id={canvas} key={canvas}></canvas>)}
        { this.props.surveyState !== 6
        ? <div>
        <button className="buttonBackward" onClick={(e) => this.props.move(e, -1)}>Takaisin</button> 
        <button className="buttonForward" onClick={(e) => this.props.move(e, 1)}>Jatka</button>
        </div> 
        : null

                    }

                </div>
            </div>
        );
    }
}

export default BarChart;