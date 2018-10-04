import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('https://surveydev-740fb.firebaseio.com/answers.json')
  let allAnswers = []
  Object.values(response.data).forEach((elem) => {
    allAnswers.push(elem)
  })
  return allAnswers
}

export default { getAll }
