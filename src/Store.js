import React, { useReducer, useEffect } from 'react'
import io from 'socket.io-client'
export const CTX = React.createContext();

/*
 topic : [
     {from, msg}
 ]

*/
const initState = {
    general: [
        { from: 'aaron', msg: 'hello' },
        { from: 'aaron 1', msg: 'hello' },
        { from: 'aaron 2', msg: 'hello' },
    ],
    topic2: [
        { from: 'aaron', msg: 'hello' },
        { from: 'aaron 1', msg: 'hello' },
        { from: 'aaron 3', msg: 'hello' },
    ]
}



function reducer(state, action) {
    const { from, msg, topic } = action.payload
  
    switch (action.type) {

        case 'RECEIVE_MESSAGE':
            const abc = []
            console.log('aaa', abc)
        return {
            ...state,
            [topic]: [
                ...state[topic],
                { from, msg }
            ]
        }

        default:
            return state
    }
}
let socket

function sendChatAction(value) {
    socket.emit('chat message', value);

}
export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState)



    useEffect(() => {
        // setTimeout(() => {
        //     dispatch({ type: 'RECEIVE_MESSAGE', payload: {"from":"aaron0.33","msg":"ewqee","topic":"general"} })
        // },3000)        
        if (!socket) {
            socket = io(':3001')
            socket.on('chat message', function (msg) {
                console.log('msg', msg)
                setTimeout(() => {
                    dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
                }, 100)
                // dispatch({ type: 'RECEIVE_MESSAGE', payload: {"from":"aaron0.33","msg":"ewqee","topic":"general"} })
                // dispatch({ type: 'RECEIVE_MESSAGE', payload: {"from":"aaron0.33","msg":"ewqee","topic":"general"} })

            });
        }
    })
    const user = 'aaron' + Math.random(100).toFixed(2)

    return (
        <>
            {console.log('allChats Provider', allChats)}
            <CTX.Provider value={{ allChats, sendChatAction, user }}>{props.children}</CTX.Provider>

        </>
    )
}

