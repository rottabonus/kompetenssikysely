import React from 'react';
import './App.css';
import fire from './fire';
import List from './components/List';
import SelectProfession from './components/SelectProfession';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomePage from './pages/WelcomePage';
import SelectGeneral from './components/SelectGeneral';
import GeneralList from './components/GeneralList';
import topicService from './services/topics';
import answerService from './services/answers';
import RadarChart from './components/RadarChart';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            topics: [],
            key: '',
            answers: [],
            surveyState: 0,
            states: {
                WelcomePage: 0,
                General: 1,
                General2: 2,
                Radar: 3,
                SELECTPROF: 4,
                PROFESSION: 5,
                PROFANSW: 6,
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
        this.setState({ topics, professionAnswers })
    }

    changeOption = (event) => {
        const answerObj = {
            answer: event.target.name,
            value: event.target.value,
            topic: event.target.dataset.parent
        }
        const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
        this.setState({ answers: updatedAnswers.concat(answerObj) })
    }

    sendAnswers = (event) => {
        event.preventDefault()
        const answers = {}
        const allTopics = this.state.answers.map(topic => topic.topic)
        const uniqueAnswers = [...new Set(allTopics.map(a => a))] // Set on uusi JS ominaisuus, jolla voidaan luoda arraysta uusi versio jossa on vain uniikit arvot
        uniqueAnswers.forEach((topic) => {
            let answerSet = this.state.answers.filter(answers => answers.topic === topic).map(a => a = { answer: a.answer, value: a.value })
            const dataObject = {Answers: answerSet, date: '28/9/2018'} // päivämäärä on kovakoodattu !!
            if (dataObject.Answers.length === 0) {
                window.confirm({topic} + 'must have answers!')
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
                if(answers[professions[i]]){
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
                        <h2> default </h2>
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
                        <SelectGeneral topics={this.state.topics} moveForward={this.moveForward} changeOption={this.changeOption} />
                        <Footer />
                    </div>
                )
            }
            case this.state.states.General2: {
                return (
                    <div className="App">
                        <Header />
                        <GeneralList topics={this.state.topics} moveForward={this.moveForward} changeOption={this.changeOption}/>
                        <Footer />
                    </div>
                )
            }
            case this.state.states.Radar: {
                return (
                    <div className="App">
                        <Header />
                        <RadarChart answers={this.state.answers} moveForward={this.moveForward}></RadarChart>
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
                        <List topics={this.state.selectedTopics}
                              changeOption={this.changeOption} sendAnswers={this.sendAnswers} />
                        <Footer />
                    </div>
                )
            }
            case this.state.states.PROFANSW: {
                return (
                    <div className="Chart">
                        <div className="App">
                            <Header />
                {!this.state.calculated ? null : <BarChart answers={this.state.answers} profAverages={this.state.profAverages} selectedTopics={this.state.selectedTopics}></BarChart>}
                            <Footer />
                        </div>
                    </div>
                )
            }
        }
    }
}

export default App;
