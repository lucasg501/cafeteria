import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function ComandasForm(props) {

    const idMesa = useRef(0);
    const nomeCliente = useRef('');
    const valorTotal = useRef(0);
    const paga = useRef('N');

    const [comandas, setComandas] = useState(
        props.comandas ? props.comandas : { idComanda: 0, idMesa: 0, nomeCliente: '', valorTotal: 0, paga: 'N' }
    );

    const [mesas, setMesas] = useState([]);

    function listarMesas() {
        let status = 0;
        httpClient.get('/mesa/listar')
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    setMesas(r);
                } else {
                    alert('Erro ao listar mesas!');
                }
            })
    }

    function cadastrarComanda() {
        let status = 0;
        httpClient.post('/comanda/gravar', {
            idMesa: idMesa.current.value,
            nomeCliente: nomeCliente.current.value,
            valorTotal: valorTotal.current.value,
            paga: paga.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Comanda cadastrada com sucesso!');
                    window.location.href = '/admin/comandas';
                } else {
                    alert('Erro ao cadastrar comanda!');
                }
            })
    }

    function alterarComanda() {
        let status = 0;
        httpClient.put('/comanda/alterar', {
            idComanda: comandas.idComanda,
            idMesa: idMesa.current.value,
            nomeCliente: nomeCliente.current.value,
            valorTotal: valorTotal.current.value,
            paga: paga.current.value
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Comanda alterada com sucesso!');
                    window.location.href = '/admin/comandas';
                } else {
                    alert('Erro ao alterar comanda!');
                }
            })
    }

    function marcarComoPaga() {
        let status = 0;
        httpClient.put('/comanda/alterar', {
            idComanda: comandas.idComanda,
            idMesa: idMesa.current.value,
            nomeCliente: nomeCliente.current.value,
            valorTotal: valorTotal.current.value,
            paga: 'S'
        })
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    alert('Comanda alterada com sucesso!');
                    window.location.href = '/admin/comandas';
                } else {
                    alert('Erro ao alterar comanda!');
                }
            })
    }

    useEffect(() => {
        if (props.comandas) {
            setComandas(props.comandas);
        }

        listarMesas();
    }, []);

    return (
        <div>
            <div>
                <h1>{comandas.idComanda != 0 ? 'Alterar Comanda' : 'Cadastrar Comanda'}</h1>
            </div>

            <div className="form-group">
                <label>Mesa</label>
                <select className="form-control" ref={idMesa} defaultValue={comandas.idMesa}>
                    <option value={0}>Selecione uma mesa</option>
                    {
                        mesas.map(function (value, index) {
                            if (comandas.idMesa == value.idMesa) {
                                return <option key={index} value={value.idMesa} selected>{value.numMesa}</option>;
                            } else {
                                return <option key={index} value={value.idMesa}>{value.numMesa}</option>;
                            }
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label>Nome do cliente</label>
                <input className="form-control" type="text" defaultValue={comandas.nomeCliente} ref={nomeCliente}></input>
            </div>

            <div className="form-group">
                <label>Valor total</label>
                <input className="form-control" type="number" defaultValue={comandas.valorTotal} ref={valorTotal}></input>
            </div>

            <div className="form-group" style={{ marginLeft: 25 }}>
                <label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={comandas.paga === 'S'}
                        onChange={(e) =>
                            setComandas({ ...comandas, paga: e.target.checked ? 'S' : 'N' })
                        }
                        ref={paga}
                    /> Paga
                </label>
            </div>


            <div className="form-group">
                <button className="btn btn-primary" onClick={comandas.idComanda != 0 ? alterarComanda : cadastrarComanda}>{comandas.idComanda != 0 ? 'Alterar' : 'Cadastrar'}</button>
                <a style={{ marginLeft: '10px' }} href="/admin/comandas">
                    <button className="btn btn-danger">Cancelar</button>
                </a>
            </div>
        </div>
    );
}