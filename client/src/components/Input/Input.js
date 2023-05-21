import React from 'react';

import './input.css';

const Input = ({ message, setMessage, sendMessage}) => {
  return (
    <form className='form'>
        <input 
            className='input'
            type='text'
            placeholder='Type a message...'
            value={message}
            onChange={evt => setMessage(evt.target.value)}
            onKeyDown={evt => evt.key === 'Enter' ? sendMessage(evt) : null}
        />
        <button className='sendButton' onClick={evt => evt.key === 'Enter' ? sendMessage(evt) : null}>Send</button>
    </form>
    
  )
}

export default Input;
