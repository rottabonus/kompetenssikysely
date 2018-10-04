import React from 'react'

const GeneralOptionOption = (option) => {

  if(option.option.text !== undefined){
    return(
      <div>
        <p>{option.option.text}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{option.option}</p>
      </div>)
  }
}

export default GeneralOptionOption
