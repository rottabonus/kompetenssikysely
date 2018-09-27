import React from 'react'


const GeneralOptions = ({ options }) => {
    const optionValues = Object.values(options).map(t => t)
    console.log(optionValues[0])

    return (
        <div className="topicContainer">
            <h2>{options.text}</h2>
            <p>{optionValues[0]}</p>
        </div>
    )
}

export default GeneralOptions
