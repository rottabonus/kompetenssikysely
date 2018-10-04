import React from 'react'
import GeneralTopicItem from './GeneralTopicItem'

const GeneralTopic = ({ generalSubTopics, handleChange }) => {

    if (generalSubTopics.Options !== undefined) {
        return (
            <div className="topicContainer">
                <h2>{generalSubTopics.text}</h2><fieldset>
                    {generalSubTopics.Options.map((option, i) =>
                        <GeneralTopicItem key={i} option={option} name={generalSubTopics.text} handleChange={handleChange}></GeneralTopicItem>)}
                </fieldset>
            </div>

        )
    } else {
        console.log('does not have options array, but a options value-key pair!')
        return (
            <div className="topicContainer">
                <h2>{generalSubTopics.text}</h2>
                {Object.values(generalSubTopics).filter(a => typeof a === 'object').map((option, i) =>
                    <GeneralTopicItem key={i} option={option} handleChange={handleChange}></GeneralTopicItem>)}
            </div>

        )
    }
}



export default GeneralTopic