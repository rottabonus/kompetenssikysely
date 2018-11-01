import React from 'react';
import './App.css';
import fire from './fire';
import List from './components/List';
import SelectProfession from './components/SelectProfession';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './pages/WelcomePage';
import GeneralList from './components/GeneralList';
import topicService from './services/topics';
import answerService from './services/answers';
import RadarChart from './components/RadarChart';
import Summary from './components/Summary';
import backGround from './img/PNG/raita.png'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            canSubmit: false,
            topics: [],
            genTopics: [],
            genGenTopics: [],
            profTopics: [],
            key: '',
            answers: [],
            surveyState: 1,
            states: {
                WelcomePage: 0,
                General: 1,
                General2: 2,
                Radar: 3,
                SELECTPROF: 4,
                PROFESSION: 5,
                PROFANSW: 6,
                SUMMARY: 7,
            },
            professionAnswers: [],
            selectedTopics: [],
            calculated: false,
            profAverages: {
                values: [],
                answers: []
            }
        }
    }

    async componentDidMount() {
        const topics = await topicService.getAll() //haetaan tietokannan tiedot rest-urlista asynkronisesti ja asetetaan tilaan
        const professionAnswers = await answerService.getAll()

        const filterGeneral = topics.filter(t => t.category === 'yleinen' && typeof t === 'object')
          const genTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object' && t.text !== 'Yleiset tiedot')
	           const genGenTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object' && t.text === 'Yleiset tiedot')
                const profTopics = topics.filter(t => typeof t === 'object')
        this.setState({ professionAnswers, genTopics, genGenTopics, profTopics, topics })
    }

    changeOption = (event) => {
        const answerObj = {
            answer: event.target.name,
            value: event.target.dataset.aval,
            topic: event.target.dataset.parent
        }
        const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
        this.setState({ answers: updatedAnswers.concat(answerObj) })
    }

    getChecked = (x, item) => {
      if(x === 'basic'){
        const found = this.state.answers.filter(a => a.value === item)
        return found.length === 1
      } else {
        const filterAnswers = this.state.answers.filter(a => a.answer === x)
        const found = filterAnswers.filter(a => parseInt(a.value) === item)
        return found.length === 1
      }
    }

    getSelected = (x) => {
      const found = this.state.selectedTopics.filter(a => a.topic === x)
      return found.length === 1
    }

    sendAnswers = (event) => {
        event.preventDefault()
        const answers = {}
        const allTopics = this.state.answers.map(topic => topic.topic)
        const uniqueAnswers = [...new Set(allTopics.map(a => a))] // Set on uusi JS ominaisuus, jolla voidaan luoda arraysta uusi versio jossa on vain uniikit arvot
        uniqueAnswers.forEach((topic) => {
            let answerSet = this.state.answers.filter(answers => answers.topic === topic).map(a => a = { answer: a.answer, value: a.value })
            const dataObject = { Answers: answerSet, date: '28/9/2018' } // päivämäärä on kovakoodattu !!
            if (dataObject.Answers.length === 0) {
                window.confirm({ topic } + 'must have answers!')
            } else {
                answers[topic] = dataObject
            }
        })
        if (this.state.key === '') {
            let key = fire.database().ref().child('answers').push(answers)
            this.setState({ key: key.key })
        } else {
            let key = fire.database().ref('answers').child(this.state.key).set(answers);
        }
        this.moveForwardProf()
    }

    changeProfessions = (item) => {
        const topicObject = { //topicObject ottaa arvot checkBoxissa valitun objectin attribuuteista
            topic: item.text,
            subs: item.ST01
        }
        const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
        if (selectedTopics.includes(topicObject.topic)) {   // filteröidään pois topicit, jotka on jo valittu =>
            const updatedTopics = this.state.selectedTopics.filter(topic => topic.topic !== topicObject.topic) // kuń painetaan uudestaan - se lähtee pois statesta!!!
            this.setState({ selectedTopics: updatedTopics })
        } else {  // muussa tapauksessa lisätään topic listaan
            this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject] })
        }
    }

    show = (event, item) => {
        event.preventDefault()
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
        this.state.professionAnswers.forEach((answers) => { //jokainen alkio sisältää vastauslistan
            professions.forEach((profession, i) => {
                if (answers[professions[i]]) {
                    answerArray.push(answers[professions[i]]) //listaan lisätään kompetenssiin kuuluva vastauslista
                }
            })
        })
        const onlyAnswers = answerArray.map(l => l.Answers).reduce((a, b) => [...a, ...b]) // kaikki vastaukset valittuihin kompetensseihin
        const uniqueAnswers = [...new Set(onlyAnswers.map(a => a.answer))] //uniikit vastausnimet
        const answerAverages = []
        uniqueAnswers.forEach((element) => {
            const tempArr = onlyAnswers.filter((answer) =>
                element === answer.answer)
            const valueArr = tempArr.map((a) => parseInt(a.value));
            var sum = valueArr.reduce((previous, current) => current + previous);
            var avg = (sum / valueArr.length).toFixed(2);
            answerAverages.push(avg);
            return answerAverages;
        });
        const profAverages = { values: answerAverages, answers: uniqueAnswers }
        this.setState({ profAverages, calculated: true })
        this.moveForwardProf()
    }

    //kutsutaan kun liikutaan statesta ylöspäin !!
    moveForward = (e) => {
      e.preventDefault()
        window.scrollTo(0, 0)
        this.setState({ surveyState: this.state.surveyState + 1 })
    }

    moveForwardProf = () => {
        window.scrollTo(0, 0)
        this.setState({ surveyState: this.state.surveyState + 1 })
    }

    moveBackward = (e) => {
      e.preventDefault()
        window.scrollTo(0, 0)
        this.setState({ surveyState: this.state.surveyState - 1 })
    }
    //tämä siirtää eteenpäin prof-selectistä
    selectProfessions = (event) => {
        event.preventDefault()
        this.handleProfessionAnswers()
    }

    render() {
        switch (this.state.surveyState) {
            default: {
                return (
                    <div className="App">
                        <h2> default </h2>
                    </div>
                )
            }

            case this.state.states.WelcomePage: {
                return (
                      <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <WelcomePage moveForward={this.moveForward} />
                        <Footer />
                        </div>
                      )
            }

            case this.state.states.General: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <GeneralList getChecked={this.getChecked} topics={this.state.genGenTopics} moveForward={this.moveForward} changeOption={this.changeOption} moveBackward={this.moveBackward}/>
                        <Footer />
                    </div>
                )
            }

            case this.state.states.General2: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <GeneralList topics={this.state.genTopics} getChecked={this.getChecked} moveForward={this.moveForward} changeOption={this.changeOption} moveBackward={this.moveBackward} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.Radar: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <RadarChart selectedTopics={this.state.selectedTopics} answers={this.state.answers} moveForward={this.moveForward} moveBackward={this.moveBackward}></RadarChart>
                        <Footer />
                    </div>
                )
            }

            case this.state.states.SELECTPROF: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <SelectProfession topics={this.state.profTopics} handleProfessionsAndMove={this.handleProfessionAnswers}
                            selectedTopics={this.state.selectedTopics} changeProfessions={this.changeProfessions} getChecked={this.getSelected} moveBackward={this.moveBackward}/>
                        <Footer />
                    </div>
                )
            }

            case this.state.states.PROFESSION: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <List topics={this.state.selectedTopics} getChecked={this.getChecked}
                            changeOption={this.changeOption} sendAnswers={this.sendAnswers} moveBackward={this.moveBackward} />
                        <Footer />
                    </div>
                )
            }

            case this.state.states.PROFANSW: {
                return (
                    <div className="App">
                            <Header surveyState={this.state.surveyState} states={this.state.states} />
                            {!this.state.calculated ? null : <BarChart answers={this.state.answers} profAverages={this.state.profAverages}
                            selectedTopics={this.state.selectedTopics} moveForward={this.moveForward} moveBackward={this.moveBackward}></BarChart>}
                            <Footer />
                    </div>
                )
            }

            case this.state.states.SUMMARY: {
                return (
                    <div className="App">
                        <Header surveyState={this.state.surveyState} states={this.state.states} />
                        <Summary />
                        <Footer />
                    </div>
                )
            }
        }
    }
}
export default App;
