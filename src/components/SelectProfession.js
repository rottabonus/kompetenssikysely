import React from 'react'


const SelectProfession = ({ topics, selectProfessions, selectedTopics, changeProfessions }) => {

	const topicObjects = topics.filter(t => typeof t === 'object')
	
	return (
		<div>
		<h2>Select profession</h2>
		<form onSubmit={selectProfessions}>
		{topicObjects.filter(t => t.text !== 'yleinen').map((topic, i) => <div key={i}><p>{topic.text}<input onChange={() => changeProfessions(topic)} type="checkbox"/></p></div>)}
		<button type="submit">select</button>
		</form>
		</div>
		)
}

export default SelectProfession