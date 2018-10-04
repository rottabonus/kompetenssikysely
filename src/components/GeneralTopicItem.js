import React from 'react'
import GeneralOptionOption from './GeneralOptionOption'

const GeneralTopicItem = ({ option }) => {

	if(option.category === "Yleisettiedot"){
		return (
			<div>
				<b>{option.text}</b>
				{option.Options.map((option, i) => <GeneralOptionOption key={i} option={option}></GeneralOptionOption>)}
			</div>
				)
	} else {

		
	const options = Object.values(option).filter(option => typeof option === 'object')

	console.log(options)
	console.log('moi',options.map(o => o))

		return (
			<div>
			<b>{option.text}</b>
			{options.map((option, i) => <GeneralOptionOption key={i} option={option}></GeneralOptionOption>)}
			</div>)
	}	
}

export default GeneralTopicItem