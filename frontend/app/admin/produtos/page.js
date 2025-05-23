'use client'

import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useState, useEffect } from "react"

export default function Produtos() {

    const [listaProdutos, setListaProdutos] = useState([]);

    function carregarProdutos() {
        let status = 0;
        httpClient.get('/produto/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaProdutos(r);
                }
            })
    }

    useEffect(() => {
        carregarProdutos();
    }, [])

    return (
        <div>
            <div>
                <h1>Produtos</h1>
            </div>

            <div>
                <Link href="/admin/produtos/criar">
                    <button style={{ margin: 10 }} type="button" className="btn btn-primary">Cadastrar Produto</button>
                </Link>
            </div>

            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Categoria do Adicional</th>
                            <th>Foto</th>
                            <th>Ativo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaProdutos.map(function (value, index) {
                                return (
                                    <tr key={index}>
                                        <td>{value.idProd}</td>
                                        <td>{value.nomeProd}</td>
                                        <td>{value.idCat}</td>
                                        <td>{value.idCatadc}</td>
                                        <td>{value.foto}</td>
                                        <td>{value.ativo}</td>
                                        <td>{value.descricao}</td>
                                        <td>R$ {value.valorProd}</td>
                                        <td>
                                            <Link href={`/admin/produtos/alterar/${value.idProd}`}>
                                                <button className="btn btn-primary">Editar</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} type="button" className="btn btn-danger"
                                                onClick={() => {
                                                    if (window.confirm('Tem certeza que deseja excluir o usuário?')) {
                                                        excluirUsuario(value.idProd);
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