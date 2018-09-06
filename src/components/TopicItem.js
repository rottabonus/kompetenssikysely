import React from 'react'

const TopicItem = ({ topic }) => {

const optionKeys = Object.keys(topic).map(option => option).filter(o => o.indexOf('option') !== -1)


console.log(optionKeys)

return (
<div>
<p>{topic.text}</p>
{optionKeys.map(option => <p>{option}</p>)}
</div>
	)
}

export default TopicItem

//{optionArray.map(option => <p>{option.text}</p>)}