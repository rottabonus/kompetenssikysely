import React from 'react'
import TopicItem from './TopicItem'

const Topic = ({ topic, show, subs, changeOption }) => {

  if(subs.length === 0) {
    return (
      <div className="topicContainer">
        <h2 onClick={(e) => show(e, topic)}>{topic.topic}</h2>
      </div>
    )
  } else {

    const obj = subs[0]
    const topicArray = Object.values(obj).map(topic => topic)

    return (
      <div className="topicContainer">
        <h2 onClick={(e) => show(e, topic)}>{topic.topic}</h2>
        {subs[0].text !== topic.topic ? null :
          topicArray.map((topic, i) =>
            <TopicItem key={i} changeOption={changeOption} topic={topic} ></TopicItem>)}
      </div>
    )
  }
}

export default Topic
