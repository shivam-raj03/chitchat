/*eslint-disable*/
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');

  const ENDPOINT = 'http://localhost:4000/';
  //const ENDPOINT = 'https://sharechat.vercel.app/'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room}, (err = 'successfully joined') => {
      console.log(err);
    });

    //console.log(socket);

     return () => {
      socket.emit('disconnect');
      socket.off();
     }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
      //console.log('hello');
      socket.on('message', (message) =>{
        setMessages([...messages, message]);
      });
  }, [messages]);

  const sendMessage = evt => {
    evt.preventDefault();
    if(message){
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  //console.log(message);
  //console.log(messages);
  return (

    <div className='outerContainer'>
        <div className='container'>
            <InfoBar room={room} />
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users} />
    </div>
  )
}

export default Chat;
