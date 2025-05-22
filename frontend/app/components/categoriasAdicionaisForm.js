'use client'
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function CategoriasAdicionaisForm(props){

    const [catAdicionais, setCatAdicionais] = useState([]);

    const nomeCatAdc = useRef(props.catAdicionais ? props.catAdicionais.nomeCatAdc : '');
    const idCatAdc = useRef(props.catAdicionais ? props.catAdicionais.idCatAdc : '');

    function cadastrarCatAdicional(){
        let status = 0;

        httpClient.post('/categoriaAdicional/gravar', {
            nomeCatAdc: nomeCatAdc.current.value
        })
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Categoria adicionada com sucesso!');
                window.location.href = '/admin/adicionaisCategorias';
            }else{
                alert('Erro ao cadastrar categoria!');
            }
        })
    }

    function alterarCatAdicional(){
        let status = 0;

        httpClient.put('/categoriaAdicional/alterar', {
            idCatAdc: idCatAdc.current.value,
            nomeCatAdc: nomeCatAdc.current.value
        })
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                alert('Categoria alterada com sucesso!');
                window.location.href = '/admin/adicionaisCategorias';
            }else{
                alert('Erro ao alterar categoria!');
            }
        })
    }

    return(
        <div>
            <div>
                <h1>{catAdicionais.idCatAdc != 0 ? 'Alterar Categoria Adicional' : 'Cadastrar Categoria Adicional'}</h1>
            </div>       

            <div className="form-group">
                <label>Nome:</label>
                <input type="text" className="form-control" ref={nomeCatAdc} defaultValue={props.catAdicionais}></input>
            </div>

            <div className="form-group">
                <button className="btn btn-primary" onClick={props.catAdicionais.idCatAdc != 0 ? alterarCatAdicional : cadastrarCatAdicional}>{props.catAdicionais.idCatAdc != 0 ? 'Alterar' : 'Cadastrar'}</button>
            </div>
        </div>
    )

}