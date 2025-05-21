'use client';
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined); // Estado inicial como indefinido

  useEffect(() => {
    try {
      const userStorage = localStorage.getItem("usuarioLogado");
      if (userStorage) {
        const parsed = JSON.parse(userStorage);
        setUser(parsed);
      } else {
        setUser(null); // Define explicitamente que não está logado
      }
    } catch (error) {
      console.error("Erro ao ler localStorage:", error);
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
