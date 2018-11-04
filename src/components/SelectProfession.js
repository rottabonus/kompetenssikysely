import React from 'react'
import jatka from '../img/PNG/jatka.png'

const SelectProfession = ({ topics, selectedTopics, changeProfessions, handleProfessionsAndMove }) => {

  return (
    <div className="App">
      <div className="surveyContainer">
        <div className="professionSelectionText">
          <h2 className="text">ASIANTUNTIJAN OSAAMINEN</h2>
          <div><p>Asiantuntijan osaaminen on kuvattu neljän tyypillisen liiketoiminnan suuntautumisen suhteen.</p></div>
          <div><p>Kyselyyn on poimittu niitä osaamisia, joita ammattilaiselta odotetaan globaalissa ja digitalisoituvassa
                        työelämässä asiantuntijan roolissa.</p></div>
          <div><p>Valitse yksi tai useampi seuraavista alueista:</p></div>
        </div>
        <div className="professionSelection2">
          <form>
            {topics.filter(t => t.text !== 'yleinen').map((topic, i) =>
              <label className="container" key={i}><input onChange={() => changeProfessions(topic)} type="checkbox"/><span className="checkmark"></span>{topic.text}</label>)}
            {/*<button className="selectionButton" type="submit">Select</button>*/}
            <input className="jatkaButton" type="image" src={jatka} id="cursor-hover" alt="Jatka" onClick={handleProfessionsAndMove} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default SelectProfession
