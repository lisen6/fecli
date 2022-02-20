import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
	let [count, setCount] = useState(0)

	const handleClick = () => {
		setCount(count + 1)
	}

	return <div onClick={handleClick}>点击了{count}次</div>
}

ReactDOM.render(<App />, document.querySelector('#root'))

console.log(author)

if (module.hot) {
	module.hot.accept()
}
