import React from 'react'
import GeneralTopic from './GeneralTopic'
import jatka from '../img/PNG/jatka.png'

const GeneralList = ({ topics, move, changeOption, answers, getChecked }) => {

	console.log(answers)

	return (
		<div className="App">
			<div className="surveyContainer">


				<form onSubmit={(e) => move(e, 1)}>
					{topics.map((t, i) =>
						<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption} answers={answers} get={getChecked}></GeneralTopic>)}
					<button className="buttonBackward" onClick={(e) => move(e, -1)}> Takaisin </button>
					<button className="buttonForward" type="submit">Jatka</button>
				</form>

			</div></div>
	)
}

export default GeneralList
