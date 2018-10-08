import React from 'react'
import jatka from '../img/PNG/jatka.png'
import GeneralTopic from './GeneralTopic'

const SelectGeneral = ({ topics, moveForward, changeOption }) => {

	const filterGeneral = topics.filter(t => t.category === 'yleinen' && typeof t === 'object')
	const generalTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object' && t.text === 'Yleiset tiedot')

	return (
		<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
					<h1 className="text">{generalTopics[0].text}</h1>
				</div>
				<div className="professionSelection">
					<form>
						{generalTopics.map((t, i) =>
							<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption}></GeneralTopic>)}
						<img src={jatka} id="cursor-hover" alt="Jatka" onClick={moveForward} />
					</form>
				</div></div></div>
	)
}

export default SelectGeneral
