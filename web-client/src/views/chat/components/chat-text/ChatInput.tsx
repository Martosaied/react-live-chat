import React, { useState, useEffect } from "react"
import { createStyles, Paper, Input, withStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

const chatInputStyles = createStyles({
	composeInputPaper: {
        display: 'flex',
        marginTop: '16px',
	},
	composeInput: {
        padding: '16px',
	},
	sendIcon: {
		color: '#2196f3'
	},
})

interface IProps {
    classes: any
    handleSendButton?: Function
}

const defaultProps: IProps = {
    classes: {},    
}

const ChatInput: React.FC<IProps> = props => {

		const classes = props.classes

        const [text, setText] = useState('')

        const handleTextChange = (event: any) => setText(event.target.value)
        const handleSendButton = (): any => {
            setText('')
            props.handleSendButton!(text)
        }

        const handleUserKeyPress = (event: any) => {
            const { keyCode } = event;
        
            if (keyCode === 13) {
                event.preventDefault();
                handleSendButton()
            }
        };

        useEffect(() => {
            window.addEventListener('keydown', handleUserKeyPress);
        
            return () => {
              window.removeEventListener('keydown', handleUserKeyPress);
            };
        });

        return (
			<Paper className={classes.composeInputPaper} elevation={4}>
                <Input 
                    classes={{ root: classes.composeInput }} multiline={true} value={text} 
                    fullWidth={true} disableUnderline={true} placeholder={'Send a message!'} 
                    onChange={handleTextChange}    
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSendButton}
                    endIcon={<SendIcon className={classes.searchIcon} />}
                >
                    Send
                </Button>
			</Paper>
		)

}

ChatInput.defaultProps = defaultProps

export default withStyles(chatInputStyles)(ChatInput)
