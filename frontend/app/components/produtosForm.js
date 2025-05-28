'use client'

import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";
import { parse } from 'cookie';
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

export default function ProdutosForm(props) {
    const nomeProd = useRef(null);
    const idCat = useRef(null);
    const idCatAdc = useRef(null);
    const valorProd = useRef(null);
    const ativo = useRef(null);
    const descricao = useRef(null);

    const [produto, setProduto] = useState(props.produto ? props.produto : {
        idProd: 0, nomeProd: '', idCat: 0, valorProd: '', foto: '', ativo: '', descricao: ''
    });

    const [listaCategoria, setListaCategoria] = useState([]);
    const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
    const [nomeArquivo, setNomeArquivo] = useState(produto.foto || '');
    const [previewUrl, setPreviewUrl] = useState('');

    let chaveApi = "";
    if (typeof document !== "undefined") {
        const cookies = parse(document.cookie);
        if (cookies.cookieAuth !== undefined) {
            chaveApi = cookies.cookieAuth;
        }
    }

    useEffect(() => {
        if (props.produto) {
            setProduto(props.produto);
            setNomeArquivo(props.produto.foto || '');
            if (props.produto.foto) {
                setPreviewUrl(`http://localhost:4000${props.produto.foto}`);
            } else {
                setPreviewUrl('');
            }
        }
    }, [props.produto]);

    function listarCategoria() {
        let status = 0;
        httpClient.get('/categoria/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setListaCategoria(r);
                } else {
                    alert('Erro ao listar categorias!');
                }
            })
    }

    function cadastrarProduto() {
        const formData = new FormData();
        formData.append('nomeProd', nomeProd.current.value);
        formData.append('idCat', idCat.current.value);
        formData.append('valorProd', valorProd.current.value);
        if (arquivoSelecionado) {
            formData.append('foto', arquivoSelecionado);
        } else {
            formData.append('fotoAntiga', produto.foto);
        }
        formData.append('ativo', ativo.current.checked);
        formData.append('descricao', descricao.current.value);

        fetch('http://localhost:4000/produto/gravar', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'chaveapi': chaveApi
            },
            body: formData
        })
            .then(r => r.json())
            .then(() => {
                alert('Produto cadastrado com sucesso!');
                window.location.href = '/admin/produtos';
            })
            .catch(() => alert('Erro ao cadastrar produto!'));
    }

    function alterarProduto(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append('idProd', produto.idProd);
        formData.append('nomeProd', nomeProd.current.value);
        formData.append('idCat', idCat.current.value);
        formData.append('valorProd', valorProd.current.value);
        formData.append('descricao', descricao.current.value);
        formData.append('ativo', ativo.current.checked);

        if (arquivoSelecionado) {
            formData.append('foto', arquivoSelecionado);
        } else {
            formData.append('fotoAntiga', produto.foto);
        }

        fetch('http://localhost:4000/produto/alterar', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'chaveapi': chaveApi
            },
            body: formData
        })
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Erro HTTP ${response.status}: ${text}`);
                }
                return response.json();
            })
            .then(() => {
                alert('Produto alterado com sucesso!');
                window.location.href = '/admin/produtos';
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                console.log('Erro ao alterar produto: ' + error.message);
            });
    }



    function handleArquivoChange(e) {
        const file = e.target.files[0];
        if (file) {
            setArquivoSelecionado(file);
            setNomeArquivo(file.name);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    useEffect(() => {
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
                        listaCategoria.map(function (value, index) {
                            if (value.idCat == produto.idCat) {
                                return <option key={index} value={value.idCat} selected>{value.nomeCat}</option>
                            } else {
                                return <option key={index} value={value.idCat}>{value.nomeCat}</option>
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
                    onChange={handleArquivoChange}
                />
                <input
                    type="text"
                    className="form-control mt-2"
                    value={nomeArquivo}
                    readOnly
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview da Foto"
                        style={{
                            marginTop: 10,
                            maxWidth: '200px',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            border: '1px solid #ddd',
                            padding: '4px',
                            borderRadius: '4px'
                        }}
                    />
                )}
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
