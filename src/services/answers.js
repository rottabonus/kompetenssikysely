import axios from 'axios'

const getAll = async () => {
	const response = await axios.get('https://surveydev-740fb.firebaseio.com/answers.json')
	return response.data
}

export default { getAll }