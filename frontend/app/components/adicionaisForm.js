'use client'

import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function AdicionaisForm(props) {
    const nomeAdc = useRef(props.adicional ? props.adicional.nomeAdc : '');
    const valorAdc = useRef(props.adicional ? props.adicional.valorAdc : 0);

    const [adicional, setAdicional] = useState(
        props.adicional ? props.adicional : { idAdc: 0, nomeAdc: '', valorAdc: 0 }
    );


    useEffect(() => {
        if (props.adicional) {
            setAdicional(props.adicional);
        }
    }, [props.adicional]);

    function cadastrarAdicional() {
        let status = 0;
        if (nomeAdc.current.value !== '' && valorAdc.current.value != 0) {
            httpClient.post('/adicionais/gravar', {
                nomeAdc: nomeAdc.current.value,
                valorAdc: valorAdc.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Adicional cadastrado com sucesso!');
                        window.location.href = '/admin/adicionais';
                    }
                });
        }
    }

    function alterarAdicional() {
        let status = 0;
        if (adicional.idAdc !== 0 && adicional.nomeAdc !== '' && adicional.valorAdc != 0) {
            httpClient.put('/adicionais/alterar', {
                idAdc: adicional.idAdc,
                nomeAdc: nomeAdc.current.value,
                valorAdc: valorAdc.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Adicional alterado com sucesso!');
                        window.location.href = '/admin/adicionais';
                    }
                });
        }
    }

    return (
        <div>
            <div>
                <h1>{adicional.idAdc !== 0 ? 'Alterar Adicional' : 'Incluir Adicional'}</h1>
            </div>

            <div>
                <div className="form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        ref={nomeAdc}
                        defaultValue={nomeAdc.current}
                    />
                </div>

                <div className="form-group">
                    <label>Valor</label>
                    <input
                        type="number"
                        className="form-control"
                        ref={valorAdc}
                        defaultValue={valorAdc.current}
                    />
                </div>
            </div>

            <button className="btn btn-primary" onClick={adicional.idAdc != 0 ? alterarAdicional : cadastrarAdicional}>
                {adicional.idAdc !== 0 ? 'Alterar' : 'Cadastrar'}
            </button>
            <button
                style={{ marginLeft: '10px' }}
                className="btn btn-danger"
                onClick={() => window.location.href = '/admin/adicionais'}
            >
                Cancelar
            </button>
        </div>
    );
}
