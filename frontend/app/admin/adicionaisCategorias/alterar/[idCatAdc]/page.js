'use client'
import CategoriasAdicionaisForm from "@/app/components/categoriasAdicionaisForm";
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react"
import {use} from 'react';

export default function alterarCategoriasAdicionais({params}){

    const {idCatAdc} = use(params);

    const [listaCatAdc, setListaCatAdc] = useState(null);

    function carregarCatsAdc(){
        let status = 0;

        httpClient.get(`/categoriaAdicional/obter/${idCatAdc}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setListaCatAdc(r);
            }else{
                alert('Erro ao listar categorias dos adicionais!');
            }
        })
    }

    useEffect(() =>{
        carregarCatsAdc();
    },[]);

    return(
        <div>
            {listaCatAdc != null ? <CategoriasAdicionaisForm categoriaAdicional={listaCatAdc}></CategoriasAdicionaisForm> : <div>Carregando...</div>}
        </div>
    )
}