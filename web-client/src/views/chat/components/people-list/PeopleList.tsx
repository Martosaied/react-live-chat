import { createStyles, List, ListItem, Avatar, ListItemText, Divider, withStyles } from "@material-ui/core"
import React from "react"
import { User } from 'models/user/model'

const peopleStyles = createStyles({
	list: {
		overflowY: 'scroll',
        height: '100%',
        width: '-webkit-fill-available',
		'&::-webkit-scrollbar': {
			width: '5px',
			height: '8px',
			backgroundColor: '#FFF'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#025279' //'#23232F' //'#0595DD'
		},
    },
    avatar: {
        marginRight: '10px',
    },
    title: {
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})

interface IProps {
    classes: any,
    users?: User[],
}

const defaultProps: IProps = {
    classes: {},
    users: [],
}

const PeopleList: React.FC<IProps> = props => {

	const classes: any = props.classes
	const users: User[] = props.users! //TODO: Delete ! operator when props are done

	return (
        <div className={classes.root}>
            <h3 className={classes.title}>{`Active Users (${users.length})`}</h3>
            <Divider />
            <List className={classes.list}>
                {users.map((user: User) => (
                    <React.Fragment key={user.id}>
                        <ListItem dense button>
                            <Avatar alt='Remy Sharp' src={user.avatar} className={classes.avatar} />
                            <ListItemText primary={user.username} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
	)
}

PeopleList.defaultProps = defaultProps

export default withStyles(peopleStyles)(PeopleList)