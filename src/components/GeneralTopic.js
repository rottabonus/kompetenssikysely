import React from 'react'
import GeneralTopicItem from './GeneralTopicItem'

const GeneralTopic = ({ topics, changeOption, get }) => {

//  if(option.category === 'Yleisettiedot'){
console.log(topics.topic)

        return (
            <div className="topicContainer">
                <h2>{topics.text}</h2>
                {Object.values(topics).filter(a => typeof a === 'object').map((option, i) =>
                    <GeneralTopicItem key={i} option={option} parent={topics.text} changeOption={changeOption} get={get}></GeneralTopicItem>)}
            </div>
        )
}


export default GeneralTopic
