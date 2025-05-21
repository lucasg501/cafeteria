'use client';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../public/template/css/styles.css';
import '../public/template/css/fontawesome-free/css/all.min.css';
import '../public/template/css/sb-admin-2.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
