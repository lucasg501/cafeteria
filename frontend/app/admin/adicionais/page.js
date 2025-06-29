'use client'
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Adicionais() {

    const [listaadicionais, setListaAdicionais] = useState([]);
    const [listaCatAdicionais, setListaCatAdicionais] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); // '' mostra todas

    function listarCatAdicionais() {
        let status = 0;
        httpClient.get('/categoria/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaCatAdicionais(r);
                } else {
                    alert('Erro ao listar categorias dos adicionais!');
                }
            })
    }

    function getNomeCategoria(idCat) {
        const categoria = listaCatAdicionais.find(cat => cat.idCat === idCat);
        return categoria ? categoria.nomeCat : 'Categoria não encontrada';
    }

    function listarAdicionais() {
        let status = 0;
        httpClient.get('/adicionais/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaAdicionais(r);
                } else {
                    alert('Erro ao listar adicionais!');
                }
            })
    }

    function excluirAdicional(idAdc) {
        let status = 0;
        httpClient.delete(`/adicionais/excluir/${idAdc}`)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Adicional excluido com sucesso!');
                    window.location.href = '/admin/adicionais';
                } else {
                    alert('Erro ao excluir adicional!');
                }
            })
    }

    useEffect(() => {
        listarAdicionais();
        listarCatAdicionais();
    }, []);

    return (
        <div>
            <div>
                <h1>Adicionais</h1>
            </div>
            <div>
                <a href="/admin/adicionais/criar">
                    <button style={{ margin: '10px' }} className="btn btn-primary">Cadastrar</button>
                </a>
            </div>

            <div style={{ margin: '10px 0' }}>
                <label htmlFor="categoria">Filtrar por categoria: </label>
                <select
                    id="categoria"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    className="form-select"
                    style={{ width: '300px', display: 'inline-block', marginLeft: '10px' }}
                >
                    <option value="">Todas as categorias</option>
                    {
                        listaCatAdicionais.map(cat => (
                            <option key={cat.idCat} value={cat.idCat}>
                                {cat.nomeCat}
                            </option>
                        ))
                    }
                </select>
            </div>


            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Categoria Adicional</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaadicionais
                                .filter(adc => categoriaSelecionada === '' || adc.idCat === parseInt(categoriaSelecionada))
                                .map(function (value, index) {
                                    return (
                                        <tr key={index}>
                                            <td>{value.idAdc}</td>
                                            <td>{value.nomeAdc}</td>
                                            <td>{getNomeCategoria(value.idCat)}</td>
                                            <td>R$ {value.valorAdc}</td>
                                            <td>
                                                <Link href={`/admin/adicionais/alterar/${value.idAdc}`}>
                                                    <button className="btn btn-primary">Alterar</button>
                                                </Link>
                                                <button onClick={() => excluirAdicional(value.idAdc)} style={{ marginLeft: '10px' }} className="btn btn-danger">Excluir</button>
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