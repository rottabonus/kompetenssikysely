import React from 'react'
import TopicItem from './TopicItem'


const Topic = ({ topic, show, sub }) => {
	if(sub.length === 0) {
	return (
	<div>
	<h2 onClick={(e) => show(e, topic)}>{topic.text}</h2>
	</div>
	)
	} else {

let arr = []
let obj = sub[0]
Object.keys(obj).forEach(function (key) {
	if(typeof obj[key] === 'object'){
		arr.push(obj[key])
	}
})
		return (
	<div>
	<h2 onClick={(e) => show(e, topic)}>{topic.text}</h2>
	{sub[0].text !== topic.text ? null : arr.map(topic => <TopicItem topic={topic} key={topic.text}></TopicItem>)}
	</div>
	)
	}
}

export default Topic


//if (sub[0].text === topic.text)