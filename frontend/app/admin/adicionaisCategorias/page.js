'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdicionaisCategorias() {

    const [listaCategoriasAdicionais, setListaCategoriasAdicionais] = useState([]);

    function listarCategoriasAdicionais() {
        let status = 0;

        httpClient.get('/categoriaAdicional/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaCategoriasAdicionais(r);
                } else {
                    alert('Erro ao listar categorias adicionais!');
                }
            })
    }

    useEffect(() => {
        listarCategoriasAdicionais();
    }, []);

    function excluirCategoria(idCatAdc){
        let status = 0;

        httpClient.delete(`/categoriaAdicional/excluir/${idCatAdc}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Categoria excluida com sucesso!');
                window.location.href = '/admin/adicionaisCategorias';
            }else{
                alert('Erro ao excluir categoria!');
            }
        })
    }


    return (
        <div>
            <div>
                <h1>Categorias dos Adicionais</h1>
            </div>

            <div>
                <a href="/admin/adicionaisCategorias/criar">
                    <button style={{ margin: 10 }} type="button" className="btn btn-primary">Cadastrar Categoria</button>
                </a>
            </div>

            <div>
                <div>
                    <table className="table table-striped">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listaCategoriasAdicionais.map(function (value, index) {
                                    return (
                                        <tr key={index}>
                                            <th>{value.idCatAdc}</th>
                                            <th>{value.nomeCatAdc}</th>
                                            <th>
                                                <Link href={`/admin/adicionaisCategorias/alterar/${value.idCatAdc}`} className="btn btn-primary">Editar</Link>

                                                <button style={{ marginLeft: "10px" }} type="button" className="btn btn-danger"
                                                    onClick={() => {
                                                        if (window.confirm('Tem certeza que deseja excluir a categoria?')) {
                                                            excluirCategoria(value.idCatAdc);
                                                        }
                                                    }}
                                                >Excluir</button>

                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}