import React from 'react'
import Topic from './Topic'

const List = ({ topics, changeOption, sendAnswers }) => {

  return (
    <div>
      <div className="surveyContainer">
        <form onSubmit={sendAnswers}>
          {topics.map((topic, i) =>
            <Topic key={i} topic={topic} changeOption={changeOption}></Topic>)}
          <button type="submit">Send answers</button>
        </form>
      </div>
    </div>
  )
}

export default List
