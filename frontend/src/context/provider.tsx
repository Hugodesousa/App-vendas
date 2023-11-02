import React, { useState } from 'react';


import { GlobalContext } from './context';


function Provider({children}:any) {
const [sistemaUsado, setSistemaUsado] = useState('1');
const [menuUsado, setMenuUsado] = useState('')


const initial = {
    sistemaUsado, 
    setSistemaUsado,
    menuUsado, 
    setMenuUsado
}

return (
    <GlobalContext.Provider value={ initial }>
        { children }
    </GlobalContext.Provider>
)
};

export default Provider;