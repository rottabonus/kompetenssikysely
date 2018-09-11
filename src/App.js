import React from 'react';
import './App.css';
import fire from './fire'
import List from './components/List'
import SelectProfession from './components/SelectProfession'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      topics: [],
      subtopics: [],
      yleinen: {},
      answers: [],
      key: '',
      surveyState: 0,
      states: {
        SELECTPROF: 0,
        PROFESSION: 1,
        PROFANSW: 2
      },
      professionAnswers: '',
      selectedTopics: [],
      checked: false
    }
  }

  componentDidMount() {
    let getAll = []
    const db = fire.database().ref('topics')
    db.on('child_added', snapshot => {
      getAll.push(snapshot.val())
      this.setState({ topics: getAll })
    })
  }

  changeOption = (event) => {
    const answerObj = {
      answer: event.target.name,
      value: event.target.value
    }

    const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
    this.setState({ answers: updatedAnswers.concat(answerObj) })
  }

  changeProfessions = (item) => {
    console.log('item checked', item)
    const topicObject = {
      topic: item.text,
      subs: item.ST01
    }
    console.log('and this is topicObject', topicObject)
    const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
    if (selectedTopics.includes(topicObject.topic)) {
      console.log('on samaa')
      const updatedTopics = this.state.selectedTopics.filter(topic => topic.topic !== topicObject.topic)
      console.log('first', this.state.selectedTopics.map(topic=>topic), 'updated',updatedTopics)
      this.setState({selectedTopics: updatedTopics})
    } else {
      this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject]})
    }
  }

  show = (event, item) => {
    event.preventDefault()
    console.log('clicked item!', item)
    const subtopics = Object.values(item).map(topic => topic).filter(o => typeof o === 'object')
    if (this.state.subtopics.length === 0) {
      this.setState({ subtopics })
    } else {
      this.setState({ subtopics: [] })
    }
  }

  sendAnswers = (event) => {
    event.preventDefault()
    console.log('sendAnswers clicked!')

    const dataObject = {
      date: '9/9/2018',
      topic: this.state.subtopics[0].text,
      Answers: this.state.answers
    }

    let key = ''

    if (this.state.key === '') {
      key = fire.database().ref().child('answers').push(dataObject);
      // let key = {
      // key: 'kakkamies'
      //}
      this.setState({
        key: key.key})
    } else {
      key = fire.database().ref('answers').child(this.state.key).set(dataObject);
    }

    this.fetchAnswers()
    this.moveForward()
  }

  moveForward = () => {
    this.setState({surveyState: this.state.surveyState + 1})
  }

  fetchAnswers = () => {
    console.log('fetch Answers triggered!')
    const subtopic = this.state.subtopics[0].text
    const answerObjectArray = []
    const rootRef = fire.database().ref()
    const db = rootRef.child('answers/').orderByChild('topic').equalTo(subtopic)
    db.on('child_added', snapshot => {
      answerObjectArray.push(snapshot.val())
      const onlyAnswers = answerObjectArray.map(l => l.Answers).reduce((a, b) => [...a, ...b])
      console.log('onlyValues', onlyAnswers)

      this.setState({ professionAnswers: onlyAnswers })
    })
  }

  selectProfessions = (event) => {
    event.preventDefault()
    console.log('selectProfessions clicked!')
    this.moveForward()
  }

  render() {
    switch (this.state.surveyState) {
       default: {
        return ( 
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">if something went wrong</h1>
            </header>
          <h2> you will see this </h2>
          </div>
          )
      }
      case this.state.states.SELECTPROF: {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">select profession topic</h1>
            </header>
            <SelectProfession topics={this.state.topics} selectProfessions={this.selectProfessions}
              selectedTopics={this.state.selectedTopics} changeProfessions={this.changeProfessions} />
          </div>
        )
      }
      case this.state.states.PROFESSION: {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">this is Sparta</h1>
            </header>
            <List topics={this.state.selectedTopics} subs={this.state.subtopics} show={this.show}
              changeOption={this.changeOption} sendAnswers={this.sendAnswers} />
          </div>
        )
      }
      case this.state.states.PROFANSW: {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Ajajajajjaja ja Puerto Rico !</h1>
            </header>
            <h2>Here we will render answers</h2>
          </div>
        )
      }
    }
  }
}


export default App;
