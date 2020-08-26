import React, { useState, useEffect } from 'react'
import useSocket from 'hooks/useSocket'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PeopleList from './components/people-list/PeopleList'
import ChatToolbar from './components/chat-toolbar/ChatToolbar'
import ChatText from './components/chat-text/ChatText'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import LoginForm from './components/login-form/LoginForm'

const styles = createStyles({
	root: {
		margin: '16px',
		height: 'calc(100vh - 32px)'
	},
	paper: {
		height: '100%'
	},
	gridContainer: {
		height: 'inherit'
	},
	gridItem: {
		height: '100%'
	},
	'@global': {
		'body': {
			fontFamily: '"Roboto"'
		}
	}
})

interface IProps {
    classes: {
        root: string
        paper: string
        gridContainer: string
        gridItem: string
        '@global': string
    }
    addMessage?: Function
}

const ChatRoom: React.FC<IProps> = props => {
        const PORT = process.env.PORT || 3000;
        const socket: any = useSocket(`https://msaied-chat-example.herokuapp.com/`)

        const { classes } = props
        
        const [messages, setMessages] = useState<Array<any>>([]);
        const [users, setUsers] = useState<Array<any>>([]);

        useEffect(() => {
            const handleUpdateUsers = (users: any) => {
                setUsers([...users])
            }

            if (socket) {
                socket.on('UPDATE_USERS', handleUpdateUsers)
            }
        }, [socket, users])

        useEffect(() => {
            const handleUpdateMessages = (message: any) => {
                setMessages(messages => [...messages, message])
            }

            if (socket) {
                socket.on('UPDATE_MESSAGES', handleUpdateMessages)
            }
        }, [socket])

        const addMessage = (text: string) => {
            socket.emit('ADD_MESSAGE', text)
        }

        const addUser = (username: string) => {
            socket.emit('ADD_USER', username)
        }
    
		return (
			<div className={classes.root}>
                <LoginForm onSubmit={addUser} />
			    <Paper className={classes.paper} elevation={2}>
					<Grid container spacing={0} className={classes.gridContainer}>
						<Hidden mdDown>
							<Grid item md={2} className={classes.gridItem}>
								<PeopleList users={users} />
							</Grid>
						</Hidden>
						<Grid item xs={12} md={10} className={classes.gridItem}>
							<ChatToolbar />
							<ChatText messages={messages} handleSendButton={addMessage} />
						</Grid>
					</Grid>
				</Paper>
			</div>
		)
}

export default withStyles(styles)(ChatRoom)
