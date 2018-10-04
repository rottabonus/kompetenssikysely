import React from 'react'
import GeneralTopicItem from './GeneralTopicItem'

const GeneralTopic = ({ generalSubTopics }) => {

  if(generalSubTopics.text === 'Yleiset tiedot'){

    const generalSubTopicsGeneral = Object.values(generalSubTopics).map(t => t)
    return (
      <div className="topicContainer">
        <h2>{generalSubTopics.text}</h2>
        {generalSubTopicsGeneral.filter(a => typeof a === 'object').map((option, i) => <GeneralTopicItem key={i} option={option}></GeneralTopicItem>)}
      </div>
    )
  } else {
    return (
      <div className="topicContainer">
        <h2>{generalSubTopics.text}</h2>
        {Object.values(generalSubTopics).filter(a => typeof a === 'object').map((option, i) => <GeneralTopicItem key={i} option={option}></GeneralTopicItem>)}
      </div>
    )
  }
}


export default GeneralTopic
