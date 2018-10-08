import React from 'react'
import GeneralTopicItem from './GeneralTopicItem'

const GeneralTopic = ({ generalSubTopics, changeOption }) => {

        return (
            <div className="topicContainer">
                <h2>{generalSubTopics.text}</h2>
                {Object.values(generalSubTopics).filter(a => typeof a === 'object').map((option, i) =>
                    <GeneralTopicItem key={i} option={option} parent={generalSubTopics.text} changeOption={changeOption}></GeneralTopicItem>)}
            </div>
        )
}


export default GeneralTopic
