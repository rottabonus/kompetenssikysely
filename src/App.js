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
      selectedTopics: []
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
    //answerObj ottaa arvot event-paikasta (tässä tapauksessa inputin name- ja value-attribuuteista ks. komponentti) 
    const answerObj = {
      answer: event.target.name,
      value: event.target.value
    }
    //updatedAnswers on uusi lista, joka luodaan this.state.answersien pohjalta filteröimällä answerObj.answer 
    //- jos se on jo olemassa taulussa , ettei samaa vaihtoehtoa lisätä uudestaan!
    // siksi, koska jos vaihtaa vaihtoehtoa
    const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
    this.setState({ answers: updatedAnswers.concat(answerObj) })
  }

  changeProfessions = (item) => {
    console.log('item checked', item)
    //topicObject ottaa arvot checkBoxissa valitun objectin attribuuteista
    const topicObject = {
      topic: item.text,
      subs: item.ST01
    }
    // selectedTopics on uusi lista, joka luodaan this.state.selectedTopicsista - jossa mäpätään vain topic-attribuutit
    const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
    //jos selectedTopics sisältää topicObjectin attribuutin topic - arvon =>
    // filteröidään pois topicit, jotka on jo valittu => eli checkboxia kuń painetaan uudestaan - se lähtee pois statesta!!!
    if (selectedTopics.includes(topicObject.topic)) {
      const updatedTopics = this.state.selectedTopics.filter(topic => topic.topic !== topicObject.topic)
      this.setState({selectedTopics: updatedTopics})
      // muussa tapauksessa lisätään topic listaan
    } else {
      this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject]})
    }
  }

  show = (event, item) => {
    event.preventDefault()
    console.log('clicked item!', item)
    // mapataan Object.values (eli objecteja) listaksi - filteröidään muut kuin objectit pois!
    const subtopics = Object.values(item).map(topic => topic).filter(o => typeof o === 'object')
    if (this.state.subtopics.length === 0) {
      this.setState({ subtopics })
    } else {
      this.setState({ subtopics: [] })
    }
  }

  sendAnswers = (event) => {
    event.preventDefault()

    //dataObject sisältää date-attribuutin, topic-attribuutin ja Answersin joka sisältää listan vastauksista
    //date -attribuutti 
    const dataObject = {
      //tähän dateen täytyy keksiä funktio!!!
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

  //kutsutaan kun liikutaan statesta ylöspäin !!
  moveForward = () => {
    this.setState({surveyState: this.state.surveyState + 1})
  }

//haetaan ammattikysymykset ja asetetaan stateen
  fetchAnswers =  () => {
    console.log('fetch Answers triggered!')
    const subtopic = this.state.subtopics[0].text
    const answerObjectArray = []
    const rootRef = fire.database().ref()
    console.log('subtopic', subtopic)
    const db = rootRef.child('answers/').orderByChild('topic').equalTo(subtopic)
    db.on('child_added', snapshot => {
       answerObjectArray.push(snapshot.val())
        console.log('answerObjectArray lopuks,', answerObjectArray)
        const onlyAnswers = answerObjectArray.map(l => l.Answers)  
        const Answers = onlyAnswers.reduce((a, b) => [...a, ...b])
       console.log('Answers', Answers)
        this.setState({professionAnswers: onlyAnswers })
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
