import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';


const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
  
    return (
        <div className='joinOuterContainer'>
            <div className='joinTnnerContainer'>
                <h1 className='heading'>Join</h1>
                <div>
                    <input placeholder='username' className='joinInput' type='text' value={name} onChange={(evt) => setName(evt.target.value)}></input>
                </div>                       
                <div>
                    <input placeholder='room' className='joinInput mt-20' type='text' value={room} onChange={(e) => setRoom(e.target.value)}></input>
                </div>  
                <Link onClick={evt => !name || !room ? evt.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='button mt-20' type='submit'>Sign in</button>
                </Link>         
            </div>
            
        </div>
  );
}

export default Join;
