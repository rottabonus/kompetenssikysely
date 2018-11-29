import React from 'react'

const GeneralTopicItem = ({ option, changeOption, parent, get }) => {

		const options = Object.values(option).filter(option => typeof option === 'object')

		return (
			<div className="topicItemContainer">
				<div>
					<p className="topicItemHeader">{option.text}</p></div><fieldset>
					{options.map((o, i) => <label className="topicItemOptions" key={i}><input type="radio" name={option.text} data-atext={option.text} data-acat={"yleinen"} data-aval={o.value} data-parent={parent} checked={get(option.text, o.value, parent)} onChange={changeOption} required /><span className="checkmark"></span>{o.text}</label>)}
				</fieldset>
			</div>)
}

export default GeneralTopicItem
