import React from 'react'

const SelectProfession = ({ topics, selectProfessions, selectedTopics, changeProfessions }) => {

  const topicObjects = topics.filter(t => typeof t === 'object')

  return (
    <div>
        <div className="surveyContainer">
        <div className="professionSelectionText">
      <h2 className="text">ASIANTUNTIJAN OSAAMINEN</h2>
        <div><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p></div>
        <div><p>In lobortis ultricies erat, in consequat massa dictum eu. Ut est dui, dignissim aliquet ex at,
                    accumsan congue sapien. Integer nec diam id ex eleifend mollis.</p></div>
        <div><p> Etiam molestie nunc eget ligula porta, malesuada luctus ipsum pharetra.</p></div>
      </div>
      <div className="professionSelection">
      <form onSubmit={selectProfessions}>
        {topicObjects.filter(t => t.text !== 'yleinen').map((topic, i) =>
          <div key={i}><input onChange={() => changeProfessions(topic)} className="selectionInput" type="checkbox"/>{topic.text}</div>)}
        <button className="selectionButton" type="submit">select</button>
      </form>
      </div>
      </div>
    </div>
  )
}

export default SelectProfession
