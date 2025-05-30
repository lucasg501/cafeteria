import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ItensComandaForm(props) {
    const idProduto = useRef(null);
    const quantidadeComanda = useRef(null);

    const [comanda, setComanda] = useState(
        props.comanda
            ? props.comanda
            : { idComanda: 0, idMesa: 0, nomeCliente: '', valorTotal: 0, paga: 'N' }
    );

    const [listaComandas, setListaComandas] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [itensTemp, setItensTemp] = useState([]);

    useEffect(() => {
        listarComandas();
        listarProdutos();
        listarCategorias();
    }, []);

    function listarCategorias() {
        httpClient.get('/categoria/listar')
            .then(r => r.json())
            .then(r => setListaCategorias(r))
            .catch(() => alert('Erro ao listar categorias!'));
    }

    function listarComandas() {
        httpClient.get('/comanda/listar')
            .then(r => r.json())
            .then(r => setListaComandas(r))
            .catch(() => alert('Erro ao listar comandas!'));
    }

    function listarProdutos() {
        httpClient.get('/produto/listar')
            .then(r => r.json())
            .then(r => setListaProdutos(r))
            .catch(() => alert('Erro ao listar produtos!'));
    }

    function adicionarItem() {
        const idProd = parseInt(idProduto.current.value);
        const qtd = parseInt(quantidadeComanda.current.value);

        if (!idProd || idProd === 0 || !qtd || qtd <= 0) {
            alert("Selecione um produto e uma quantidade válida.");
            return;
        }

        const produtoSelecionado = listaProdutos.find(p => p.idProd === idProd);
        if (!produtoSelecionado) {
            alert("Produto inválido.");
            return;
        }

        const novoItem = {
            idProduto: idProd,
            nomeProduto: produtoSelecionado.nomeProd,
            quantidade: qtd,
            valorUnitario: produtoSelecionado.valorProd,
            subtotal: qtd * produtoSelecionado.valorProd
        };

        setItensTemp([...itensTemp, novoItem]);

        // Limpar campos
        idProduto.current.value = 0;
        quantidadeComanda.current.value = '';
    }

    function gravarComanda() {
        if (itensTemp.length === 0) {
            alert('Nenhum item adicionado!');
            return;
        }

        const id = comanda.idComanda;

        if (!id || id === 0) {
            alert("Comanda inválida.");
            return;
        }

        const requisicoes = itensTemp.map(item => {
            return httpClient.post('/itensComanda/gravar', {
                idComanda: id,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                valorUnitario: item.valorUnitario
            });
        });

        Promise.all(requisicoes)
            .then(respostas => {
                const todasComSucesso = respostas.every(r => r.status === 200);
                if (todasComSucesso) {
                    alert('Comanda gravada com sucesso!');
                    window.location.href = "/admin/comandas";
                } else {
                    alert('Alguns itens não foram gravados corretamente.');
                }
            })
            .catch(error => {
                console.error("Erro ao gravar comanda:", error);
                alert("Erro ao gravar os itens da comanda.");
            });
    }

    return (
        <div>
            <div><h1>Itens da Comanda</h1></div>

            <div className="form-group">
                <label>Comanda</label>
                <select
                    value={comanda.idComanda}
                    onChange={(e) =>
                        setComanda({ ...comanda, idComanda: parseInt(e.target.value) })
                    }
                    className="form-control"
                >
                    <option value={0}>Selecione uma comanda</option>
                    {listaComandas.map((value, index) => (
                        <option key={index} value={value.idComanda}>
                            {value.idComanda}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Produto</label>
                <select ref={idProduto} className="form-control">
                    <option value={0}>Selecione um produto</option>
                    {listaProdutos.map((value, index) => (
                        <option key={index} value={value.idProd}>
                            {value.nomeProd}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ width: '30%' }} className="form-group">
                <label>Quantidade</label>
                <input type="number" ref={quantidadeComanda} className="form-control" min="1" />
            </div>

            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={adicionarItem}>
                    Adicionar
                </button>
            </div>

            <hr />

            <div>
                <h5>Itens Adicionados</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Valor Unitário</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensTemp.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nomeProduto}</td>
                                <td>{item.quantidade}</td>
                                <td>R$ {item.valorUnitario.toFixed(2)}</td>
                                <td>R$ {item.subtotal.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <button className="btn btn-success" onClick={gravarComanda}>
                    Gravar Comanda
                </button>
                <a href="/admin/comandas" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                    Cancelar
                </a>
            </div>
        </div>
    );
}
