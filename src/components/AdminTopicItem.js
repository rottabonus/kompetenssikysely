import React from 'react'

const AdminTopicItem = ({ topic, iteration,changeValue, saveChanges, editQuestions }) => {

 const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')
 //data-bame splitillä saada topic-text ja i 
//onClick={(e)=> click(e)} poistettu inputista
 return (
   <tr >
     <td>{topic.text}</td>

     {optionValues.map((option, i) => <td key={i}><input name={'edit'+i} data-iteration={iteration} data-bame={topic.text+ ":" + i} data-options={option.text + ":" + i} defaultValue={option.text}
     onClick={(e) => changeValue(e)} /></td>)}
<button onClick={()=> saveChanges(topic)}>save</button>
<button onClick={(e) => editQuestions(e)}>Edit</button>
   </tr>
 )
}

export default AdminTopicItem;