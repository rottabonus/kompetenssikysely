import axios from 'axios'
import database from '../fire'

const getAll = async () => {
    const url = 'https://'+database.options.projectId+'.firebaseio.com/answers/.json'
    console.log(url)
  const response = await axios.get(url)
  let allTopics = []
  Object.values(response.data).forEach((elem) => {
    allTopics.push(elem)
  })
  return allTopics
}

export default { getAll }
