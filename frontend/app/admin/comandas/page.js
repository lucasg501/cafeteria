'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Comandas() {

    const [listaComandas, setListaComandas] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [filtroPaga, setFiltroPaga] = useState('TODAS');

    function listarMesas() {
        httpClient.get('/mesa/listar')
            .then(r => r.json())
            .then(r => setMesas(r));
    }

    function getNumMesa(idMesa) {
        const mesa = mesas.find(m => m.idMesa == idMesa);
        return mesa ? mesa.numMesa : "Mesa não encontrada";
    }

    function listarComandas() {
        httpClient.get('/comanda/listar')
            .then(r => r.json())
            .then(r => setListaComandas(r));
    }

    function filtrarComandas() {
        if (filtroPaga === 'TODAS') return listaComandas;
        return listaComandas.filter(c => c.paga === filtroPaga);
    }

       function marcarComoPaga(idComanda) {
        let status = 0;
        httpClient.put(`/comanda/marcarPaga/${idComanda}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Comanda marcada como paga com sucesso!');
                window.location.href = '/admin/comandas';
            }else{
                alert('Erro ao marcar comanda como paga!');
            }
        })
    }

    useEffect(() => {
        listarComandas();
        listarMesas();
    }, []);

    return (
        <div>
            <h1>Comandas</h1>

            <div style={{ margin: 10 }}>
                <Link href={'/admin/comandas/criar'}>
                    <button type="button" className="btn btn-primary">Criar comanda</button>
                </Link>
            </div>

            <div style={{ margin: 10 }}>
                <label>Filtrar por pagamento:&nbsp;</label>
                <select
                    value={filtroPaga}
                    onChange={(e) => setFiltroPaga(e.target.value)}
                    className="form-select"
                    style={{ width: 200, display: 'inline-block' }}
                >
                    <option value="TODAS">Todas</option>
                    <option value="S">Pagas</option>
                    <option value="N">Não pagas</option>
                </select>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Mesa</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Paga</th>
                        <th>Editar</th>
                        <th>Marcar como paga</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtrarComandas().map((value, index) => (
                            <tr key={index}>
                                <td>{value.idComanda}</td>
                                <td>{getNumMesa(value.idMesa)}</td>
                                <td>{value.nomeCliente}</td>
                                <td>R$ {value.valorTotal}</td>
                                <td>{value.paga == 'S' ? 'Sim' : 'Não'}</td>
                                <td>
                                    {
                                        value.paga == 'N' ?
                                        <Link href={`/admin/itensComanda/alterar/${value.idComanda}`}>
                                            <button type="button" className="btn btn-primary">Editar</button>
                                        </Link>
                                        :
                                        <button disabled type="button" className="btn btn-primary">Editar</button>
                                    }
                                </td>
                                <td>
                                    {
                                        value.paga == 'N' ?
                                        <button onClick={() => marcarComoPaga(value.idComanda)} type="button" className="btn btn-success">Marcar como paga</button>
                                        :
                                        <button disabled type="button" className="btn btn-success">Marcar como paga</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
