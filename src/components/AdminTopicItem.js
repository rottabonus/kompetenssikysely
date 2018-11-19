import React from 'react'

const AdminTopicItem = ({ topic, iteration, click,changeValue, saveChanges }) => {

  const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')

  return (
    <tr >
      <td>{topic.text}</td>

      {optionValues.map((option, i) => <td key={i}><input name={'edit'+i} data-bame={topic.text+ ":" + i} defaultValue={option.text}
      onChange={(e) => changeValue(e)} onClick={(e)=> click(e)}/></td>)}
      <td><button onClick={()=> saveChanges(topic)}>save</button></td>
    </tr>
  )
}

export default AdminTopicItem
