import React from 'react'
import GeneralOptionOption from './GeneralOptionOption'

const GeneralTopicItem = ({ option }) => {

	if(typeof option === "string"){
		return (
			<div><p>{option}</p></div>
			)
	} else {

		const options = Object.values(option).filter(option => typeof option === 'object')

		return (
			<div>
			<b>{option.text}</b>
			{options.map((option, i) => <GeneralOptionOption key={i} option={option}></GeneralOptionOption>)}
			</div>)
	}	
}

export default GeneralTopicItem