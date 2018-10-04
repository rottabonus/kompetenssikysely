import React from 'react'
import GeneralOptionOption from './GeneralOptionOption'

const GeneralTopicItem = ({ option, handleChange, name }) => {

	if (typeof option === "string") {
		return (
			<div><input type="radio" name={name} value={option.value} onChange={handleChange}></input>{option}</div>
		)
	} else {

		const options = Object.values(option).filter(option => typeof option === 'object')
		return (
			<div>
				<b>{option.text}</b><fieldset>
					{options.map((o, i) => <GeneralOptionOption key={i} option={o} handleChange={handleChange} name={option.text} ></GeneralOptionOption>)}
				</fieldset>
			</div>)
	}
}

export default GeneralTopicItem