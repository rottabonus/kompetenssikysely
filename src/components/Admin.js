import React, { Component } from 'react';
import fire from '../fire';
import topicService from '../services/topics';
import axios from 'axios'
import topics from '../services/topics';
import Topic from './Topic';
import AdminList from './AdminList';
import { func } from 'prop-types';

class test extends Component {
    constructor(props){
        super(props)
        this.state = {
            topics : [],
            newProf : "",
            profArray : "",
            questions: [],
            option1: "",
            option3: "",
            option5: "",
            text: "",
            quesnmb: "",
            topicnmb: "",
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
editQuestions = (event) => {
   //alkuperänen plääni tehä tällä kerralla kaikki toi mitä tapahtuu changeValuessa,
   //ei saanu datasettiä skulaa koska ylläri ku on inputissa kiinni ni ei oikee liiku enempää dataa esim kaikista kerral
}
changeValue = (event) => {
    console.log(event.target.dataset.bame);
    var vaihtoehto = event.target.dataset.options.split(":");
    var splitText = event.target.dataset.bame.split(":")
    var subsubtopic = event.target.dataset.iteration;
    this.setState({quesnmb: parseInt(subsubtopic) + 1 });
    console.log(this.state.quesnmb);
    this.setState({text: splitText[0]})
    if (vaihtoehto[1] == 0){
    this.setState({option1 : vaihtoehto})
    }
    if (vaihtoehto[1] == 1){
        this.setState({option3 : vaihtoehto})
    }
    if (vaihtoehto[1] == 2){
        this.setState({option5 : vaihtoehto})
    }
}
showQuestions = (event) => {
    var key = [];
    const index = event.target.id;
   var profArray = this.state.topics.filter(t => t.text == index);
   var questions = Object.values(profArray[0].ST01).map(option => option).filter(o => typeof o === 'object')
   console.log(profArray);
   if(this.state.questions.length > 0){
     this.setState({ questions: []})
   } else {
       this.setState({ questions })
   }
   fire.database().ref('/topics/').orderByChild('text').equalTo(index).on('value', function(snapshot, key) {
       console.log("Mitä löytyy: "+ JSON.stringify(snapshot.val()));
        var key =  Object.keys(snapshot.val()); //haetaan key firestä
        console.log(key);
        test(key);
       
   })

   test = (key) => {
    this.setState({topicnmb : key[0]});
        console.log("TopicNumero: " + this.state.topicnmb) 
   }
   console.log("TestFunk says: " + key)
/* tää rikkoo nyt for some reason, joku taas pitää vissiin saada toimimaan asyncillä orsutin?
   this.setState({topicnmb : this.key[0]});
   console.log("TopicNumero: " + this.state.topicnmb)
*/
this.setState({topicnmb : key[0]});
console.log("TopicNumero: " + this.state.topicnmb)
}
inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };

newQuestiontoDB = (event) => {
    var topicnmb = this.state.topicnmb;
    var quesnmb = this.state.quesnmb; //tälle tehdä käsittelyä kattoo paljonko näitä on vai onko yhtään ja luoda SST[numero] tyylinen parsetus
    var option1 = this.state.option1;
    var option3 = this.state.option3;
    var option5 = this.state.option5;
    var text = this.state.text;
    var tobeUpdated = {
        option1 : {"text": option1, "value": 1},
        option3 : {"text": option3, "value": 3},
        option5 : {"text": option5, "value": 5},
        text : text,
        type : "radio"
    }

    axios.patch('https://surveydev-740fb.firebaseio.com/topics/'+topicnmb+'/ST01/'+quesnmb+'/.json', tobeUpdated)

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
            <div>{/*
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
                </table>*/}

                <p>Kyssärit: </p>
                <table>
                   <AdminList topics={this.state.topics} changeValue={this.changeValue} click={this.click} saveChanges={this.saveChanges}
                   showQuestions={this.showQuestions} questions={this.state.questions} deleteProf={this.deleteProf}
                   editQuestions={this.editQuestions}/>
               </table>
               <form>
                   <label>Kysymys: </label> <input type="text" name="text" onChange={this.inputChanged} value={this.state.text} placeholder="Tähän siis kyssäri"></input> <br></br>
                   <label>Vastausvaihtoehdot: </label> 
                   <input type="text" name="option1" onChange={this.inputChanged} value={this.state.option1} placeholder="Tähän vaihtoehto 1."></input>
                   <input type="text" name="option3" onChange={this.inputChanged} value={this.state.option3} placeholder="Tähän vaihtoehto 3."></input>
                   <input type="text" name="option5" onChange={this.inputChanged} value={this.state.option5} placeholder="Tähän vaihtoehto 5."></input> 
               </form>
               <button onClick={this.newQuestiontoDB}>Lähetä Kyssäri</button>
            </div>
            
            </div>
        )
    }
}

export default test;
