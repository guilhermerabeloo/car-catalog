import { carCatalogApi } from '../lib/api.js'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Header from './Header.jsx'
import './css/Estoque.css'

export default function Catalog() {
    const [carrosCatalogo, setCarrosCatalogo] = useState([]);

    useEffect(() => {
        async function fetchCatalog() {
            const response = await carCatalogApi.get('/catalogoCarros')
            setCarrosCatalogo(response.data)
        }

        fetchCatalog()
    }, [])

    return (
        <>
            <Header />
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
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}