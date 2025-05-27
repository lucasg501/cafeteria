'use client'
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react"
import ComandasForm from "@/app/components/comandasForm";

export default function alterarComanda({params}){

    const {idComanda} = use(params);

    const [listaComandas,setListaComandas] = useState([]);

    function carregarComandas(){
        let status = 0;
        httpClient.get(`/comanda/obter/${idComanda}`)
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setListaComandas(r);
            }
        })
    }

    useEffect(()=>{
        carregarComandas();
    },[]);

    return(
        <div>
            {listaComandas != null ? <ComandasForm comandas={listaComandas}></ComandasForm> : <div>Carregando...</div>}
        </div>
    )
}