import React from 'react'
import GeneralOptions from './GeneralOptions'

const SelectGeneral = ({ topics, moveForward }) => {

	const topicArray = topics.filter(t => t.category === 'yleinen')
	const filterObjects = topicArray.filter(t => typeof t === 'object')
	const pleasePlease = Object.values(filterObjects[0]).map(t => t).filter(t => typeof t === 'object')
	console.log('kato tätä', pleasePlease[0])
	const options = Object.values(pleasePlease[0]).filter(t => t.category === 'Yleisettiedot')
	console.log('object: ', options)
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Select profession</h1>
			</header>
			<div className="surveyContainer">
				<div className="professionSelectionText">
					<h2 className="text">YLEINEN OSAAMINEN</h2>

				</div>
				<div className="professionSelection">

					<form>
						{options.map((op, i) =>
							<GeneralOptions key={i} options={op}></GeneralOptions>)}
						<button onClick={moveForward}>Jatka</button>

					</form>





				</div></div></div>
	)
}

export default SelectGeneral;
