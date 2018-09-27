import React from 'react';
import './App.css';
import fire from './fire'
import List from './components/List'
import SelectProfession from './components/SelectProfession'
import BarChart from './components/BarChart';
import Header from './components/Header'
import Footer from './components/Footer'
import WelcomePage from './pages/WelcomePage'
import General from './pages/General'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            topics: [],
            subtopics: [],
            yleinen: {},
            banswers: [{
                answer: "Strateginen johtaminen",
                value: "1"
            }, {
                answer: "Strateginen HR",
                value: "5"
            }, {
                answer: "Päätöksenteon valmistelu",
                value: "3"
            }, {
                answer: "Henkilöstöresurssien hallinta",
                value: "3"
            }, {
                answer: "Digitaalinen osaamisen kehittäminen",
                value: "1"
            }, {
                answer: "Oppimismenetelmät",
                value: "3"
            }, {
                answer: "Työnantajaimagon rakentaminen",
                value: "5"
            }, {
                answer: "Rekrytointi",
                value: "1"
            }, {
                answer: "Vaikuttamisviestintä",
                value: "3"
            }, {
                answer: "HR-verkostot",
                value: "1"
            }, {
                answer: "Työhyvinvointi",
                value: "5"
            }, {
                answer: "Sitouttaminen",
                value: "3"
            }, {
                answer: "Diversiteetin huomioiminen",
                value: "5"
            }, {
                answer: "Monikulttuurinen HR-viestintä",
                value: "3"
            }, {
                answer: "Kansainvälinen HRM",
                value: "3"
            }, {
                answer: "Muutoksen organisointi",
                value: "1"
            }, {
                answer: "Muutosagentit",
                value: "1"
            }],
            key: '',
            answers: [],
            surveyState: 0,
            states: {
                SELECTPROF: 0,
                PROFESSION: 1,
                PROFANSW: 2,
                RADARFEED: 3
            },
            professionAnswers: [],
            tempState: [],
            selectedTopics: [],
            calculated: false
        }
    }

    componentDidMount() {
        let getAll = []
        const db = fire.database().ref('topics')
        db.on('child_added', snapshot => {
            getAll.push(snapshot.val())
            this.setState({
                topics: getAll
            })
        })
    }

    changeOption = (event) => {
        const answerObj = {
            answer: event.target.name,
            value: event.target.value
        }
        const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
        this.setState({
            answers: updatedAnswers.concat(answerObj)
        })
    }

    changeProfessions = (item) => {
        console.log('item checked', item)
        const topicObject = {
            topic: item.text,
            subs: item.ST01
        }
        const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
        if (selectedTopics.includes(topicObject.topic)) {
            const updatedTopics = this.state.selectedTopics.filter(topic => topic.topic !== topicObject.topic)
            this.setState({
                selectedTopics: updatedTopics
            })
        } else {
            this.setState({
                selectedTopics: [...this.state.selectedTopics, topicObject]
            })
        }
    }

    show = (event, item) => {
        event.preventDefault()
        console.log('clicked item!', item)
        const subtopics = Object.values(item).map(topic => topic).filter(o => typeof o === 'object')
        if (this.state.subtopics.length === 0) {
            this.setState({
                subtopics
            })
        } else {
            this.setState({
                subtopics: []
            })
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
            this.setState({
                key: key.key
            })
        } else {
            key = fire.database().ref('answers').child(this.state.key).set(dataObject);
        }
        this.fetchAnswers();
        this.moveForward();
    }

    moveForward = () => {
        this.setState({
            surveyState: this.state.surveyState + 1
        })
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
        console.log("in fn(handleProfessionAnswers): answerObjectarray", answerObjectArray)
        const onlyAnswers = answerObjectArray.map(l => l.Answers).reduce((a, b) => [...a, ...b])
       const answerNames = this.state.answers.map(answer => answer.answer)
            const answerAverages = [];
            answerNames.forEach((element) => {
                const tempArr = onlyAnswers.filter((answer) =>
                    element === answer.answer);
                const valueArr = tempArr.map((a) => parseInt(a.value));
                console.log("valTesti", valueArr);
                var sum = valueArr.reduce((previous, current) => current + previous);
                console.log("sumTest", sum);
                console.log("avgTest", sum / 17)
                var avg = sum / valueArr.length;
                answerAverages.push(avg);
                console.log("answerAverages", answerAverages);
                return answerAverages;
            });
       console.log('professionAverages', answerAverages)
        this.setState({
            professionAnswers: answerAverages,
            calculated: true
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
            <General moveForward={this.moveForward} />
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
            <BarChart answers={this.state.answers} calculated={this.state.calculated} professionAnswers={this.state.professionAnswers}></BarChart>
          </div>

        )
      }
    }
  }
}

export default App;
