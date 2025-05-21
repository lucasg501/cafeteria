'use client'

import { use, useRef } from "react";
import httpClient from "../utils/httpClient";

export default function Login() {

    const login = useRef('');
    const senha = useRef('');

    function autenticar(){
        let status = 0;
        httpClient.post('/login/autenticar',{
            login: login.current.value,
            senha: senha.current.value
        })
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Funcionou')
            }else{
                alert('Nao funcionou')
            }
        })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h3 className="fw-bold">Bem-vindo de volta!</h3>
                    <p className="text-muted">Faça login para continuar</p>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input ref={login}
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="usuário"
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input ref={senha}
                            type="password"
                            className="form-control"
                            id="senha"
                            placeholder="Digite sua senha"
                            autoComplete="current-password"
                        />
                    </div>
                    <button onClick={autenticar}
                        type="button"
                        className="btn btn-primary w-100"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
