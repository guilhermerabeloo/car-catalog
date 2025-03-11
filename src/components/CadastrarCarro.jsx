import { useState } from 'react'
import { carCatalogApi } from '../lib/api.js'
import './css/CadastrarCarro.css'
import Header from './Header.jsx'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export default function CadastrarCarro() {
    const navigate = useNavigate();
    const [novoCarro, setNovoCarro] = useState({
        make: '',
        model: '',
        year: '',
        fuel_type: '',
        color: '',
        transmission: '',
        engine: {
            type: '',
            horsepower: '',
            torque: ''
        },
        features: '',
        location: {
            city: '',
            state: '',
            country: ''
        },
        status: '',
        price: '',
        mileage: '',
        image: ''
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setNovoCarro(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setNovoCarro(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (
            !novoCarro.make ||
            !novoCarro.model ||
            !novoCarro.year ||
            !novoCarro.fuel_type ||
            !novoCarro.color ||
            !novoCarro.transmission ||
            !novoCarro.engine.type ||
            !novoCarro.engine.horsepower ||
            !novoCarro.engine.torque ||
            !novoCarro.features ||
            !novoCarro.location.city ||
            !novoCarro.location.state ||
            !novoCarro.location.country ||
            !novoCarro.status ||
            !novoCarro.price ||
            !novoCarro.mileage ||
            !novoCarro.image
        ) {
            toast.error('Por favor, preencha todos os campos.', {
                autoClose: 3000,
            });
            return;
        }    

        try {
            await carCatalogApi.post('/cadastroCarro', novoCarro, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success('Carro cadastrado com sucesso!', {
                autoClose: 1000,
                onClose: () => navigate('/estoque')
            });
        } catch (error) {
            toast.error('Erro ao cadastrar o carro.', {
                autoClose: 3000,
            });
            console.error("Erro ao enviar os dados:", error);
        } finally {
            setNovoCarro({
                make: '',
                model: '',
                year: '',
                fuel_type: '',
                color: '',
                transmission: '',
                engine: { type: '', horsepower: '', torque: '' },
                features: '',
                location: { city: '', state: '', country: '' },
                status: '',
                price: '',
                mileage: '',
                image: ''
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div id="container-cadastrocarro">
                <h2>Cadastrar novo carro</h2>
                <div id="container-novocarro">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label htmlFor="make">Marca</label>
                            <input type="text" id="make" name="make" placeholder="ex: Chevrolet" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="model">Modelo</label>
                            <input type="text" id="model" name="model" placeholder="ex: S10" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="year">Ano</label>
                            <input type="number" id="year" name="year" placeholder="ex: 2019" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="fuel_type">Combustível</label>
                            <input type="text" id="fuel_type" name="fuel_type" placeholder="ex: Diesel" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="color">Cor</label>
                            <input type="text" id="color" name="color" placeholder="ex: Prata" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="transmission">Transmissão</label>
                            <input type="text" id="transmission" name="transmission" placeholder="ex: Automática" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="engine">Motor</label>
                            <input type="text" id="engine" name="engine.type" placeholder="ex: 2.8L Turbo" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="horsepower">Potência (HP)</label>
                            <input type="number" id="horsepower" name="engine.horsepower" placeholder="ex: 200" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="torque">Torque</label>
                            <input type="number" id="torque" name="engine.torque" placeholder="ex: 500" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="features">Características</label>
                            <textarea id="features" name="features" placeholder="ex: Ar-condicionado, Direção hidráulica, Vidros elétricos, Central multimídia, Câmera de ré" onChange={handleInputChange}></textarea>
                        </div>
                        <div className="input-container">
                            <label htmlFor="location.city">Cidade</label>
                            <input type="text" id="location.city" name="location.city" placeholder="ex: Porto Alegre" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="location.state">Estado</label>
                            <input type="text" id="location.state" name="location.state" placeholder="ex: RS" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="location.country">País</label>
                            <input type="text" id="location.country" name="location.country" placeholder="ex: Brasil" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="status">Status</label>
                            <input type="text" id="status" name="status" placeholder="ex: Vendido" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="price">Preço</label>
                            <input type="number" id="price" name="price" placeholder="ex: 180000" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="mileage">Quilometragem</label>
                            <input type="number" id="mileage" name="mileage" placeholder="ex: 50000" onChange={handleInputChange} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="image">Link da imagem</label>
                            <input type="text" id="image" name="image" placeholder="ex: https://..." onChange={handleInputChange} />
                        </div>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    );
}
