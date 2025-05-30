import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ItensComandaForm(props) {
    const idProduto = useRef(null);
    const quantidadeComanda = useRef(null);
    const adicionaisSelecionadosRef = useRef([]);

    const [comanda, setComanda] = useState(
        props.comanda
            ? props.comanda
            : { idComanda: 0, idMesa: 0, nomeCliente: '', valorTotal: 0, paga: 'N' }
    );

    const [listaComandas, setListaComandas] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [itensTemp, setItensTemp] = useState([]);
    const [adicionais, setAdicionais] = useState([]);

    useEffect(() => {
        listarComandas();
        listarProdutos();
        listarAdicionais();
    }, []);

    function listarAdicionais() {
        httpClient.get('/adicionais/listar')
            .then(r => r.json())
            .then(setAdicionais)
            .catch(() => alert('Erro ao listar adicionais!'));
    }

    function listarComandas() {
        httpClient.get('/comanda/listar')
            .then(r => r.json())
            .then(setListaComandas)
            .catch(() => alert('Erro ao listar comandas!'));
    }

    function listarProdutos() {
        httpClient.get('/produto/listar')
            .then(r => r.json())
            .then(setListaProdutos)
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

        const adicionaisSelecionados = adicionais.filter(ad =>
            adicionaisSelecionadosRef.current.includes(String(ad.idAdc))
        );

        const valorAdicionaisTotal = adicionaisSelecionados.reduce((soma, ad) => soma + ad.valorAdc, 0);
        const valorUnitarioComAdicionais = produtoSelecionado.valorProd + valorAdicionaisTotal;
        const subtotal = qtd * valorUnitarioComAdicionais;

        const novoItem = {
            idProduto: idProd,
            nomeProduto: produtoSelecionado.nomeProd,
            quantidade: qtd,
            valorUnitario: valorUnitarioComAdicionais,
            subtotal,
            adicionais: adicionaisSelecionados
        };

        setItensTemp([...itensTemp, novoItem]);

        // Reset
        idProduto.current.value = 0;
        quantidadeComanda.current.value = '';
        adicionaisSelecionadosRef.current = [];
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

        const requisicoes = itensTemp.map(async (item) => {
            const resposta = await httpClient.post('/itensComanda/gravar', {
                idComanda: id,
                idProduto: item.idProduto,
                quantidade: item.quantidade,
                valorUnitario: item.valorUnitario
            });

            if (resposta.status === 200) {
                const data = await resposta.json();
                const idItem = data.idItem;

                // Grava os adicionais
                const adicionais = item.adicionais || [];

                const requisicoesAdicionais = [];
                adicionais.forEach(ad => {
                    for (let i = 0; i < item.quantidade; i++) {
                        requisicoesAdicionais.push(
                            httpClient.post('/itensComandaAdc/gravar', {
                                idItem,
                                idAdc: ad.idAdc
                            })
                        );
                    }
                });

                await Promise.all(requisicoesAdicionais);
                return true;
            }

            return false;
        });

        Promise.all(requisicoes)
            .then(results => {
                const sucesso = results.every(ok => ok === true);
                if (sucesso) {
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
            <h1>Itens da Comanda</h1>

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
                    {listaComandas.map((value) => (
                        <option key={value.idComanda} value={value.idComanda}>
                            {value.idComanda}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Produto</label>
                <select ref={idProduto} className="form-control">
                    <option value={0}>Selecione um produto</option>
                    {listaProdutos.map((value) => (
                        <option key={value.idProd} value={value.idProd}>
                            {value.nomeProd}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Quantidade</label>
                <input type="number" ref={quantidadeComanda} className="form-control" min="1" />
            </div>

            <div className="form-group">
                <label>Adicionais</label>
                <select
                    multiple
                    className="form-control"
                    onChange={(e) => {
                        adicionaisSelecionadosRef.current = Array.from(e.target.selectedOptions, o => o.value);
                    }}
                >
                    {adicionais.map(ad => (
                        <option key={ad.idAdc} value={ad.idAdc}>
                            {ad.nomeAdc} (R$ {ad.valorAdc.toFixed(2)})
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="btn btn-primary" onClick={adicionarItem}>
                Adicionar
            </button>

            <hr />

            <h5>Itens Adicionados</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Unitário</th>
                        <th>Subtotal</th>
                        <th>Adicionais</th>
                    </tr>
                </thead>
                <tbody>
                    {itensTemp.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nomeProduto}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {item.valorUnitario.toFixed(2)}</td>
                            <td>R$ {item.subtotal.toFixed(2)}</td>
                            <td>
                                {item.adicionais && item.adicionais.length > 0 ? (
                                    <ul style={{ marginBottom: 0 }}>
                                        {item.adicionais.map((ad, i) => (
                                            <li key={i}>
                                                {ad.nomeAdc} (R$ {ad.valorAdc.toFixed(2)})
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    '—'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-success" onClick={gravarComanda}>
                Gravar Comanda
            </button>
            <a href="/admin/comandas" className="btn btn-danger" style={{ marginLeft: '10px' }}>
                Cancelar
            </a>
        </div>
    );
}
