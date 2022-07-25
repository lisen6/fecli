import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import user from './user'

function App() {
	let [count, setCount] = useState(0)

	const handleClick = () => {
		setCount(count + 1)
	}

	return (
		<div onClick={handleClick}>
			{user}点击了{count}次
		</div>
	)
}

ReactDOM.render(<App />, document.querySelector('#root'))

console.log(author)

if (module.hot) {
	module.hot.accept()
}
