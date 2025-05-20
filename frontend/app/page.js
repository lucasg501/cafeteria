'use client'
import Link from "next/link";

export default function AdminLayout({ children }) {
    return (
        <div>
            <h1>Início</h1>

            <h4>Aqui ficara a lista das ultimas comandas que não foram marcadas como pagas</h4>

            {children}
        </div>
    );
}
