'use client'
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const usuarioLogado = localStorage.getItem('usuarioLogado');
      console.log('UserProvider: usuarioLogado raw:', usuarioLogado);
      if (usuarioLogado) {
        try {
          const userParsed = JSON.parse(usuarioLogado);
          console.log('UserProvider: usuário carregado:', userParsed);
          setUser(userParsed);
        } catch (e) {
          console.error('Erro ao parsear usuário do localStorage:', e);
          localStorage.removeItem('usuarioLogado');
          setUser(null);
        }
      } else {
        console.log('UserProvider: usuário não encontrado no localStorage');
      }
    }
  }, []);

  console.log('UserProvider: user atual:', user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
