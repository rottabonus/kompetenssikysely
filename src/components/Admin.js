import React, { Component } from 'react';
import topicService from '../services/topics';
import axios from 'axios'
import topics from '../services/topics';
import Topic from './Topic';
import AdminList from './AdminList';
import fire from '../fire';
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

async componentDidMount() {
     var topics;
    this.setState({topics : await topicService.getAll()});
    console.log(topics);
    console.log(JSON.stringify(this.state.topics));

}
uusAmmatti = (event) => {
    this.setState({newProf : event.target.value})
}
newProfToDB = async(event) => {
    event.preventDefault();
   var i = this.state.topics.length + 1;
   console.log("tpoics pituus" + i)
   var topicnmbr = "T0"+i;
   var jsondata = {
            category : "ammatti",
            ST01 : "",
            text : this.state.newProf
    }
    console.log("Kohti kantaa ja sen yli..." + jsondata);
   await topicService.newTopic(jsondata, topicnmbr)
   this.setState({topics: await topicService.getAll()});
      console.log(JSON.stringify(this.state.topics));
}

deleteProf = async (event) => {
    const index = event.target.id;
    console.log(index)
    var delArray = this.state.topics.filter(t => t.text !== index);
    var topicnmbr = "T0"+index;
    var tobeDEL = JSON.stringify(delArray);
    await topicService.removeTopic(tobeDEL)
    this.setState({topics: await topicService.getAll()});
}
editQuestions = (event) => {
    console.log(event.target.dataset.options)
    console.log(event.target.dataset.topic);
    var vaihtoehto = event.target.dataset.options.split(":");
    console.log(vaihtoehto)
    console.log("Question number is: "+ this.state.quesnmb)
    this.setState({text: event.target.dataset.topic});
    if (vaihtoehto[1] == 0){
    this.setState({option1 : vaihtoehto[0]})
    }
    if (vaihtoehto[3] == 1){
        this.setState({option3 : vaihtoehto[2].substring(1)})
    }
    if (vaihtoehto[5] == 2){
        this.setState({option5 : vaihtoehto[4].substring(1)})
    }
    
    //alkuperänen plääni tehä tällä kerralla kaikki toi mitä tapahtuu changeValuessa,
    //ei saanu datasettiä skulaa koska ylläri ku on inputissa kiinni ni ei oikee liiku enempää dataa esim kaikista kerral
}

changeValue = (event) => {
    console.log(event.target.dataset.bame);
    var vaihtoehto = event.target.dataset.options.split(":");
    var splitText = event.target.dataset.bame.split(":")
    var subsubtopic = parseInt(event.target.dataset.iteration) + 1;
    if (subsubtopic < 10) {
        this.setState({quesnmb: "SST0" + parseInt(subsubtopic) });
    }
    else {
        this.setState({quesnmb: "SST" + parseInt(subsubtopic) });
    }

    console.log("Question number is: "+ this.state.quesnmb)
    this.setState({text: splitText[0]})
    if (vaihtoehto[1] == 0){
    this.setState({option1 : vaihtoehto[0]})
    }
    if (vaihtoehto[1] == 1){
        this.setState({option3 : vaihtoehto[0]})
    }
    if (vaihtoehto[1] == 2){
        this.setState({option5 : vaihtoehto[0]})
    }
}
showQuestions = (event) => {
    var key = [];
    const index = event.target.id;
   var profArray = this.state.topics.filter(t => t.text == index);
   var questions = Object.values(profArray[0].ST01).map(option => option).filter(o => typeof o === 'object')
   if (questions.length === 0 ){
       var subtopicnumber = "SST01";
       this.setState({quesnmb : subtopicnumber});
   }
        else if (questions.length > 10) {   
            var subtopicnumber = "SST" + parseInt(questions.length + 1);
            this.setState({quesnmb : subtopicnumber});
            }
            else {
                var subtopicnumber = "SST0" + parseInt(questions.length + 1);
                this.setState({quesnmb : subtopicnumber});
            }
   console.log(profArray);
   console.log(subtopicnumber);
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
}

inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };

deleteQuestion =  async (event) => {
    console.log(event.target.dataset.iteration);
    var subsubtopicIteration = event.target.dataset.iteration.split(":");
    console.log(subsubtopicIteration);
    var subsubtopic = parseInt(subsubtopicIteration[1]) + 1;
    if (subsubtopic < 10) {
       await this.setState({quesnmb: "SST0" + parseInt(subsubtopic) });
    }
    else {
       await this.setState({quesnmb: "SST" + parseInt(subsubtopic) });
    }
    console.log("Lähtee topicnumerolla: " + this.state.topicnmb + " ja SST: " + this.state.quesnmb)
    axios.delete('https://surveydev-740fb.firebaseio.com/topics/'+this.state.topicnmb+'/ST01/'+this.state.quesnmb+'/.json')
    
};

newQuestiontoDB = async (event) => {
    var topicnmb = this.state.topicnmb;
    var quesnmb = this.state.quesnmb;
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

    axios.patch('https://surveydev-740fb.firebaseio.com/topics/'+topicnmb+'/ST01/'+quesnmb+'/.json', tobeUpdated);
}

saveChanges = (item) => {
  console.log('clicked',item)
  const values = this.state.key.split(":")
  const updatedArray = this.state.questions.filter(q => q.text !== values[0])

  const editedObject = {
    text: values[0],
    option1: { text: this.state.edit0 !=="" ? this.state.edit0 :  item.option1.text, value: 1},
    option3: { text: this.state.edit1 !=="" ? this.state.edit1 : item.option3.text, value: 3},
    option5: { text: this.state.edit2 !=="" ? this.state.edit2 : item.option5.text, value: 5}
  }

  this.setState({ questions : updatedArray.concat(editedObject),
                  edit0: "", edit1: "", edit2: ""})
}

click = (event) => {
  event.preventDefault()
  console.log('item clicked, input name:', event.target.name)
}

    render() {
        return (
            <div className="surveyContainer">

                <h1>AdminTyökalu</h1>
            <div>
                <form className="adminForm">
                    <label>Kompetenssi: </label>
                    <input type="text" id="ammattiRyhma" value={this.state.newProf} onChange={this.uusAmmatti}></input>

                <input type="submit" onClick={this.newProfToDB} value="Lähetä"/>
                </form>

            </div>
            <div>

                <p>Kyssärit: </p>
                <table>
                   <AdminList topics={this.state.topics} changeValue={this.changeValue} click={this.click} saveChanges={this.saveChanges}
                   showQuestions={this.showQuestions} questions={this.state.questions} deleteProf={this.deleteProf}
                   editQuestions={this.editQuestions} deleteQuestion={this.deleteQuestion}/>
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
