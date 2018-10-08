import React from 'react';
import './App.css';
import fire from './fire'
import List from './components/List'
import SelectProfession from './components/SelectProfession'
import BarChart from './components/BarChart';
import Header from './components/Header'
import Footer from './components/Footer'
import WelcomePage from './pages/WelcomePage'
import SelectGeneral from './components/SelectGeneral'
import GeneralList from './components/GeneralList'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            topics: [],
            subtopics: [],
            yleinen: {},
            key: '',
            answers: [],
            surveyState: 0,
            states: {
                WelcomePage: 0,
                General: 1,
                General2: 2,
                SELECTPROF: 3,
                PROFESSION: 4,
                PROFANSW: 5,
            },
            professionAnswers: [],
            selectedTopics: [],
            calculated: false,
            profAverages: { values: [], answers: []}
        }
    }


   async componentDidMount() {
    let getAll = []
    const topics = fire.database().ref('topics')
    const allTopicsDone = await topics.on('child_added', snapshot => {
      getAll.push(snapshot.val())
        topics.off('child_added', allTopicsDone)
    })
        let answerObjectArray = [];
        const answers = fire.database().ref('answers/');
        const allAnswersDone = await answers.on('child_added', snapshot => {
            answerObjectArray.push(snapshot.val())
            answers.off('child_added', allAnswersDone)
        })
        this.setState({ topics: getAll, professionAnswers: answerObjectArray })
  }

  changeOption = (event) => {
    //answerObj ottaa arvot event-paikasta (tässä tapauksessa inputin name- ja value-attribuuteista ks. komponentti)
    const answerObj = {
      answer: event.target.name,
      value: event.target.value,
      topic: this.state.subtopics[0].text
    }
    //updatedAnswers on uusi lista, joka luodaan this.state.answersien pohjalta filteröimällä answerObj.answer
    //- jos se on jo olemassa taulussa , ettei samaa vaihtoehtoa lisätä uudestaan!
    const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
    this.setState({ answers: updatedAnswers.concat(answerObj) })
  }

  sendAnswers = (event) => {
  event.preventDefault()
  const answers = {}
  const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
  selectedTopics.forEach((topic) => {
    let answerSet = this.state.answers.filter(answers => answers.topic === topic).map(a =>   a={answer: a.answer, value: a.value})
    const dataObject = {Answers: answerSet, date: '28/9/2018'}
    //tietokantaan ei saa syöttää tyhjiä vastauksia!
    if (dataObject.Answers.length === 0) {
      window.confirm(`${topic} must have answers!`)
    } else {
      answers[topic] = dataObject
    }
  })
  let key = ''
  if (this.state.key === '') {
    key = fire.database().ref().child('answers').push(answers)
    this.setState({ key: key.key })
  } else {
    key = fire.database().ref('answers').child(this.state.key).set(answers);
  }
  this.moveForward()
}

  changeProfessions = (item) => {
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
      this.setState({ selectedTopics: updatedTopics })
      // muussa tapauksessa lisätään topic listaan
    } else {
      this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject] })
    }
  }

  // eli asetetaan "item" (objectArray)- stateen jos this.state.subtopics on tyhjä (muuten tila tyhjennetään) -
  // tilaan asetettavasta 'subtopic'ista on muodostettu itemistä, josta kaikki muut filtteröity jotka eivät ole objecteja. //esim siellä on arvo nimeltä 'text'
  // Tätä käytetään monessa funktiossa, että nähdään mikä on "valittu" - mille kysymyksille operoidaan ks. komponentti Topic
  show = (event, item) => {
    event.preventDefault()
    // mapataan Object.values (eli objecteja) listaksi - filteröidään muut kuin objectit pois!
    const subtopics = Object.values(item).map(topic => topic).filter(o => typeof o === 'object')
    if (this.state.subtopics.length === 0) {
      this.setState({ subtopics })
    } else {
      this.setState({ subtopics: [] })
    }
  }

    handleProfessionAnswers = (event) => {
      event.preventDefault()
      const professions = this.state.selectedTopics.map(t => t.topic)
      const answerArray = []
      this.state.professionAnswers.forEach((answers) => {
        professions.forEach((profession, i) => {
          if(answers[professions[i]]){
            answerArray.push(answers[professions[i]])
          }
        })
      })
      const onlyAnswers = answerArray.map(l => l.Answers).reduce((a, b) => [...a, ...b])
      console.log('vain vastauksia', onlyAnswers)
      console.log(typeof onlyAnswers)
        const uniqueAnswers = [...new Set(onlyAnswers.map(a => a.answer))]
        console.log('unique',uniqueAnswers)
        const answerAverages = [];
        uniqueAnswers.forEach((element) => {
            const tempArr = onlyAnswers.filter((answer) =>
                element === answer.answer);
            const valueArr = tempArr.map((a) => parseInt(a.value));
            var sum = valueArr.reduce((previous, current) => current + previous);
            var avg = (sum / valueArr.length).toFixed(2);
            answerAverages.push(avg);
            return answerAverages;
        });
        const profAverages = {values: answerAverages, answers: uniqueAnswers}
        console.log(profAverages.answers.map(a => a))
    this.setState({ profAverages })
    this.moveForward()
    }

  //kutsutaan kun liikutaan statesta ylöspäin !!
  moveForward = () => {
    this.setState({ surveyState: this.state.surveyState + 1 })
  }


  //tämä siirtää eteenpäin prof-selectistä
  selectProfessions = (event) => {
    event.preventDefault()
    this.handleProfessionAnswers()
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

      case this.state.states.WelcomePage: {
        return (
          <div className="App">
            <Header />
            <WelcomePage moveForward={this.moveForward} />
            <Footer />
          </div>
        )
      }

      case this.state.states.General: {
        return (
          <div className="App">
            <Header />
            <SelectGeneral topics={this.state.topics} moveForward={this.moveForward} />

            <Footer />
          </div>
        )
      }

      case this.state.states.General2: {
        return (
          <div className="App">
            <Header />
            <GeneralList topics={this.state.topics} moveForward={this.moveForward} subs={this.state.subtopics}/>
            <Footer />
          </div>
        )
      }

      case this.state.states.SELECTPROF: {
        return (
          <div className="App">
            <Header />
            <SelectProfession topics={this.state.topics} handleProfessionsAndMove={this.handleProfessionAnswers}
              selectedTopics={this.state.selectedTopics} changeProfessions={this.changeProfessions} />
            <Footer />
          </div>
        )
      }
      case this.state.states.PROFESSION: {
        return (
          <div className="App">
            <Header />
            <List topics={this.state.selectedTopics} subs={this.state.subtopics} show={this.show}
              changeOption={this.changeOption} sendAnswers={this.sendAnswers} />
            <Footer />
          </div>
        )
      }

      // FIXME: calculated käyttö renderiin??
      case this.state.states.PROFANSW: {
        return (
          <div className="Chart">
          <div className="App">
            <Header />
            {this.state.calculated ? null : <BarChart answers={this.state.answers} profAverages={this.state.profAverages}></BarChart>}
            <Footer />
          </div>
          </div>
        )
      }
    }
  }
}

export default App;

           /*banswers: [{answer: "Strateginen johtaminen",value: "1"},
                      {answer: "Strateginen HR", value: "5"},
                      {answer: "Päätöksenteon valmistelu",value: "3"},
                      {answer: "Henkilöstöresurssien hallinta",value: "3"},
                      {answer: "Digitaalinen osaamisen kehittäminen",value: "1"},
                      {answer: "Oppimismenetelmät", value: "3"},
                      {answer: "Työnantajaimagon rakentaminen",value: "5"},
                      {answer: "Rekrytointi",value: "1"},
                      {answer: "Vaikuttamisviestintä",value: "3"},
                      {answer: "HR-verkostot",value: "1"},
                      {answer: "Työhyvinvointi",value: "5"},
                      {answer: "Sitouttaminen",value: "3"},
                      {answer: "Diversiteetin huomioiminen",value: "5"},
                      {answer: "Monikulttuurinen HR-viestintä",value: "3"},
                      {answer: "Kansainvälinen HRM",value: "3"},
                      {answer: "Muutoksen organisointi",value: "1"},
                      {answer: "Muutosagentit",value: "1"}],
*/
