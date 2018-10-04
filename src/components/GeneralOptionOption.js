import React from 'react'

const GeneralOptionOption = ({ option, handleChange, name }) => {

	return (
		<div>
			<input type="radio" value={option.value} name={name} onChange={handleChange} />{option.text}
		</div>)
}

export default GeneralOptionOption