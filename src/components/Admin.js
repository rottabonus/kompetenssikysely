import React, { Component } from 'react';
import fire from '../fire';
import topicService from '../services/topics';
import axios from 'axios'

class test extends Component {
    constructor(props){
        super(props)
        this.state = {
            topics : [],
            newProf : "",
            optionValues: "",
        }
    }

 async componentDidMount() {
     var topics;
    this.setState({topics : await topicService.getAll()});
    console.log(topics);
    console.log(JSON.stringify(this.state.topics));
}   

uusAmmatti = (event) => {
    this.setState({newProf : event.target.value})
}

newProfToDB = (event) => {
   var i = this.state.topics.length + 1;
   console.log("tpoics pituus" + i)
   var topicnmbr = "T0"+i; 
   var jsondata = {
            category : "ammatti",
            ST01 : "",
            text : this.state.newProf
    }
    console.log("Kohti kantaa ja sen yli..." + jsondata);
    axios.put('https://surveydev-740fb.firebaseio.com/topics/'+topicnmbr+".json", jsondata); 
    console.log(JSON.stringify(this.state.topics));
}
deleteProf = (event) => {
    const index = event.target.id;
   var delArray = this.state.topics.filter(t => t.text !== index);
    var topicnmbr = "T0"+index;
    var tobeDEL = JSON.stringify(delArray); 
    console.log("To be DELETED: " + JSON.stringify(delArray));
    axios.put('https://surveydev-740fb.firebaseio.com/topics.json', tobeDEL);
}

showQuestions = (event) => {
    const index = event.target.id;
    var profArray = this.state.topics.filter(t => t.text == index);
    var optionValues = Object.values(profArray).map(option => option).filter(o => typeof o === 'object')
    console.log(optionValues);
    
}

    render() {
        return (
            <div className="surveyContainer">

                <h1>ASIANTUNTIJANTYÖKALU KOMPETENSSITYÖKALUN-AdminTyökalu</h1>
            <div>
                <form className="adminForm">
                    <label>Ammatti ryhmä: </label> 
                    <input type="text" id="ammattiRyhma" value={this.state.newProf} onChange={this.uusAmmatti}></input>

                   
                </form>
                <button onClick={this.newProfToDB}>Lähetä</button>
            </div>
            <div>
                <table>
                    <tbody>
                {this.state.topics.filter(t => t.text !== 'yleinen').map((topic, i) => (
                <tr key={i} >
                <td>{topic.text}</td>
                <td>{i}</td>
                <td>
                    <button id={topic.text} onClick={this.deleteProf}>Delete</button>
                </td>
                <td>
                    <button id={topic.text} onClick={this.showQuestions}>Edit</button>
                </td>
                </tr>
                ))}
                    </tbody>
                </table>

                <p>Kyssärit: </p>
              {this.optionValues != null &&
                <fieldset>
                    {this.optionValues.map((option, i) =>
                      <label key={i}>
                      {option.text}
                      </label>
                      )}
                </fieldset>}
            </div>
            
            </div>
        )
    }
}

export default test;
