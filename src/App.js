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
        this.fetchAnswers()
    }

    changeOption = (event) => {
        //answerObj ottaa arvot event-paikasta (tässä tapauksessa inputin name- ja value-attribuuteista ks. komponentti)
        const answer = {}
        const answerObj = {
            answer: event.target.name,
            value: event.target.value,
            topic: this.state.subtopics[0].text
        }
        //updatedAnswers on uusi lista, joka luodaan this.state.answersien pohjalta filteröimällä answerObj.answer
        //- jos se on jo olemassa taulussa , ettei samaa vaihtoehtoa lisätä uudestaan!
        // siksi, koska jos vaihtaa vaihtoehtoa
        // answer[event.target.name] = answerObj
      //  this.setState({ answers: this.state.answers.concat(answer) })
        const updatedAnswers = this.state.answers.filter(answer => answerObj.answer !== answer.answer)
        this.setState({ answers: updatedAnswers.concat(answerObj) })
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
            this.setState({selectedTopics: updatedTopics})
            // muussa tapauksessa lisätään topic listaan
        } else {
            this.setState({ selectedTopics: [...this.state.selectedTopics, topicObject]})
        }
    }

// eli asetetaan "item" (objectArray)- stateen jos this.state.subtopics on tyhjä (muuten tila tyhjennetään) -
// tilaan asetettavasta 'subtopic'ista on muodostettu itemistä, josta kaikki muut filtteröity jotka eivät ole objecteja. //esim siellä on arvo nimeltä 'text'
// Tätä käytetään monessa funktiossa, että nähdään mikä on "valittu" - mille kysymyksille operoidaan ks. komponentti Topic
// katso myös console log item niin tajuat!!
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
// jaetaan vastaukset ammatin/topicin mukaan eri arrayhin!!
// answers ja AnswerTable on hash-Tauluja, jotta päästään eroon listoista.
//hahs-tauluihin työnnetään aina arvo näin => taulu[avain] = arvo
// hahs-taulua voi sitten kutsua lopuksi näin => taulu
// se palauttaa sitten taulun kaiki arvot, näin ollen voimme käyttää sitä ikään kuin arrayna.
        const answers = {}
        const AnswerTable = {}
        const selectedTopics = this.state.selectedTopics.map(topic => topic.topic)
        selectedTopics.forEach((topic) => {
            let answerSet = this.state.answers.filter(answers => answers.topic === topic)
            answerSet.forEach((answer) => {
              AnswerTable[answer.answer] = answer.value
            })
            console.log('hashtable',AnswerTable)
            const dataObject = {
                //tähän dateen täytyy keksiä funktio!!!
                date: '13/9/2018',
                Answers: AnswerTable
            }
            //tietokantaan ei saa syöttää tyhjiä vastauksia!
            if(dataObject.Answers.length === 0){
                window.confirm(`${dataObject.topic} must have answers!`)
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
      //  this.moveForward()
    }

    //kutsutaan kun liikutaan statesta ylöspäin !!
    moveForward = () => {
        this.setState({surveyState: this.state.surveyState + 1})
    }

//haetaan ammattikysymykset ja asetetaan stateen
    fetchAnswers =  () => {
        const answerObjectArray = []
        const rootRef = fire.database().ref('answers')
        rootRef.on('child_added', snapshot => {
            answerObjectArray.push(snapshot.val())
            // HUOM! Tää metodi vaihdettu hakemaan kaikki vastaukset, koska ammattivalintoja voi olla useampia. On järkevämpää hakea
            // kaikki tietokannan vastaukset ja komponentissa filteröidä pois ne mitä ei tarvitse käyttää!
            //    const onlyAnswers = answerObjectArray.map(l => l.Answers).reduce((a, b) => [...a, ...b])
            this.setState({professionAnswers: answerObjectArray })
        })
    }

//tämä siirtää eteenpäin prof-selectistä
    selectProfessions = (event) => {
        event.preventDefault()
        this.moveForward()
    }

    render() {
        switch (this.state.surveyState) {
            default: {
                return <div><h2>if something went wrong you will see this </h2></div>
            }
            case this.state.states.SELECTPROF: {
                return <div><SelectProfession topics={this.state.topics} selectProfessions={this.selectProfessions}
                                              selectedTopics={this.state.selectedTopics} changeProfessions={this.changeProfessions} /></div>
            }
            case this.state.states.PROFESSION: {
                return <div><List topics={this.state.selectedTopics} subs={this.state.subtopics} show={this.show}
                                  changeOption={this.changeOption} sendAnswers={this.sendAnswers}/></div>
            }
            case this.state.states.PROFANSW: {
                return <div><h2>Here we will render answers</h2></div>
            }
        }
    }
}

export default App;
