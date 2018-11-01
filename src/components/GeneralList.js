import React from 'react'
import GeneralTopic from './GeneralTopic'
import jatka from '../img/PNG/jatka.png'

const GeneralList = ({ topics, moveForward, changeOption, answers, moveBackward, getChecked }) => {

	return (
		<div className="App">
			<div className="surveyContainer">


				<form onSubmit={moveForward}>
					{topics.map((t, i) =>
						<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption} answers={answers} get={getChecked}></GeneralTopic>)}
					<button className="buttonBackward" onClick={(e) => moveBackward(e)}> Takaisin </button>
					<button className="buttonForward" type="submit">Jatka</button>
				</form>

			</div></div>
	)
}

export default GeneralList
