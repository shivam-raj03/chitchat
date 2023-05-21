import React from 'react';
import Message from '../Message/Message';

import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';

const Messages = ({messages, name}) => {
  return (
    <ScrollToBottom className='messages'>
        {messages.map((message, i) => {
        //console.log(message);
        return (<div key={i}>
        <Message message={message} name={name} />
        </div>
        ) 
        
        })}
    </ScrollToBottom>
  )
}

export default Messages;
