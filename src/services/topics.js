import axios from 'axios'

const getAll = async () => {
	const response = await axios.get('https://surveydev-740fb.firebaseio.com/topics/.json')
	return response.data
}

export default { getAll }