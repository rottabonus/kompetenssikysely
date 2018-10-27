import React from 'react'
import jatka from '../img/PNG/jatka.png'

const SelectProfession = ({ topics, selectedTopics, changeProfessions, handleProfessionsAndMove, moveBackward }) => {

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
        <div className="professionSelection">
          <form>
            {topics.filter(t => t.text !== 'yleinen').map((topic, i) =>
              <div key={i}><input onChange={() => changeProfessions(topic)} className="selectionInput" type="checkbox" />{topic.text}</div>)}
            {/*<button className="selectionButton" type="submit">Select</button>*/}
            <button className="jatkaButton" onClick={handleProfessionsAndMove}>Jatka</button>
            <button className="buttonstyleBackward" onClick={moveBackward}>Takaisin</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SelectProfession
