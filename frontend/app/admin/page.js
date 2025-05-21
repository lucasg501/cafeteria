'use client';
import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <div>
      <h1>Início</h1>
      <h4>Aqui ficará a lista das últimas comandas que não foram marcadas como pagas</h4>
      {children}
    </div>
  );
}
