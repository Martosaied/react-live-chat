import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Chat from 'views/chat/Chat'
import 'fontsource-roboto'
import './App.css'

const App = () => {
    return (
		<React.Fragment>
			<CssBaseline />
			<Chat />
		</React.Fragment>
	)
}
	
export default App
