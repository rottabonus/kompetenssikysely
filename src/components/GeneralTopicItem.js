import React from 'react'
import GeneralOptionOption from './GeneralOptionOption'

const GeneralTopicItem = ({ option, changeOption, parent }) => {

	if(option.category === 'Yleisettiedot'){

    return (
      <div className="generalTopic">
			<div className="topicFont">
        <b>{option.text}</b></div>
        {option.Options.map((o, i) => <label className="container" key={i}><input type="radio" name={option.text} value={o} data-parent={option.category} onChange={changeOption} ></input><span className="checkmark"></span><div className="topicTextValue">{o}</div></label>)}
      </div>
    )
  } else {

		const options = Object.values(option).filter(option => typeof option === 'object')
		return (
			<div className="generalTopic">
			<div className="topicFont">
				<b>{option.text}</b></div><fieldset>
					{options.map((o, i) => <GeneralOptionOption key={i} option={o} changeOption={changeOption} parent={parent} name={option.text} ></GeneralOptionOption>)}
				</fieldset>
			</div>)
	}
}

export default GeneralTopicItem
