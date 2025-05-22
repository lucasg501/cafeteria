'use client'

import { useEffect, useRef } from "react";
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function ProdutosForm(props){

    const nomeProd = useRef(props.produto ? props.produto.nomeProd : '');
    const idCat = useRef(props.produto ? props.produto.idCat : '');
    const valorProd = useRef(props.produto ? props.produto.valorProd : '');
    const foto = useRef(props.produto ? props.produto.foto : '');
    const ativo = useRef(props.produto ? props.produto.ativo : '');
    const descricao = useRef(props.produto ? props.produto.descricao : '');
    const idAdc = useRef(props.produto ? props.produto.idAdc : '');

    const [produto, setProduto] = useState(
        props.produto ? props.produto : { idProd: 0, nomeProd: '', idCat: '', valorProd: '', foto: '', ativo: '', descricao: '', idAdc: '' }
    );

    const [listaCategoria, setListaCategoria] = useRef([]);

    function listarCategoria(){
        let status = 0;
        httpClient.get('/categoria/listar')
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setListaCategoria(r);
            }else{
                alert('Erro ao listar categorias!');
            }
        })
    }

    useEffect(()=>{
        listarCategoria();
    },[]);

    return(
        <div>
            <div>
                <h1>Produtos</h1>
            </div>

            <div>
                <Link href="/admin/produtos/criar">
                    <button style={{margin: 10}} type="button" className="btn btn-primary">Cadastrar Produto</button>
                </Link>
            </div>

            <div>
                <div className="form-group">
                    <label>Nome do Produto</label>
                    <input type="text" className="form-control" value={nomeProd} defaultValue={nomeProd.value}></input>
                </div>

                <div className="form-group">
                    <label>Categoria</label>
                    <select className="form-control" value={idCat} defaultValue={idCat.value}>
                        <option value={0}>Selecione uma categoria</option>
                        {
                            listaCategoria.map(function(value,index){
                                return(
                                    <option value={value.idCat}>{value.nomeCat}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Valor do Produto</label>
                    <input type="text" className="form-control" value={valorProd} defaultValue={valorProd.value}></input>
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <input type="text" className="form-control" value={descricao} defaultValue={descricao.value}></input>
                </div>

                <div className="form-group">
                    
                </div>
            </div>
        </div>
    )
}