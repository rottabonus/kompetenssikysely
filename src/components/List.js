import React from 'react'
import Topic from './Topic'

const List = ({ topics, show, subs, changeOption, sendAnswers }) => {

  return (
    <div className="App">
        <header className="App-header">
            <h1 className="App-title">Profession questions</h1>
        </header>
      <h2>This is a List</h2>
      <form onSubmit={sendAnswers}>
        {topics.map((topic, i) =>
          <Topic key={i} topic={topic} show={show} subs={subs} changeOption={changeOption}></Topic>)}
        <button type="submit">send answers</button>
      </form>
    </div>
  )
}

export default List
