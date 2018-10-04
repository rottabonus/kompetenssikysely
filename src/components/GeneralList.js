import React from 'react'
import GeneralTopic from './GeneralTopic'
import jatka from '../img/PNG/jatka.png';

const GeneralList = ({ topics, moveForward, subs}) => {

	const filterGeneral = topics.filter(t => t.category === 'yleinen' && typeof t === 'object')
	const generalTopics = Object.values(filterGeneral[0]).map(t => t).filter(t => typeof t === 'object' && t.text !== 'Yleiset tiedot')

	return (
			<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
				</div>
				<div className="professionSelection">
					<form>
						{generalTopics.map((t, i) =>
							<GeneralTopic key={i} generalSubTopics={t}></GeneralTopic>)}
						<img src={jatka} id="cursor-hover" alt="Jatka" onClick={moveForward} />
					</form>
				</div></div></div>
		)
} 

export default GeneralList