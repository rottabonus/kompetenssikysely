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
        }
    }
    uusAmmatti = (event) => {
        this.setState({newProf : event.target.value})
    }
 async componentDidMount() {
     var topics;
    this.setState({topics : await topicService.getAll()});
    console.log(topics);
    console.log(JSON.stringify(this.state.topics));
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
//nyt delete toimii ihan mitensattuu tolla indexillä, eli filsuttaa topic.text avulla poistettu pois ja puskea jäljellejääneet topicsit kantaan
    render() {
        return (
            <div className="surveyContainer">

                <h1>ASIANTUNTIJAN KOMPETENSSITYÖKALU-adminFuker</h1>
                    <ul>
                    <li>Tänne siis admin asiaa</li>
                    <li>Tämä endpoint muuttaa "/admin", joka tarjoo login pagen</li>
                    <li>Login menee authUI setillä ehkä....?</li>
                    <li>SignIn authUI tänne tai fire.js filuun?</li>
                    <li>Sit joku formitus.......</li>
                    <li>Jos tässä vaan vois lisätä uuden amatin/poistaa amatin ja esim. klikkaamalla päästä muokkaamaan kyseisen amatin kysymyksiä ja lisäämään uusia?</li>
                    </ul>
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
                </tr>
                ))}
                    </tbody>
                </table>
            </div>
            
            </div>
        )
    }
}

export default test;
