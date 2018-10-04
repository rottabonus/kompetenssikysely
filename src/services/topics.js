import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('https://surveydev-740fb.firebaseio.com/topics/.json')
  let allTopics = []
  Object.values(response.data).forEach((elem) => {
    allTopics.push(elem)
  })
  return allTopics
}

export default { getAll }
