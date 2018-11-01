import React from 'react'

const GeneralTopicItem = ({ option, changeOption, parent, get }) => {

	if(option.category === 'Yleisettiedot'){

    return (
      <div>
        <b>{option.text}</b>
				<fieldset>
        {option.Options.map((o, i) => <div key={i}><input type="radio" name={option.text} data-aval={o} data-parent={option.category} checked={get('basic', o)} onChange={changeOption} required/>{o}</div>)}
				</fieldset>
			</div>
    )
  } else {

		const options = Object.values(option).filter(option => typeof option === 'object')

		return (
			<div>
				<b>{option.text}</b>
				<fieldset>
					{options.map((o, i) => <div key={i}><input type="radio" name={option.text} data-aval={o.value} data-parent={parent} checked={get(option.text, o.value)} onChange={changeOption} required/>{o.text}</div>)}
				</fieldset>
			</div>)
	}
}

export default GeneralTopicItem
