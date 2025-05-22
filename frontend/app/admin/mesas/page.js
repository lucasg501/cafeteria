'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link"
import { useEffect, useState } from "react";
export default function Mesas(){
    const [listaMesas, setListaMesas] = useState([]);

    function carregarMesas(){
        let status = 0;
        httpClient.get('/mesa/listar')
        .then(r=>{
            status = r.status;
            return r.json();
        })
        .then(r=>{
            if(status == 200){
                setListaMesas(r);
            }
        })
    }

    useEffect(()=>{
        carregarMesas();
    },[]);

    return(
        <div>
            <div>
                <h1>Mesas</h1>
            </div>

            <div>
                <Link href="/admin/mesas/criar">
                    <button type="button" className="btn btn-primary">Cadastrar Mesa</button>
                </Link>
            </div>

            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Num Mesa</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listaMesas.map(function(value,index){
                                return(
                                    <tr key={value.idMesa}>
                                        <td>{value.idMesa}</td>
                                        <td>{value.numMesa}</td>
                                        <td><Link href={`/admin/mesas/excluir/${value.idMesa}`}><button type="button" class="btn btn-danger">Excluir</button></Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}