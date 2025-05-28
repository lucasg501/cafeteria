'use client';
import React, { useEffect, useState } from 'react';
import httpClient from '../utils/httpClient';

export default function AdminLayout({ children }) {
  const [listaComandas, setListaComandas] = useState([]);
  const [itensComanda, setItensComanda] = useState([]);
  const [comandaAberta, setComandaAberta] = useState(null);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [listaMesas, setListaMesas] = useState([]);

  function listarMesas() {
    let status = 0;
    httpClient.get('/mesa/listar')
      .then(r => {
        status = r.status;
        return r.json();
      })
      .then(r => {
        if (status === 200) {
          setListaMesas(r);
        } else {
          alert('Erro ao listar mesas!');
        }
      });
  }

  function listarComandas() {
    httpClient.get('/comanda/listar')
      .then(r => r.json())
      .then(r => {
        const comandasNaoPagas = r.filter(comanda => comanda.paga === 'N');
        setListaComandas(comandasNaoPagas);
      })
      .catch(() => alert('Erro ao listar comandas!'));
  }

  function getNomeProduto(idProduto) {
    const produto = listaProdutos.find(p => p.idProd === idProduto);
    return produto ? produto.nomeProd : '';
  }

  function getNumMesa(idMesa) {
    const mesa = listaMesas.find(m => m.idMesa == idMesa);
    return mesa ? mesa.numMesa : 'Mesa não encontrada';
  }

  function listarProdutos() {
    let status = 0;
    httpClient.get('/produto/listar')
      .then(r => {
        status = r.status;
        return r.json();
      })
      .then(r => {
        if (status === 200) {
          setListaProdutos(r);
        } else {
          alert('Erro ao listar produtos!');
        }
      });
  }

  useEffect(() => {
    listarProdutos();
    listarMesas();
  }, []);

  function buscarItensComanda(idComanda) {
    let status = 0;
    httpClient.get(`/itensComanda/obter/${idComanda}`)
      .then(r => {
        status = r.status;
        return r.json();
      })
      .then(r => {
        if (status === 200) {
          setItensComanda(r);
        } else {
          alert('Erro ao buscar itens da comanda!');
        }
      });
  }

  function handleClickLinha(idComanda) {
    if (comandaAberta === idComanda) {
      setComandaAberta(null);
    } else {
      setComandaAberta(idComanda);
      buscarItensComanda(idComanda);
    }
  }

  function calcularTotalComanda(itens) {
    return itens.reduce((total, item) => {
      return total + item.valorUn * item.quantidadeComanda;
    }, 0).toFixed(2);
  }

  useEffect(() => {
    listarComandas();
  }, []);

  return (
    <div>
      <h1>Início</h1>
      {children}

      <div className='form-group'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Número Comanda</th>
              <th>Número da mesa</th>
              <th>Cliente</th>
              <th>Valor Total</th>
              <th>Paga</th>
              <th>Dar Baixa</th>
            </tr>
          </thead>

          <tbody>
            {listaComandas.map((comanda) => (
              <React.Fragment key={comanda.idComanda}>
                <tr
                  onClick={() => handleClickLinha(comanda.idComanda)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{comanda.idComanda}</td>
                  <td>{getNumMesa(comanda.idMesa)}</td>
                  <td>{comanda.nomeCliente}</td>
                  <td>
                    {comandaAberta === comanda.idComanda
                      ? `R$ ${calcularTotalComanda(itensComanda)}`
                      : 'Clique para ver'}
                  </td>
                  <td>{comanda.paga === 'S' ? 'Sim' : 'Não'}</td>
                  <td>
                    <button className='btn btn-success'>Baixar</button>
                  </td>
                </tr>

                {comandaAberta === comanda.idComanda && (
                  <tr>
                    <td colSpan="6">
                      <strong>Itens da comanda:</strong>
                      {itensComanda.length > 0 ? (
                        <ul>
                          {itensComanda.map((value, index) => (
                            <ul
                              key={index}
                              style={{
                                borderBottom: '1px solid #ccc',
                                listStyle: 'none',
                                marginBottom: '10px',
                              }}
                            >
                              <li>Produto: {getNomeProduto(value.idProduto)}</li>
                              <li>Quantidade: {value.quantidadeComanda}</li>
                              <li>
                                Preço: R${' '}
                                {(value.valorUn * value.quantidadeComanda).toFixed(2)}
                              </li>
                            </ul>
                          ))}
                          <li style={{listStyle: 'none'}}>
                            <strong>Total: R$ {calcularTotalComanda(itensComanda)}</strong>
                          </li>
                        </ul>
                      ) : (
                        <p>Nenhum item encontrado.</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
