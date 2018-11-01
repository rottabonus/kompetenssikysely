import React from 'react';
import Topic from './Topic';

const List = ({ topics, changeOption, sendAnswers, moveBackward, getChecked }) => {

  return (
    <div>
      <div className="surveyContainer">
        <form onSubmit={sendAnswers}>
          {topics.map((topic, i) =>
            <Topic key={i} topic={topic} changeOption={changeOption} get={getChecked}></Topic>)}
          <button className="buttonBackward" onClick={(e) => moveBackward(e)}>Takaisin</button>
          <button className="buttonForward" type="submit">Lähetä vastaukset</button>
          {/* <button className="buttonstyleBackward" onClick={moveBackward}>Takaisin</button> */}
        </form>

      </div>
    </div>
  )
}

export default List
