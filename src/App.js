import React from 'react';
import './App.css';
import fire from './fire'
import List from './components/List'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      topics: [],
      subtopics: [],
      yleinen: {},
      answers: []
    }
  }


//child tilalla voi olla myös "child_added", "child_moved", "child_removed" tai "value"
// "on" -metodi: This is the primary way to read data from a Database. Your callback will be
//triggered for the initial data and again whenever the data changes.
// Use off( ) to stop receiving updates. See Retrieve Data on the Web for more details.
// https://firebase.google.com/docs/reference/js/firebase.database.Reference
  componentDidMount() {
    let getAll = []
    const db = fire.database().ref('topics'); //toinen on answers!
    db.on('child_added', snapshot => {
      getAll.push(snapshot.val())
      this.setState({ topics: getAll })
    })
  }



// Listens for exactly one event of the specified event type, and then stops listening.
//This is equivalent to calling on(), and then calling off() inside the callback function.
//tää alempi componentDidMount toimii promiseilla
 /*   componentDidMount() {
  let getAll = []
  const db = fire.database().ref('topics')
  db.once('child_added').then(  snapshot => {
    getAll.push(snapshot.val())
    this.setState({topics: getAll})
  })
  }*/

//tää asynkronisesti
 /*async componentDidMount() {
  let getAll = []
  const db = await fire.database().ref('topics')
  const result = await db.once('child_added')
  getAll.push(result.val())
    this.setState({topics: getAll})
  }*/

changeOption = (event) => {
const answerObj = {
  answer: event.target.name,
  value: event.target.value
}
const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
this.setState({answers: updatedAnswers.concat(answerObj)})
}


show = (event, item) => {
  event.preventDefault()
  console.log('clicked item!', item)
const subtopics = Object.values(item).map(topic => topic).filter(o => typeof o === 'object')
  if(this.state.subtopics.length === 0){
    this.setState({subtopics})
  } else {
    this.setState({subtopics: []})
  }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">this is Sparta</h1>
        </header>
        <List topics={this.state.topics} subs={this.state.subtopics} show={this.show} changeOption={this.changeOption}/>
      </div>
    );
  }
}

export default App;
