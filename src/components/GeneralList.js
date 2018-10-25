import React from 'react'
import GeneralTopic from './GeneralTopic'
import jatka from '../img/PNG/jatka.png'

const GeneralList = ({ topics, moveForward, changeOption }) => {

	return (
		<div className="App">
			<div className="surveyContainer">
				<div className="professionSelectionText">
				</div>
				<div className="professionSelection">
					<form>
						{topics.map((t, i) =>
							<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption}></GeneralTopic>)}
						<img src={jatka} id="cursor-hover" alt="Jatka" onClick={moveForward} />
					</form>
				</div></div></div>
	)
}

export default GeneralList
