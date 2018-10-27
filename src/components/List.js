import React from 'react';
import Topic from './Topic';


const List = ({ topics, changeOption, sendAnswers, moveBackward }) => {

  return (
    <div>
      <div className="surveyContainer">
        <form onSubmit={sendAnswers}>
          {topics.map((topic, i) =>
            <Topic key={i} topic={topic} changeOption={changeOption}></Topic>)}
         <button className="buttonstyle" type="submit">Send answers</button>
          <button className="buttonstyleBackward" onClick={moveBackward}>Takaisin</button>
        </form>
      </div>
    </div>
  )
}

export default List
