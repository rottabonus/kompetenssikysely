import React, { Component } from 'react';
import topicService from '../services/topics';
import AdminList from './AdminList'

class Admin2 extends Component {
   constructor(props){
       super(props)
       this.state = {
           topics : [],
           newProf : "",
           optionValues: "",
           questions: [],
           edit0: "",
           edit1:"",
           edit2:"",
           key: ""
       }
   }

   uusAmmatti = (event) => {
       this.setState({newProf : event.target.value})
   }

async componentDidMount() {
   this.setState({topics : await topicService.getAll()});
}

newProfToDB = async (event) => {
  var i = this.state.topics.length + 1;
  console.log("tpoics pituus" + i)
  var topicnmbr = "T0"+i;
  var jsondata = {
           category : "ammatti",
           ST01 : "",
           text : this.state.newProf
   }
 await topicService.newTopic(jsondata, topicnmbr)
}

deleteProf = async (event) => {
   const index = event.target.id;
  var delArray = this.state.topics.filter(t => t.text !== index);
   var topicnmbr = "T0"+index;
   var tobeDEL = JSON.stringify(delArray);
   await topicService.removeTopic(tobeDEL)
}

showQuestions = (event) => {
   const index = event.target.id;
   var profArray = this.state.topics.filter(t => t.text == index);
   var questions = Object.values(profArray[0].ST01).map(option => option).filter(o => typeof o === 'object')
   if(this.state.questions.length > 0){
     this.setState({ questions: []})
   } else {
       this.setState({ questions })
   }
}

changeValue = (event ) => {
 console.log(event.target.dataset.bame)
 const key = event.target.dataset.bame
 this.setState({ [event.target.name]: event.target.value, key})
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

 this.setState({ questions : updatedArray.concat(editedObject) })
}

click = (event) => {
 event.preventDefault()
 console.log('item clicked, input name:', event.target.name)
}
//nyt delete toimii ihan mitensattuu tolla indexillä, eli filsuttaa topic.text avulla poistettu pois ja puskea jäljellejääneet topicsit kantaan
//^ nyt toi näyttää toimivan ihan OK ?
   render() {
       return (
           <div className="surveyContainer">

               <h1>AdminTyökalu</h1>
           <div>
               <form className="adminForm">
                   <label>Kompetenssi: </label>
                   <input type="text" id="ammattiRyhma" value={this.state.newProf} onChange={this.uusAmmatti}></input>
               </form>
               <button onClick={this.newProfToDB}>Lähetä</button>
           </div>
           <div>
               <table>
                   <AdminList topics={this.state.topics} changeValue={this.changeValue} click={this.click} saveChanges={this.saveChanges}
                   showQuestions={this.showQuestions} questions={this.state.questions} deleteProf={this.deleteProf}/>
               </table>
           </div>
           </div>
       )
   }
}

export default Admin2;