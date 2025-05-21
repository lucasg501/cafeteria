'use client'
import { useEffect, useState, useRef } from "react";
import httpClient from "../utils/httpClient";

export default function CategoriaForm(props) {

    const nomeCat = useRef(props.categoria ? props.categoria[0].nomeCat : '');

    const [categoria, setCategoria] = useState(
        props.categoria ? props.categoria : { idCat: 0, nomeCat: '' }
    );

    useEffect(() => {
        if (props.categoria) {
            setCategoria(props.categoria);
        }
    }, [props.categoria])

    function cadastrarCategoria() {
        let status = 0;
        if (nomeCat.current.value !== '') {
            httpClient.post('/categoria/gravar', {
                nomeCat: nomeCat.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Categoria cadastrada com sucesso!');
                        window.location.href = '/admin/categorias';
                    } else {
                        alert('Erro ao cadastrar categoria!');
                    }
                })
        }
    }

    function alterarCategoria() {
        let status = 0;
        if (categoria.idCat !== 0 && categoria.nomeCat !== '') {
            httpClient.put('/categoria/alterar', {
                idCat: categoria[0].idCat,
                nomeCat: nomeCat.current.value
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    if (status === 200) {
                        alert('Categoria alterada com sucesso!');
                        window.location.href = '/admin/categorias';
                    } else {
                        alert('Erro ao alterar categoria!');
                    }
                })
        }
    }

    return (
        <div>
            <div>
                <h1>{categoria.idCat !== 0 ? 'Alterar Categoria' : 'Cadastrar Categoria'}</h1>
            </div>

            <div>
                <div className="form-group">
                    <label>Nome da Categoria</label>
                    <input type="text" className="form-control" ref={nomeCat} defaultValue={nomeCat.current} />

                    <div style={{margin: 10}}>
                        <button className="btn btn-primary" onClick={categoria.idCat !== 0 ? alterarCategoria : cadastrarCategoria}>{categoria.idCat !== 0 ? 'Alterar' : 'Cadastrar'}</button>

                        <button style={{marginLeft: 10}} className="btn btn-danger" onClick={() => window.location.href = '/admin/categorias'}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
