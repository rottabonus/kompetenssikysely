import React from 'react'
import GeneralTopic from './GeneralTopic'
import jatka from '../img/PNG/jatka.png'

const GeneralList = ({ topics, moveForward, changeOption, moveBackward, getChecked }) => {

	return (
		<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
				</div>
				<div className="professionSelection">
					<form onSubmit={moveForward}>
						{topics.map((t, i) =>
							<GeneralTopic key={i} topics={t} changeOption={changeOption} get={getChecked}></GeneralTopic>)}
						<button type="submit">Jatka</button>
					</form>s
					<button onClick={(e)=> moveBackward(e)}> takaisin </button>
				</div></div></div>
	)
}

export default GeneralList
