import React from "react";
import { Route, Routes} from 'react-router-dom';
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

const App = () => {
    return (
       
        <Routes>
            <Route exact path='/' element={<Join/>}/>
            <Route exact path='/chat' element={<Chat/>}/>
        </Routes>
       
    );
}

export default App;