import './css/ModalCarroDetalhado.css'
import { carCatalogApi } from '../lib/api.js'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function ModalDetalhamento({ isOpen, closeDetalhe, idCarro }) {
    if (!isOpen) return null

    const [carroDetalhado, setCarroDetalhado] = useState({});

    useEffect(() => {
        async function detalheCarro() {
            try {
            const response = await carCatalogApi.get(`/detalharCarro/${idCarro}`);
            setCarroDetalhado(response.data);
            } catch (error) {
            console.log(error);
            toast.error('Erro ao detalhar o carro.', { autoClose: 3000 });
            }
        }
        detalheCarro();
    }, [idCarro]);

    return (
        <>
            <ToastContainer />
            <div className="modal-overlay">
                <div className="modal">
                    <button className="modal-close" onClick={() => closeDetalhe()}>X</button>
                    <h2 className="modal-title">Informações detalhadas</h2>
                    <div className="modal-content">
                        <div className="modal-image">
                            {carroDetalhado.image && (
                                <img src={carroDetalhado.image} alt="Imagem do carro" />
                            )}
                        </div>
                        <div className="modal-details">
                            <div className="detail-item">
                                <label>Marca</label>
                                <input type="text" value={carroDetalhado.make || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Modelo</label>
                                <input type="text" value={carroDetalhado.model || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Ano</label>
                                <input type="number" value={carroDetalhado.year || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Cor</label>
                                <input type="text" value={carroDetalhado.color || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Preço</label>
                                <input type="number" value={carroDetalhado.price || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Quilometragem</label>
                                <input type="number" value={carroDetalhado.mileage || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Combustível</label>
                                <input type="text" value={carroDetalhado.fuel_type || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Transmissão</label>
                                <input type="text" value={carroDetalhado.transmission || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Tipo do Motor</label>
                                <input type="text" value={carroDetalhado.engine?.type || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Potência (HP)</label>
                                <input type="number" value={carroDetalhado.engine?.horsepower || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Torque</label>
                                <input type="number" value={carroDetalhado.engine?.torque || ""} readOnly />
                            </div>
                            <div className="detail-item">
                                <label>Características</label>
                                <input
                                    type="text"
                                    value={
                                        Array.isArray(carroDetalhado.features)
                                        ? carroDetalhado.features.join(", ")
                                        : carroDetalhado.features || ""
                                    }
                                    readOnly
                                />
                            </div>
                            <div className="detail-item">
                                <label>Localização</label>
                                <input
                                    type="text"
                                    value={`${carroDetalhado.location?.city || ""}, ${carroDetalhado.location?.state || ""}, ${carroDetalhado.location?.country || ""}`}
                                    readOnly
                                />
                            </div>
                            <div className="detail-item">
                                <label>Status</label>
                                <input type="text" value={carroDetalhado.status || ""} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
