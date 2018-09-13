import React from 'react'


const SelectProfession = ({ topics, selectProfessions, selectedTopics, changeProfessions }) => {

	const topicObjects = topics.filter(t => typeof t === 'object')
	
	return (
		<div>
			<h2 className="text">ASIANTUNTIJAN OSAAMINEN</h2>
			<div>
			<div><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p></div>
			<div><p>In lobortis ultricies erat, in consequat massa dictum eu. Ut est dui, dignissim aliquet ex at, 
					accumsan congue sapien. Integer nec diam id ex eleifend mollis.</p></div>
			<div><p> Etiam molestie nunc eget ligula porta, malesuada luctus ipsum pharetra.</p></div>
			</div>
				<form onSubmit={selectProfessions}>
					{topicObjects.filter(t => t.text !== 'yleinen').map((topic, i) => 
					<div className="checkBox" key={i}><input onChange={() => changeProfessions(topic)} type="checkbox"/><p>{topic.text}</p></div>)}
						<button type="submit">select</button>
				</form>
		</div>
	)
}

export default SelectProfession