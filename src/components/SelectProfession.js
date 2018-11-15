import React from 'react'
import jatka from '../img/PNG/jatka.png'

const SelectProfession = ({ topics, selectedTopics, changeProfessions, handleProfessionsAndMove, getChecked, move }) => {

  return (
    <div className="App">
      <div className="surveyContainer">
        <div className="professionSelectionText">
          <h3>ASIANTUNTIJAN OSAAMINEN</h3>
          <div><p>Asiantuntijan osaaminen on kuvattu neljän tyypillisen liiketoiminnan suuntautumisen suhteen.</p></div>
          <div><p>Kyselyyn on poimittu niitä osaamisia, joita ammattilaiselta odotetaan globaalissa ja digitalisoituvassa
                        työelämässä asiantuntijan roolissa.</p></div>
          <div><b>Valitse yksi tai useampi seuraavista alueista:</b></div>
        </div>
        <div className="professionSelection">
          <form onSubmit={handleProfessionsAndMove}>
            {topics.filter(t => t.text !== 'yleinen').map((topic, i) =>
              <label className="topicItemOptions" key={i}><input onChange={() => changeProfessions(topic)} type="checkbox" checked={getChecked(topic.text)} /><span className="checkmark"></span>{topic.text}</label>)}
            {/*<button className="selectionButton" type="submit">Select</button>*/}

            {/*   <button className="buttonstyleBackward" onClick={moveBackward}>Takaisin</button>*/}
            <button className="buttonBackward" onClick={(e) => move(e, -1)}>Takaisin</button>
            <button className="buttonForward" type="submit">Jatka</button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default SelectProfession
