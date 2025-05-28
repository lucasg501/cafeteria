'use client';
import React, { useEffect, useState } from 'react';
import httpClient from '../utils/httpClient';

export default function AdminLayout({ children }) {
  const [listaComandas, setListaComandas] = useState([]);
  const [itensComanda, setItensComanda] = useState([]);
  const [comandaAberta, setComandaAberta] = useState(null);

  function listarComandas() {
    httpClient.get('/comanda/listar')
      .then(r => r.json())
      .then(r => {
        const comandasNaoPagas = r.filter(comanda => comanda.paga === 'N');
        setListaComandas(comandasNaoPagas);
      })
      .catch(() => alert('Erro ao listar comandas!'));
  }

  function buscarItensComanda(idComanda) {
    let status = 0;
    httpClient.get(`/itensComanda/obter/${idComanda}`)
      .then(r => {
        status = r.status;
        return r.json();
      })
      .then(r => {
        console.log('Itens recebidos:', r); // <--- ADICIONE AQUI
        if (status == 200) {
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
                  <td>{comanda.idMesa}</td>
                  <td>{comanda.nomeCliente}</td>
                  <td>R$ {comanda.valorTotal}</td>
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
                          {
                            itensComanda.map(function (value, index) {
                              return (
                                <ol key={index}>
                                  <li>Produto: {value.idProduto}</li>
                                  <li>Quantidade: {value.quantidadeComanda}</li>
                                  <li>Preço: R$ {value.valorUn * value.quantidadeComanda}</li>
                                </ol>
                              )
                            })
                          }
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
