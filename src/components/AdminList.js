import React from 'react';
import AdminTopicItem from './AdminTopicItem'

const AdminList = ({ topics, deleteProf, showQuestions, questions, deleteQuestion , saveChanges, changeValue, editQuestions, selectedProf }) => {



 if (topics.topic === questions.text ) {
   return (
     <tbody>
     {topics.filter(t => t.text !== 'yleinen').map((topic, i) => (
     <tr key={i} >
     <td>{topic.text}</td>
     <td>{i}</td>
     <td><button id={topic.text} onClick={(e) =>
      window.confirm('Are you sure you want to delete this item?') &&
      deleteProf(e)}>Delete</button></td>
     <td><button id={topic.text} onClick={showQuestions}>Edit</button></td>
     </tr>
     ))}
     {selectedProf !== '' ? <tr><td>Kysymykset kompetenssiin <b>{selectedProf}</b> alla</td></tr> : null}
     {questions.map((a, i) =>
       <AdminTopicItem key={i} topic={a} iteration={i} saveChanges={saveChanges} changeValue={changeValue}
       editQuestions={editQuestions} deleteQuestion={deleteQuestion}/>
       )}
</tbody>
   )
 }

 return (
   <div>
   {topics.filter(t => t.text !== 'yleinen').map((topic, i) => (
   <tr key={i} >
   <td>{topic.text}</td>
   <td>{i}</td>
   <td><button id={topic.text} onClick={(e) =>
      window.confirm('Are you sure you want to delete this item?') &&
      deleteProf}>Delete</button></td>
   <td><button id={topic.text} onClick={showQuestions}>Edit</button></td>
   </tr>
   ))}
   </div>
 )
}

export default AdminList
