import React from 'react'

const GeneralTopicItem = ({ option, changeOption, parent, get }) => {

	if (option.category === 'Yleisettiedot') {

		return (
			<div className="topicItemContainer">
				<div>
					<p className="topicItemHeader">{option.text}</p>
					<fieldset>
						{option.Options.map((o, i) => <label className="topicItemOptions" key={i}><input type="radio" name={option.text} data-aval={o} data-parent={option.category} checked={get('basic', o)} onChange={changeOption} required /><span className="checkmark"></span>{o}</label>)}
					</fieldset></div>
			</div>
		)
	} else {

		const options = Object.values(option).filter(option => typeof option === 'object')

		return (
			<div className="topicItemContainer">
				<div>
					<p className="topicItemHeader">{option.text}</p></div><fieldset>
					{options.map((o, i) => <label className="topicItemOptions" key={i}><input type="radio" name={option.text} data-aval={o.value} data-parent={parent} checked={get(option.text, o.value)} onChange={changeOption}  required /><span className="checkmark"></span>{o.text}</label>)}
				</fieldset>
			</div>)
	}
}

export default GeneralTopicItem
