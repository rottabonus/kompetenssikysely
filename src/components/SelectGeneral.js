import React from 'react'
import jatka from '../img/PNG/jatka.png';
import GeneralTopic from './GeneralTopic';

const SelectGeneral = ({ topics, moveForward, handleChange }) => {

	const filterGeneral = topics.filter(t => t.category === 'yleinen' && typeof t === 'object')
	const generalTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object')
	const generalSubTopics = Object.values(generalTopics[0]).filter(t => t.category === 'Yleisettiedot' && typeof t === 'object')

	return (
		<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
					<h1 className="text">{generalTopics[0].text}</h1>
				</div>
				<div className="professionSelection">
					<form>
						{generalSubTopics.map((t, i) =>
							<GeneralTopic key={i} generalSubTopics={t} handleChange={handleChange}></GeneralTopic>)}
						<img src={jatka} id="cursor-hover" alt="Jatka" onClick={moveForward} />
					</form>
				</div></div></div>
	)
}

export default SelectGeneral;