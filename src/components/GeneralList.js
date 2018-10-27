import React from 'react'
import GeneralTopic from './GeneralTopic'
import jatka from '../img/PNG/jatka.png'

const GeneralList = ({ topics, moveForward, changeOption, moveBackward }) => {

	return (
		<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
				</div>
				<div className="professionSelection">
					<form>
						{topics.map((t, i) =>
							<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption}></GeneralTopic>)}
						<button className="jatkaButton" onClick={moveForward}>Jatka</button>
						<button className="buttonstyleBackward" onClick={moveBackward}>Takaisin</button>
					</form>
				</div></div></div>
	)
}

export default GeneralList
