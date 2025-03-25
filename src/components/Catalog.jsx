import { carCatalogApi } from '../lib/api.js'
import { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import Header from './Header.jsx'
import './css/Catalog.css'
import ModalDetalhamento from './ModalDetalharCarro.jsx';

export default function Catalog() {
    const [carrosCatalogo, setCarrosCatalogo] = useState([]);
    const [modalDetalhe, setModalDetalhe] = useState(false);
    const [idDetalhaCarro, setIdDetalhaCarro] = useState(0);

    useEffect(() => {
        async function fetchCatalog() {
            const response = await carCatalogApi.get('/catalogoCarros')
            setCarrosCatalogo(response.data)
        }

        fetchCatalog()
    }, [])

    const handleClickDetalhamento = (idCarro) => {
        setIdDetalhaCarro(idCarro);
        setModalDetalhe(!modalDetalhe);
    };

    return (
        <>
            <Header />
            <ModalDetalhamento
                isOpen={modalDetalhe}
                closeDetalhe={(event) => setModalDetalhe(event)}
                idCarro={idDetalhaCarro}
            />
            <div id="container-catalogo">
                <div id="container-conteudo">
                    <div id="container-apresentacao">
                        <h2>Carros próximos a você</h2>
                    </div>
                    <div id="container-carros">
                        {carrosCatalogo.map((carro, index) => {
                            return (
                                <div className="preview-carro" key={index}>
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
                                        <button id="btn-detalharCarro" onClick={() => handleClickDetalhamento(carro._id)}><BsSearch  /></button>
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
