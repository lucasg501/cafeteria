'use client'
import React, { useContext, useEffect } from 'react';
import UserContext from './context/userContext';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Se user for null, redireciona para login
    if (user === null) {
      alert('Usuário não está logado, redirecionando para login.');
      router.push('/login');
    }
  }, [user, router]);

  if (user === undefined) {
    // Estado inicial, carregando o usuário
    return <div>Carregando usuário...</div>;
  }

  if (user === null) {
    // Usuário não autenticado, bloqueia renderização da página protegida
    return null;
  }

  // Usuário autenticado, renderiza o conteúdo protegido
  return (
    <div>
      <h1>Início</h1>
      <h4>Aqui ficará a lista das últimas comandas que não foram marcadas como pagas</h4>
      {children}
    </div>
  );
}
