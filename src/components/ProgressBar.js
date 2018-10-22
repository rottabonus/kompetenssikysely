import React from 'react'

const ProgressBar = (props) => {

    const jotain = Object.values(props.states).map(i => i)

    const percentage = (100 / jotain.length) * props.surveyState

    return (
        <div className="progress-bar">
            <Filler percentage={percentage} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}


export default ProgressBar
