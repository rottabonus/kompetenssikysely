import React from 'react'

const GeneralOptionOption = ({ option, changeOption, name, parent }) => {

	return (
		<label className="container">
			<input type="radio" value={option.value} name={name} data-parent={parent} onChange={changeOption} required/><span className="checkmark"></span><div className="topicTextValue">{option.text}
			</div></label>)
}

export default GeneralOptionOption
