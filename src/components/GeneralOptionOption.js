import React from 'react'

const GeneralOptionOption = ({ option, changeOption, name, parent }) => {

	return (
		<div>
			<input type="radio" value={option.value} name={name} data-parent={parent} onChange={changeOption} required/><div className="topicTextValue">{option.text}
			</div></div>)
}

export default GeneralOptionOption
