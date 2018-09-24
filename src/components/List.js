import React from 'react'
import Topic from './Topic'

const List = ({ topics, show, subs, changeOption, sendAnswers }) => {

  return (
    <div>
      <div className="surveyContainer">
        <form onSubmit={sendAnswers}>
          {topics.map((topic, i) =>
            <Topic key={i} topic={topic} show={show} subs={subs} changeOption={changeOption}></Topic>)}
          <button type="submit">Send answers</button>
        </form>
      </div>
    </div>
  )
}

export default List