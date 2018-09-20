import React from 'react'
import Topic from './Topic'
import List from './List'

const SelectProfession = ({ topics, selectProfessions, selectedTopics, changeProfessions, show, subs, changeOption, Topic }) => {

	const topicObjects = topics.map(t => t).filter(t => t.category !== 'ammatti')
	const lol = topicObjects.filter(t => typeof t === "object")
	const yleiset = Object.values(lol[0]).map(lol => lol).filter(obj => obj.text !== undefined)
	//console.log(topicObjects.length, topicObjects, typeof topicObjects)
	console.log('lol0', lol[0])
	//console.log('yleiset', yleiset)

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Select general</h1>
			</header>

			<div className="professionSelection">
				<form onSubmit={selectProfessions}>

					<button className="selectionButton" type="submit">select</button>
				</form>
			</div>
		</div>

	)
}

export default SelectProfession
