import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ItensComandaForm(props) {

    const idItem = useRef(null);
    const idComanda = useRef(null);
    const idProduto = useRef(null);
    const quantidadeComanda = useRef(null);
    const valorUn = useRef(null);

    const [comanda, setComanda] = useState(
        props.comanda ? props.comanda : { idComanda: 0, idMesa: 0, nomeCliente: '', valorTotal: 0, paga: 'N' }
    );

    const [listaComandas, setListaComandas] = useState([]);

    function listarComandas(){
        let status = 0;
        httpClient.get('/comanda/listar')
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setListaComandas(r);
            }else{
                alert('Erro ao listar comandas!');
            }
        })
    }

    useEffect(() =>{
        listarComandas();
    },[]);

    return (
        <div>
            <div>
                <h1>Itens da Comanda</h1>
            </div>

            <div>
                <a href="/admin/itensComanda/criar">
                    <button className="btn btn-primary">Inserir itens na comanda</button>
                </a>
            </div>

            <div>
                <div className="form-group">
                    <div className="form-control">
                        <label>Comanda</label>
                        <select defaultValue={comanda.idComanda} ref={idComanda} className="form-control"> 
                            <option value={0}>Selecione uma comanda</option>
                            {
                                listaComandas.map(function(value,index){
                                    if(value.idComanda == comanda.idComanda){
                                        return <option value={value.idComanda} selected>{value.idComanda}</option>
                                    }else{
                                        return <option value={value.idComanda}>{value.idComanda}</option>
                                    }
                                })
                            }
                        </select>
                    </div>

                    <div className="form-control">
                        <label>Produto</label>
                        <select ref={idProduto} className="form-control">
                            <option value={0}>Selecione um produto</option>
                            {
                                
                            }
                        </select>
                    </div>
                        
                </div>
            </div>
        </div>
    )
}