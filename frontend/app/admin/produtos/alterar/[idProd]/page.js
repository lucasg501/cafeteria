'use client'

import ProdutosForm from "@/app/components/produtosForm";
import httpClient from "@/app/utils/httpClient";
import { use, useEffect, useState } from "react";

export default function AlterarProduto({params}) {

    const {idProd} = use(params);

    const [produto, setProduto] = useState(null);

    function carregarProdutos() {
        let status = 0;
        httpClient.get(`/produto/obter/${idProd}`)
            .then(r => {
                status = r.status;
                return r.json();
            })
            .then(r => {
                if (status == 200) {
                    console.log(r);
                    setProduto(r);
                } else {
                    alert('Erro ao listar produtos!');
                }
            })
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    return (
        <div>
            {produto != null ? <ProdutosForm produto={produto}></ProdutosForm> : <div>Carregando...</div>}
        </div>
    )
}