import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { TextField } from '@material-ui/core';

import Chip from '@material-ui/core/Chip';

import { CTX } from './Store'

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        margin: '20px auto',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    displayFlex: {
        display: 'flex'
    }
});

export default function Dashboard() {
    const classes = useStyles();
    const { allChats, sendChatAction, user } = React.useContext(CTX)

    const topics = Object.keys(allChats)

    const [textValue, setTextValue] = React.useState('')
    const [topicActive, setTopicActive] = React.useState(topics[0])

    // CTX is context Store 
    console.log('allChats',allChats)
    return (
        <>
            <div>Dashboard</div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Topic: {topicActive}
                    </Typography>
                    <div className={classes.displayFlex}>
                        <List>
                            {topics.map((topic, index) => {
                                return (
                                    <ListItem key={index} onClick={(e) => setTopicActive(e.target.innerText)}>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                )
                            })}
                        </List>
                        <ul className={classes.ul}>
                        {allChats[topicActive].map((item, index) => (
                            <div key={index}>
                                <ListItem>
                                    <Chip label={item.from} />
                                    <Typography>{item.msg}</Typography>
                                </ListItem>
                            </div>
                        ))}
                        </ul>
                    </div>
                </CardContent>
                {/* <CardActions> */}
                <TextField id="time" value={textValue} fullWidth onChange={(e) => setTextValue(e.target.value)} />
                {/* <input onChange={(e) => setTextValue(e.target.value)} />  */}
                <Button size="small"
                    onClick={() => { sendChatAction({ from: user, msg: textValue, topic: topicActive }); setTextValue('') }}>Send</Button>
                {/* </CardActions> */}
            </Card>
        </>
    );
}

