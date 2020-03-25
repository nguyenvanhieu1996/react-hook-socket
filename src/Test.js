// App.js

import React, { useState } from 'react';
const [socket] = useSocket('socket-url')
import useSocket from 'use-socket.io-client';

export default () => {
    const [id, setId] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [room, setRoom] = useState("");

    const [id, setId] = useState('');
    const [socket] = useSocket('<https://open-chat-naostsaecf.now.sh>');

    socket.connect();
    console.log(socket);

    const [data, setData] = useImmer(default_value)

    setData(draftState => {
        draftState.operation();
    });

    // ...or

    setData(draft => newState);


    const Messages = props => props.data.map(m => m[0] !== '' ?
        (<li key={m[0]}><strong>{m[0]}</strong> : <div className="innermsg">{m[1]}</div></li>)
        : (<li key={m[1]} className="update">{m[1]}</li>));

    const handleSubmit = e => {
        e.preventDefault();
        if (!nameInput) {
            return alert("Name can't be empty");
        }
        setId(name);
        socket.emit("join", name, room);
    };


    const [socket] = useSocket('<https://open-chat-naostsaecf.now.sh>');      
    socket.connect();
    
    const [messages, setMessages] = useImmer([]);
    useEffect(()=>{
      socket.on('update', message => setMessages(draft => {
        draft.push(['', message]);
      }));
    
      socket.on('message que',(nick, message) => {
        setMessages(draft => {
          draft.push([nick, message])
        })
      });
    },0);

    return id !== '' ? (
        <div>Hello</div>
    ) : (
            <div style={{ textAlign: "center", margin: "30vh auto", width: "70%" }}>
                <form onSubmit={event => handleSubmit(event)}>
                    <input
                        id="name"
                        onChange={e => setNameInput(e.target.value.trim())}
                        required
                        placeholder="What is your name .."
                    />
                    <br />
                    <input
                        id="room"
                        onChange={e => setRoom(e.target.value.trim())}
                        placeholder="What is your room .."
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
};