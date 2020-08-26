import React, { useState } from 'react'
import config from 'configs'
import { useSocket, useSocketListener } from 'hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import Chat from 'components/chat/Chat'
import 'fontsource-roboto'
import { Message } from 'models/message/model'
import { User } from 'models/user/model'

const App = () => {
    const socket: SocketIOClient.Socket = useSocket(config.socketServer)!
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [islogged, setIslogged] = useState(false);

    useSocketListener(socket, (users: User[]) => {
        setUsers([...users])
    }, 'UPDATE_USERS')

    useSocketListener(socket, (message: Message) => {
        setMessages(messages => [...messages, message])
    }, 'UPDATE_MESSAGES')

    const addMessage = (text: string) => {
        if (islogged) {
            socket.emit('ADD_MESSAGE', text)
        }
    }

    const addUser = (username: string) => {
        socket.emit('ADD_USER', username)
        setIslogged(true);
    }

    return (
		<React.Fragment>
			<CssBaseline />
            <Chat 
                addMessage={addMessage} 
                addUser={addUser}
                messages={messages} 
                users={users} />
		</React.Fragment>
	)
}
	
export default App
