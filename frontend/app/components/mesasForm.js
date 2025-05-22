'use client'
import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";

export default function MesasForm(props) {

    const numMesa = useRef(props.mesas ? props.mesas.numMesa : 0);

    const [mesa, setMesa] = useState(
        props.mesas ? props.mesas : { idMesa: 0, numMesa: 0 }
    );

    useEffect(() =>{
        if(props.mesa){
            setMesa(props.mesa);
        }
    })

    function cadastrarMesa(){
        let status = 0;
        if(numMesa.current.value != 0){
            httpClient.post('/mesa/gravar', {
                numMesa: numMesa.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if(status === 200){
                        alert('Mesa cadastrada com sucesso!');
                        window.location.href = '/admin/mesas';
                    }else{
                        alert('Erro ao cadastrar mesa!');
                    }
                })
                .catch(e => {
                    alert('Erro ao cadastrar mesa!');
                });
        }
    }

    function alterarMesa(){
        let status = 0;
        if(mesa.idMesa !== 0 && mesa.numMesa !== 0){
            httpClient.put('/mesa/alterar', {
                idMesa: mesa.idMesa,
                numMesa: numMesa.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if(status === 200){
                        alert('Mesa alterada com sucesso!');
                        window.location.href = '/admin/mesas';
                    }else{
                        alert('Erro ao alterar mesa!');
                    }
                })
                .catch(e => {
                    alert('Erro ao alterar mesa!');
                });
        }
    }

    return (
        <div>
            <div>
                <h1>{mesa.idMesa != 0 ? 'Alterar Mesa' : 'Cadastrar Mesa'}</h1>
            </div>

            <div>
                <div className="form-group">
                    <label>Número da Mesa</label>
                    <input type="number" className="form-control" ref={numMesa} defaultValue={mesa.numMesa}/>
                </div>

                <div>
                    <button className="btn btn-primary" onClick={mesa.idMesa != 0 ? alterarMesa : cadastrarMesa}>{mesa.idMesa != 0 ? 'Alterar' : 'Cadastrar'}</button>
                    <button style={{ marginLeft: '10px' }} className="btn btn-danger" onClick={() => window.location.href = '/admin/mesas'}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}