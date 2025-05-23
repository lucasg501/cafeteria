'use client'
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function CategoriasAdicionaisForm(props) {

    const nomeCatAdc = useRef(props.categoriaAdicional ? props.categoriaAdicional.nomeCatAdc : '');

    const [catAdicionais, setCatAdicionais] = useState(
        props.categoriaAdicional ? props.categoriaAdicional : { idCatAdc: 0, nomeCatAdc: '' }
    );

    useEffect(() => {
        if (props.catAdicionais) {
            setCatAdicionais(props.catAdicionais);
        }
    })

    function cadastrarCatAdicional() {
        let status = 0;

        if (nomeCatAdc != '') {
            httpClient.post('/categoriaAdicional/gravar', {
                nomeCatAdc: nomeCatAdc.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status == 200) {
                        alert('Categoria adicionada com sucesso!');
                        window.location.href = '/admin/adicionaisCategorias';
                    } else {
                        alert('Erro ao cadastrar categoria!');
                    }
                })
        } else {
            alert('Preencha o formulário corretamente');
        }
    }

    function alterarCatAdicional() {
        let status = 0;

        if (catAdicionais.idCatAdc != 0 && catAdicionais.nomeCatAdc != '') {
            httpClient.put('/categoriaAdicional/alterar', {
                idCatAdc: catAdicionais.idCatAdc,
                nomeCatAdc: nomeCatAdc.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status == 200) {
                        alert('Categoria alterada com sucesso!');
                        window.location.href = '/admin/adicionaisCategorias';
                    } else {
                        alert('Erro ao alterar categoria!');
                    }
                })
        }
    }

    return (
        <div>
            <div>
                <h1>{catAdicionais.idCatAdc != 0 ? 'Alterar Categoria Adicional' : 'Cadastrar Categoria Adicional'}</h1>
            </div>

            <div className="form-group">
                <label>Nome:</label>
                <input type="text" className="form-control" ref={nomeCatAdc} defaultValue={catAdicionais.nomeCatAdc}></input>
            </div>

            <div className="form-group">
                <button className="btn btn-primary" onClick={catAdicionais.idCatAdc != 0 ? alterarCatAdicional : cadastrarCatAdicional}>{catAdicionais.idCatAdc != 0 ? 'Alterar' : 'Cadastrar'}</button>
            </div>
        </div>
    )

}