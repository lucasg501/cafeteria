'use client'

import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categorias() {

    const [listaCategorias, setListaCategorias] = useState([]);

    function listarCategorias(){
        let status = 0;
        httpClient.get('/categoria/listar')
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setListaCategorias(r);
            }else{
                alert('Erro ao listar categorias!');
            }
        })
    }

    function excluirCategoria(idCat){
        let status = 0;
        httpClient.delete(`/categoria/excluir/${idCat}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Categoria excluida com sucesso!');
                window.location.href = '/admin/categorias';
            }else{
                alert('Erro ao excluir categoria!');
            }
        })
    }

    useEffect(()=>{
        listarCategorias();
    },[])

    return (
        <div>
            <div>
                <h1>Categorias</h1>
            </div>

            <div>
                <a href="/admin/categorias/criar">
                    <button className="btn btn-primary">Cadastrar</button>
                </a>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaCategorias.map(function(value,index){
                                return(
                                    <tr key={index}>
                                        <td>{value.idCat}</td>
                                        <td>{value.nomeCat}</td>
                                        <td>
                                            <Link href={`/admin/categorias/alterar/${value.idCat}`}>
                                                <button className="btn btn-primary">Alterar</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => excluirCategoria(value.idCat)}>Excluir</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}