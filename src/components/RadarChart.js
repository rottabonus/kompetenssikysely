import React, { Component } from 'react';
import Chart from 'chart.js';
import jatka from '../img/PNG/jatka.png';


class ChartTest extends Component {
  
    constructor(props){
        super(props);
        this.state={
            data : [],
        };
    }

    componentDidMount(){

        var answersWithoutGeneralQuestions = this.props.answers.filter((answer) => answer.topic != "Yleisettiedot");
        var problemSolving = [];
        var technicalComp = [];
        var careerControl = [];
        var interaction = [];
        answersWithoutGeneralQuestions.forEach(function(element) {
            if (element.topic === "Itsensä johtaminen ja ongelmanratkaisu") {
                problemSolving.push(element);
            } else if (element.topic === "Yleinen digiosaaminen") {
                technicalComp.push(element);
            } else if (element.topic === "Uranhallinta") {
                careerControl.push(element);
            } else if (element.topic === "Vuorovaikutus") {
                interaction.push(element);
            }
        })
        var labelArray = [problemSolving[0].topic, technicalComp[0].topic, careerControl[0].topic, interaction[0].topic];
        var answerArray = [problemSolving, technicalComp, careerControl, interaction];
        var averageArray = [];
        answerArray.forEach(function(element) {
            var answerValues = element.map((a) => parseInt(a.value));
            var sum = answerValues.reduce((previous, current) => current + previous);
            var avg = (sum / answerValues.length).toFixed(2);
            averageArray.push(avg);
        })

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'radar', 
            data : {
                labels: labelArray,
                datasets: [{
                    label: "Minun kompetenssini",
                    data: averageArray, 
                backgroundColor: 'rgba(110, 42, 91, 0.7)',
                },]
            },
            options : {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 5
                    }
                },
                
            }
        });
        }
  
    render() {
    return (
      <div>
        <canvas id="myChart" width="100" height="60"></canvas> 
        <img src={jatka} id="cursor-hover" alt="Jatka" onClick={this.props.moveForward} />

      </div>
    );
  }
}

export default ChartTest;