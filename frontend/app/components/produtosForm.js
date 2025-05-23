'use client'

import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function ProdutosForm(props) {
    const nomeProd = useRef(null);
    const idCat = useRef(null);
    const idCatAdc = useRef(null);
    const valorProd = useRef(null);
    const ativo = useRef(null);
    const descricao = useRef(null);

    const [produto, setProduto] = useState(props.produto ? props.produto : {
        idProd: 0, nomeProd: '', idCat: 0, valorProd: '', foto: '', ativo: '', descricao: '', idCatAdc: 0
    });

    const [listaCategoriaAdicional, setListaCategoriaAdicional] = useState([]);
    const [listaCategoria, setListaCategoria] = useState([]);
    const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
    const [nomeArquivo, setNomeArquivo] = useState(produto.foto || '');

    useEffect(() => {
        if (props.produto) {
            setProduto(props.produto);
            setNomeArquivo(props.produto.foto || '');
        }
    }, [props.produto]);

    function listarCategoriaAdicional() {
        let status = 0;
        httpClient.get('/categoriaAdicional/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaCategoriaAdicional(r);
                } else {
                    alert('Erro ao listar categorias!');
                }
            })
    }

    function listarCategoria() {
        let status = 0;
        httpClient.get('/categoria/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status === 200) {
                    setListaCategoria(r);
                } else {
                    alert('Erro ao listar categorias!');
                }
            })
    }

    function cadastrarProduto() {
        let status = 0;
        httpClient.post('/produto/gravar', {
            nomeProd: nomeProd.current.value,
            idCat: idCat.current.value,
            idCatAdc: idCatAdc.current.value,
            valorProd: valorProd.current.value,
            foto: arquivoSelecionado,
            ativo: ativo.current.checked,
            descricao: descricao.current.value
        }).then(r => {
            status = r.status;
            return r.json();
        }).then(r => {
            if (status === 200) {
                alert('Produto cadastrado com sucesso!');
                window.location.href = '/admin/produtos';
            } else {
                alert('Erro ao cadastrar produto!');
            }
        });
    }

    function alterarProduto() {
        let status = 0;
        httpClient.put('/produto/alterar', {
            idProd: produto.idProd,
            nomeProd: nomeProd.current.value,
            idCat: idCat.current.value,
            idCatAdc: idCatAdc.current.value,
            valorProd: valorProd.current.value,
            foto: arquivoSelecionado,
            ativo: ativo.current.checked,
            descricao: descricao.current.value
        }).then(r => {
            status = r.status;
            return r.json();
        }).then(r => {
            if (status === 200) {
                alert('Produto alterado com sucesso!');
                window.location.href = '/admin/produtos';
            } else {
                alert('Erro ao alterar produto!');
            }
        });
    }

    useEffect(() => {
        listarCategoriaAdicional();
        listarCategoria();
    }, []);

    return (
        <div>
            <h1>{produto.idProd !== 0 ? 'Alterar Produto' : 'Cadastrar Produto'}</h1>

            <div className="form-group">
                <label>Nome do Produto</label>
                <input type="text" className="form-control" ref={nomeProd} defaultValue={produto.nomeProd} />
            </div>

            <div className="form-group">
                <label>Categoria</label>
                <select className="form-control" ref={idCat} defaultValue={produto.idCat}>
                    <option value={0}>Selecione uma categoria</option>
                    {
                        listaCategoria.map(function(value,index){
                            if(produto != null && produto.idCat == value.idCat){
                                return <option selected value={value.idCat}>{value.nomeCat}</option>
                            }else{
                                return <option value={value.idCat}>{value.nomeCat}</option>
                            }
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label>Categoria dos Adicionais</label>
                <select className="form-control" ref={idCatAdc} defaultValue={produto.idCatAdc}>
                    <option value={0}>Selecione uma categoria</option>
                    {
                        listaCategoriaAdicional.map(function(value,index){
                            if(produto != null && produto.idCatAdc == value.idCatAdc){
                                return <option selected value={value.idCatAdc}>{value.nomeCatAdc}</option>
                            }else{
                                return <option value={value.idCatAdc}>{value.nomeCatAdc}</option>
                            }
                        })

                    }
                </select>
            </div>

            <div className="form-group">
                <label>Valor do Produto</label>
                <input type="text" className="form-control" ref={valorProd} defaultValue={produto.valorProd} />
            </div>

            <div className="form-group">
                <label>Descrição</label>
                <input type="text" className="form-control" ref={descricao} defaultValue={produto.descricao} />
            </div>

            <div className="form-group">
                <label>Foto</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setArquivoSelecionado(file);
                            setNomeArquivo(file.name);
                        }
                    }}
                />
                <input
                    type="text"
                    className="form-control mt-2"
                    value={nomeArquivo}
                    readOnly
                />
            </div>

            <div className="form-group" style={{ marginLeft: 25 }}>
                <label>
                    <input
                        type="checkbox"
                        ref={ativo}
                        defaultChecked={produto.ativo}
                        className="form-check-input"
                    /> Ativo
                </label>
            </div>

            <div className="form-group">
                <button
                    className="btn btn-primary"
                    onClick={produto.idProd !== 0 ? alterarProduto : cadastrarProduto}
                >
                    {produto.idProd !== 0 ? 'Alterar' : 'Cadastrar'}
                </button>
                <button
                    style={{ marginLeft: 25 }}
                    className="btn btn-danger"
                    onClick={() => window.location.href = '/admin/produtos'}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}