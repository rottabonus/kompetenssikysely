import React from 'react'
import GeneralTopicItem from './GeneralTopicItem'

const GeneralTopic = ({ generalSubTopics }) => {
    
	if(generalSubTopics.Options !== undefined){
		return (
        <div className="topicContainer">
            <h2>{generalSubTopics.text}</h2>
            {generalSubTopics.Options.map((option, i) => <GeneralTopicItem key={i} option={option}></GeneralTopicItem>)}
        </div>

    )
	} else {
		console.log( 'does not have options array, but a options value-key pair!')
		return (
        <div className="topicContainer">
            <h2>{generalSubTopics.text}</h2>
            {Object.values(generalSubTopics).filter(a => typeof a === 'object').map((option, i) => <GeneralTopicItem key={i} option={option}></GeneralTopicItem>)}
            
        </div>

    )
	}
      
}



export default GeneralTopic