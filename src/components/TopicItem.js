import React from 'react'

const TopicItem = ({ topic, changeOption }) => {

const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')

		return (
		<div>
			<p>{topic.text}</p>
				<fieldset>
					{optionValues.map((option, i) => 
					<div key={i}><label>{option.text}</label><input type="radio" name={topic.text} 
					onChange={changeOption} value={option.value}/></div>)}
				</fieldset>
		</div>
	)
}

export default TopicItem
