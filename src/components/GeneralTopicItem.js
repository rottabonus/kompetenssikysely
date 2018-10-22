import React from 'react'
import GeneralOptionOption from './GeneralOptionOption'

const GeneralTopicItem = ({ option, changeOption, parent }) => {

	if(option.category === 'Yleisettiedot'){

    return (
      <div>
        <b>{option.text}</b>
<<<<<<< HEAD
        {option.Options.map((o, i) => <div key={i}><input type="radio" name={option.text} value={o} data-parent={option.category} onChange={changeOption} required></input>{o}</div>)}
=======
        {option.Options.map((o, i) => <div key={i}><input type="radio" name={option.text} value={o} data-parent={option.category} onChange={changeOption} ></input>{o}</div>)}
>>>>>>> 27646e52d8ff0782cf0d078c5d574aae78e8a7db
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
