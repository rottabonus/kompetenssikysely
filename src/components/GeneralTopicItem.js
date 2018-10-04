import React from 'react'
import GeneralOptionOption from './GeneralOptionOption'

const GeneralTopicItem = ({ option, changeOption, parent }) => {

	if(option.category === 'Yleisettiedot'){

		console.log('name',option.text, 'parent', option.category, 'value', option)
    return (
      <div>
        <b>{option.text}</b>
        {option.Options.map((o, i) => <div key={i}><input type="radio" name={option.text} value={o} data-parent={option.category} onChange={changeOption}></input>{o}</div>)}
      </div>
    )
  } else {

		const options = Object.values(option).filter(option => typeof option === 'object')
		return (
			<div>
				<b>{option.text}</b><fieldset>
					{options.map((o, i) => <GeneralOptionOption key={i} option={o} changeOption={changeOption} parent={parent} name={option.text} ></GeneralOptionOption>)}
				</fieldset>
			</div>)
	}
}

export default GeneralTopicItem
