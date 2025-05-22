'use client'
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";
import { use } from "react";
import MesasForm from "@/app/components/mesasForm";

export default function alterarMesa({params}){

    const {idMesa} = use(params);

    const [mesas, setMesas] = useState(null);

    function carregarMesas(){
        let status = 0;
        httpClient.get(`/mesa/obter/${idMesa}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                console.log(r);
                setMesas(r);
            }else{
                alert('Erro ao listar mesas!');
            }
        })
    }

    useEffect(()=>{
        carregarMesas();
    },[]);

    return(
        <div>
            {mesas != null ? <MesasForm mesas={mesas}></MesasForm> : <div>Carregando...</div>}
        </div>
    )
}