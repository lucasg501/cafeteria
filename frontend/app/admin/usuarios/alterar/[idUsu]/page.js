'use client'
import {useEffect, useState} from 'react';
import httpClient from "@/app/utils/httpClient";
import UsuarioForm from "@/app/components/usuarioForm";
import {use} from 'react';
export default function alterarUsuario({params}) {

    const { idUsu } = use(params);

    const [usuario, setUsuario] = useState(null);

    function carregarUsuario(){
        let status = 0;
        httpClient.get(`/login/obter/${idUsu}`)
        .then(r => {
            status = r.status;
            return r.json();
        })
        .then(r => {
            if(status == 200){
                setUsuario(r);
            }else{
                alert('Erro ao carregar usuário!');
            }
        })
    }

    useEffect(() =>{
        carregarUsuario();
    },[])

    return (
        <div>
            <h1>Usuários</h1>
            {usuario != null ? <UsuarioForm usuario={usuario}></UsuarioForm> : <div>Carregando...</div>}
        </div>
    );
}