import { carCatalogApi } from '../lib/api.js'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { BsPencilSquare, BsBackspace } from "react-icons/bs";
import { ModalExclusao } from './ModalExcluirCarro.jsx'
import Header from './Header.jsx'
import './css/Estoque.css'

export default function Catalog() {
    const [carrosCatalogo, setCarrosCatalogo] = useState([]);
    const [exclusao, setExclusao] = useState(false);
    const [idDeleteCarro, setIdDeleteCarro] = useState(0);

    useEffect(() => {
        async function fetchCatalog() {
            const response = await carCatalogApi.get('/catalogoCarros')
            setCarrosCatalogo(response.data)
        }

        fetchCatalog()
    }, [])

    const handleClickExclusao = (idCarro) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIdDeleteCarro(idCarro);
        setExclusao(!exclusao);
      };

    return (
        <>
            <Header />
            <ModalExclusao
                exclusao={exclusao}
                idCarro={idDeleteCarro}
                closeExclusao={(event) => setExclusao(event)}
            />
            <div id="container-estoque">
                <div id="container-conteudo">
                    <div id="container-apresentacao">
                        <h2>Seu estoque</h2>
                        <Link to="/cadastrar-carro">
                            <button id="btn-adicionaCarro">Adicionar carro</button>
                        </Link>
                    </div>
                    <div id="container-carros">
                        {carrosCatalogo.map((carro, index) => {
                            return (
                                <div className="preview-carro" id={carro._id} key={index}>
                                    <div className="foto-carro">
                                        <img src={carro.image} alt="imagem do carro" />
                                    </div>
                                    <div className="info-carro">
                                        <h4>{carro.make} {carro.model} {carro.year}</h4>
                                        <p className="info-motor">{carro.fuel_type} {carro.engine.type}</p>
                                        <p className="info-preco">R$ {carro.price}</p>
                                        <p className="info-kilometragem">{carro.mileage} km</p>
                                    </div>
                                    <div className="botoes-acao">
                                        <button id="btn-editarCarro"><BsPencilSquare /></button>
                                        <button id="btn-excluirCarro" onClick={() => handleClickExclusao(carro._id)}><BsBackspace /></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
