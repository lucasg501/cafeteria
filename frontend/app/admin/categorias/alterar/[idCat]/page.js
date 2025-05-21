'use client'
import CategoriaForm from "@/app/components/categoriaForm";
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";
import {use} from 'react';

export default function AlterarCategoria({params}) {

    const {idCat} = use(params);

    const [categoria, setCategoria] = useState('');

    function carregarCategoria(){
        let status = 0;
        httpClient.get(`/categoria/listar/${idCat}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setCategoria(r[0]);
            }
        })
    }

    useEffect(()=>{
        carregarCategoria();
    },[]);

    return (
        <div>
            {categoria != null  ? <CategoriaForm categoria={categoria}></CategoriaForm> : <div>Carregando...</div>}
        </div>
    );
}