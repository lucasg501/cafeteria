'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [show, setShow] = useState(false);

    function carregarUsuarios() {
        let status = 0;
        httpClient.get('/login/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaUsuarios(r);
                }
            })
    }

    function excluirUsuario(idUsu){
        let status = 0;
        httpClient.delete(`/login/excluir/${idUsu}`)	
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Usuário excluido com sucesso!');
                window.location.href = '/admin/usuarios';
            }else{
                alert('Erro ao excluir usuário!');
            }
        })
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (
        <div>
            <div>
                <h1>Usuários</h1>
            </div>

            <div>
                <Link href={"/admin/usuarios/criar"}>
                    <button style={{ margin: "10px" }} type="button" className="btn btn-primary">Cadastrar Usuário</button>
                </Link>
            </div>

            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Login</th>
                            <th>Senha</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaUsuarios.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idUsu}</td>
                                        <td>{value.login}</td>
                                        <td className="flex items-center gap-2">
                                            <span>{show ? value.senha : "••••••••"}</span>
                                            <button style={{border: 'none'}}
                                                onClick={() => setShow(!show)}
                                                type="button"
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                {show ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"/>}
                                            </button>
                                        </td>
                                        <td>
                                            <Link href={`/admin/usuarios/alterar/${value.idUsu}`}>
                                                <button type="button" className="btn btn-primary">Editar</button>
                                            </Link>

                                            <button style={{ marginLeft: "10px" }} type="button" className="btn btn-danger" 
                                                onClick={() =>{
                                                    if(window.confirm('Tem certeza que deseja excluir o usuário?')){
                                                        excluirUsuario(value.idUsu);
                                                    }
                                                }}
                                            >Excluir</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}