import React from 'react'
import logo from './logo.svg'
import './App.css'
import type { User, Contact } from './types'

function App() {
	const user: User = {
		name: 'Naveen',
		address: '17A3 main',
		mobile: 6383865425
	}
	const contact: Contact = {
		email: 'naveenrocks62',
		mobile: 6383865425
	}
	console.log(user, contact)
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
          Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
          Learn React
				</a>
			</header>
		</div>
	)
}

export default App
