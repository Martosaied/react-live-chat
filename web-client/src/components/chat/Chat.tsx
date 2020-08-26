import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PeopleList from './components/people-list/PeopleList'
import ChatToolbar from './components/chat-toolbar/ChatToolbar'
import ChatText from './components/chat-text/ChatText'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'
import LoginForm from './components/login-form/LoginForm'
import { Message } from 'models/message/model'
import { User } from 'models/user/model'

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
    },
    addUser: (username: string) => void,
    addMessage: (text: string) => void,
    users: User[],
    messages: Message[],
}

const ChatRoom: React.FC<IProps> = props => {
    const { addMessage, addUser } = props
    const { classes, messages, users } = props

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
