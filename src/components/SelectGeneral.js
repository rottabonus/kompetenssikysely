import React from 'react'
import GeneralOptions from './GeneralOptions'
import jatka from '../img/PNG/jatka.png';

const SelectGeneral = ({ topics, moveForward }) => {


	// TODO: flatmap/reduce??
	const filterCategory = topics.filter(t => t.category === 'yleinen')
	/*const filterObjects = filterCategory.filter(t => typeof t === 'object')
	const filterSubtopic = Object.values(filterObjects[0]).map(t => t).filter(t => typeof t === 'object')
	const options = Object.values(filterSubtopic[0]).filter(t => t.category === 'Yleisettiedot')
	console.log('object: ', options)
	{options.map((op, i) =>
		<GeneralOptions key={i} options={op}></GeneralOptions>)}*/
	return (
		<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
					<h2 className="text">YLEINEN OSAAMINEN</h2>
				</div>
				<div className="professionSelection">
					<form>

						<img src={jatka} id="cursor-hover" alt="Jatka" onClick={moveForward} />
					</form>
				</div></div></div>
	)
}

export default SelectGeneral;
