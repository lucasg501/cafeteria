'use client'
import React, {useContext, userContext, useState} from 'react';
import UserContext from './context/userContext';

export default function AdminLayout({ children }) {
    const {user, setUser} = useContext(UserContext);
    const [isClient, setIsClient] = useState(false);

    return (
        <div>
            <h1>Início</h1>

            <h4>Aqui ficara a lista das ultimas comandas que não foram marcadas como pagas</h4>

            {children}
        </div>
    );
}
