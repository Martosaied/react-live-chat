import { createStyles, Toolbar, Typography, Input, withStyles } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import React from "react"

const chatToolbarStyles = createStyles({
	chatToolbarRoot: {
		color: '#FFF',
		margin: '8px',
		minHeight: '32px',
		backgroundColor: '#0377ad', //'#0595DD', //'#23232F',
		borderRadius: '2px'
	},
	innerContent: {
		width: '100%',
	},
	chatTitle: {
		margin: '0 auto'
	},
	searchWrapper: {
		backgroundColor: '#025279',
		borderRadius: '3px',
		border: 'solid 1px #025279',
		color: '#FFF',
		margin: '5px'
	},
	searchInput: {
		width: '180px',
		paddingLeft: '8px',
		transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		'&::placeholder': {
			color: '#FFF',
			opacity: 1
		},
		'&:focus': {
			width: '300px'
		}
	},
	searchIcon: {
		color: '#FFF',
		marginTop: '3px'
	}
})

interface IProps {
    classes: any,
}

const ChatToolbar: React.FC<IProps> = props => {


		const { classes } = props

		return (
			<Toolbar disableGutters={true} className={classes.chatToolbarRoot}>
				<Typography className={classes.chatTitle} color="inherit">
                    Now talking in "Wonderful Chatroom"
				</Typography>
				<Input classes={{ root: classes.searchWrapper, input: classes.searchInput }} disableUnderline={true} placeholder={'Search'} 
					endAdornment={<SearchIcon className={classes.searchIcon} />}
				/>        
			</Toolbar>
		)

}

export default withStyles(chatToolbarStyles)(ChatToolbar)