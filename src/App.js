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
                SELECTPROF: 2,
                PROFESSION: 3,
                PROFANSW: 4,
            },
            professionAnswers: [],
            selectedTopics: [],
            calculated: false
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
        console.log('sendAnswers clicked!')
        const dataObject = {
            date: '9/9/2018',
            topic: this.state.subtopics[0].text,
            Answers: this.state.answers
        }
        let key = ''
        if (this.state.key === '') {
            key = fire.database().ref().child('answers').push(dataObject);
            this.setState({
                key: key.key
            })
        } else {
            key = fire.database().ref('answers').child(this.state.key).set(dataObject);
        }
        this.fetchAnswers();
        this.moveForward();
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
  // katso myös console log item niin tajuat!!
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

    fetchAnswers = () => {
        console.log('fetch Answers triggered!')
        const subtopic = this.state.subtopics[0].text;
        let answerObjectArray = [];
        const rootRef = fire.database().ref();
        const db = rootRef.child('answers/').orderByChild('topic').equalTo(subtopic);
        db.on('child_added', snapshot => {
            answerObjectArray.push(snapshot.val())
            //console.log(JSON.stringify(snapshot))
            this.setState({
                professionAnswers: answerObjectArray
            })
        })
        setTimeout(() => {
            db.off()
            this.handleProfessionAnswers();
        }, 5000)
    }

    handleProfessionAnswers = () => {
        const answerObjectArray = this.state.professionAnswers;
        const onlyAnswers = answerObjectArray.map(l => l.Answers).reduce((a, b) => [...a, ...b])
       const answerNames = this.state.answers.map(answer => answer.answer)
            const answerAverages = [];
            answerNames.forEach((element) => {
                const tempArr = onlyAnswers.filter((answer) =>
                    element === answer.answer);
                const valueArr = tempArr.map((a) => parseInt(a.value));
                var sum = valueArr.reduce((previous, current) => current + previous);
                var avg = sum / valueArr.length;
                answerAverages.push(avg);
                return answerAverages;
            });
        this.setState({
            professionAnswers: answerAverages,
            calculated: true
        })
    }

  //kutsutaan kun liikutaan statesta ylöspäin !!
  moveForward = () => {
    this.setState({ surveyState: this.state.surveyState + 1 })
  }

 
  //tämä siirtää eteenpäin prof-selectistä
  selectProfessions = (event) => {
    event.preventDefault()
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
            <SelectGeneral topics={this.state.topics} subs={this.state.subtopics} show={this.show}
              changeOption={this.changeOption} moveForward={this.moveForward} />

            <Footer />
          </div>
        )
      }

      case this.state.states.SELECTPROF: {
        return (
          <div className="App">
            <Header />
            <SelectProfession topics={this.state.topics} selectProfessions={this.selectProfessions}
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
      case this.state.states.PROFANSW: {
        return (

          <div className="App">
            <Header />
            <BarChart answers={this.state.answers} calculated={this.state.calculated} professionAnswers={this.state.professionAnswers}></BarChart>
            <Footer />
          </div>
        )
      }
    }
  }
}

export default App;

/*            banswers: [{answer: "Strateginen johtaminen",value: "1"}, 
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


    sendAnswers = (event) => {
    event.preventDefault()
    // jaetaan vastaukset ammatin/topicin mukaan eri arrayhin!!
    // answers ja AnswerTable on hash-Tauluja, jotta päästään eroon listoista.
    //hahs-tauluihin työnnetään aina arvo näin => taulu[avain] = arvo
    // hahs-taulua voi sitten kutsua lopuksi näin => taulu
    // se palauttaa sitten taulun kaiki arvot, näin ollen voimme käyttää sitä ikään kuin arrayna.
    const answers = {}
    const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
    selectedTopics.forEach((topic) => {
      let AnswerTable = {}
      let answerSet = this.state.answers.filter(answers => answers.topic === topic)
      answerSet.forEach((answer) => {
        AnswerTable[answer.answer] = answer.value
      })
      console.log('hashtable', AnswerTable)
      const dataObject = {
        //tähän dateen täytyy keksiä funktio!!!
        date: '13/9/2018',
        Answers: AnswerTable
      }
      //tietokantaan ei saa syöttää tyhjiä vastauksia!
      if (Object.keys(AnswerTable).length === 0) {
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
    this.fetchAnswers()
    this.moveForward()
  }*/

