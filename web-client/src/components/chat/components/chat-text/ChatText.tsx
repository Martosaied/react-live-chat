import React from "react"
import { createStyles, Paper, Avatar, withStyles, Chip } from "@material-ui/core"
import { Message } from 'models/message/model'
import ChatInput from "./ChatInput"

const chatTextStyles = createStyles({
	root: {
		margin: '8px',
		height: 'calc(100% - 80px)',
	},
	chatInputPaper: {
		height: 'calc(100% - 64px)'
	},
	chatInput: {
		overflowY: 'scroll',
		height: '100%',
		padding: '16px',
	},
	chatRoomMessage: {
		display: 'flex',
		marginBottom: '8px'
	},
	username: {
        fontSize: '10px',
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '5px',
    },
    text: {
        marginLeft: '5px',
    }
})

interface IProps {
    classes: any
    messages?: Message[]
    handleSendButton?: Function
}

const defaultProps: IProps = {
    classes: {},
    messages: [],
    
}

const ChatText: React.FC<IProps> = props => {

		const messages = props.messages! //TODO: Delete ! operator when props are done
		const classes = props.classes

        return (
			<section className={classes.root}>
				<Paper className={classes.chatInputPaper} elevation={4}>
					<div className={classes.chatInput}>
						{messages.map((message: Message) => {
							return (
								<React.Fragment key={message.id}>
                                    <div className={classes.chatRoomMessage}>
                                        <Avatar alt={message.user.username} src={message.user.avatar} />
                                        <div className={classes.text}>
                                            <p className={classes.username}><strong>{message.user.username}</strong></p>
                                            <Chip label={message.text} />
                                        </div>
                                    </div>
								</React.Fragment>
							)
						})}

					</div>
				</Paper>
                <ChatInput handleSendButton={props.handleSendButton} />
			</section>
		)

}

ChatText.defaultProps = defaultProps

export default withStyles(chatTextStyles)(ChatText)
