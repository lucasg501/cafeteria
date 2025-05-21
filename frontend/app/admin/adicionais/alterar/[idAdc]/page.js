'use client'

import AdicionaisForm from "@/app/components/adicionaisForm"
import Adicionais from "../../page"
import httpClient from "@/app/utils/httpClient";
import { useState, useEffect } from "react";
import {use} from 'react';

export default function alterarAdicional({params}){

    const {idAdc} = use(params);

    const [adicional, setAdicional] = useState(null);

    function carregarAdicional(){
        let status = 0;
        httpClient.get(`/adicionais/obter/${idAdc}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setAdicional(r);
            }
        })
    }

    useEffect(()=>{
        carregarAdicional();
    },[])

    return(
        <div>
            {adicional != null ? <AdicionaisForm adicional={adicional}></AdicionaisForm> : <div>Carregando...</div>}
        </div>
    )
}