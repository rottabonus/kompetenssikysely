import React from 'react'

const AdminTopicItem = ({ topic, iteration,changeValue, deleteQuestion, saveChanges, editQuestions }) => {

 const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')
 //data-bame splitillä saada topic-text ja i
//onClick={(e)=> click(e)} poistettu inputista
 return (
   <tr >
     <td>{topic.text}</td>

<<<<<<< HEAD
     {optionValues.map((option, i) => <td key={i}><div class="adminList" name={'edit'+i} data-iteration={iteration} data-bame={topic.text+ ":" + i} data-options={option.text + ":" + i} defaultValue={option.text}
     onClick={(e) => changeValue(e)}>{option.text}</div></td>)}
<button onClick={(e) => editQuestions(e)}>Edit</button>
=======
     {optionValues.map((option, i) => <td key={i}><div className="adminTable" name={'edit'+i} data-iteration={iteration} data-bame={topic.text+ ":" + i} data-options={option.text + ":" + i} defaultValue={option.text}
     onClick={(e) => changeValue(e)}>{option.text}</div></td>)}
<button data-topic={topic.text} data-options={optionValues.map((option, i) => option.text + ":" + i + ":")} onClick={(e) => editQuestions(e)}>Edit</button>
>>>>>>> b92c57187fcb73107507261a8ba110d24157619c
<button id={iteration} data-iteration={topic.text + ":" + iteration} onClick={(e) => deleteQuestion(e)}>Delete</button>
   </tr>
 )
}

export default AdminTopicItem;
