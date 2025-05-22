'use client'

import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function UsuarioForm(props) {

    const login = useRef(props.login ? props.login : '');
    const senha = useRef(props.senha ? props.senha : '');
    const adm = useRef(props.adm ? props.adm : 'N');

    const [usuario, setUsuario] = useState(
        props.usuario ? props.usuario : { idUsu: 0, login: '', senha: '' }
    );

    useEffect(() => {
        if (props.usuario) {
            setUsuario(props.usuario);
        }
    }, [props.usuario]);

    function cadastrarUsuario() {
        let status = 0;
        if (login.current.value != '' && senha.current.value != '') {
            httpClient.post('/login/gravar', {
                login: login.current.value,
                senha: senha.current.value,
                adm: adm.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status == 200) {
                        alert('Usuário cadastrado com sucesso!');
                        window.location.href = '/admin/usuarios';
                    } else {
                        alert('Erro ao cadastrar usuário!');
                    }
                })
        }
    }

    function alterarUsuario(){
        let status = 0;
        if (login.current.value != '' && senha.current.value != '') {
            httpClient.post('/login/alterar', {
                idUsu: usuario.idUsu,
                login: login.current.value,
                senha: senha.current.value,
                adm: adm.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status == 200) {
                        alert('Usuário alterado com sucesso!');
                        window.location.href = '/admin/usuarios';
                    } else {
                        alert('Erro ao alterar usuário!');
                    }
                })
        }
    }

    return (
        <div>
            <div>
                <h1>{usuario.idUsu != 0 ? 'Alterar Usuário' : 'Cadastrar Usuário'}</h1>
            </div>

            <div className="form-group">
                <label>Login:</label> 
                <input type="text" className="form-control" ref={login} defaultValue={usuario.login} />
            </div>

            <div className="form-group">
                <label>Senha:</label> 
                <input type="text" className="form-control" ref={senha} defaultValue={usuario.senha} />
            </div>

            <div className="form-group">
                <label>Administrador:</label> 
                <select className="form-control" ref={adm} defaultValue={usuario.adm}>
                    <option value="S">Sim</option>
                    <option value="N">Nao</option>
                </select>
            </div>

            <div>
                <button className="btn btn-primary" onClick={usuario.idUsu != 0 ? alterarUsuario : cadastrarUsuario}>{usuario.idUsu != 0 ? 'Alterar' : 'Cadastrar'}</button>
            </div>
        </div>
    );
}