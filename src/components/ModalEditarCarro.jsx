import './css/ModalEditarCarro.css'
import { useState } from 'react'
import { carCatalogApi } from '../lib/api.js'
import { ToastContainer, toast } from 'react-toastify'

export default function ModalEdicao({ isOpen, closeEdicao, editCarro }) {
    if (!isOpen) return null

    const [carro, setCarro] = useState(editCarro);

    function handleInputChange(event) {
        const { name, value } = event.target
        const antigoCarro = { ...carro }
        if (name === 'engine') {
          antigoCarro[name]["type"] = value
          setCarro(antigoCarro)
        } else {
          antigoCarro[name] = value
          setCarro(antigoCarro)
        }
      }

    async function handleSubmit(event) {
        event.preventDefault()

        if (
            !carro.make ||
            !carro.model ||
            !carro.year ||
            !carro.fuel_type ||
            !carro.engine.type ||
            !carro.price ||
            !carro.mileage ||
            !carro.image
        ){
            toast.error('Por favor, preencha todos os campos.', {
                autoClose: 3000,
            })
            return
        }
        try {
            console.log(carro)
            await carCatalogApi.put(
                `/editarCarro/${carro._id}`
                , carro
            )
            closeEdicao();
            location.reload()
        } catch (error) {
            toast.error('Erro ao editar o carro.', {
                autoClose: 3000,
            })
            console.log("Erro ao enviar os dados:", error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="modal-overlay">
                <div className="modal">
                    <button className="modal-close" onClick={() => closeEdicao()}>X</button>
                    <div id="container-editarcarro">
                        <h2>Editar carro</h2>
                        <div id="container-carro">
                            <form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <label htmlFor="make">Marca</label>
                                    <input type="text" id="make" name="make" placeholder="ex: Volkswagem" value={carro.make} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="model">Modelo</label>
                                    <input type="text" id="model" name="model" placeholder="ex: Gol" value={carro.model} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="year">Ano</label>
                                    <input type="number" id="year" name="year" placeholder="ex: 2020" value={carro.year} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="fuel_type">Combustível</label>
                                    <input type="text" id="fuel_type" name="fuel_type" placeholder="ex: Gasolina" value={carro.fuel_type} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="engine">Motor</label>
                                    <input type="text" id="engine" name="engine" placeholder="ex: 1.6L" value={carro.engine.type} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="price">Preço</label>
                                    <input type="number" id="price" name="price" placeholder="ex: 50000" value={carro.price} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="mileage">Quilometragem</label>
                                    <input type="number" id="mileage" name="mileage" placeholder="ex: 80000" value={carro.mileage} onChange={handleInputChange} />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="image">Link com endereço da imagem</label>
                                    <input type="text" id="image" name="image" placeholder="ex: https://volkswagem/gol.jpg" value={carro.image} onChange={handleInputChange} />
                                </div>
                                <button 
                                    type="submit"
                                    onClick={(event) => {
                                        handleSubmit(event);
                                    }}
                                >
                                    Salvar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
