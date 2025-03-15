import './css/ModalExcluirCarro.css';
import { carCatalogApi } from '../lib/api';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

ModalExclusao.propTypes = {
    exclusao: PropTypes.bool.isRequired,
    closeExclusao: PropTypes.func.isRequired,
    idCarro: PropTypes.number.isRequired,
    atualizaTabela: PropTypes.func.isRequired,
};


export function ModalExclusao({ exclusao, closeExclusao, idCarro }) {
    async function deleteCarro() {
        try {
            await carCatalogApi.delete(
                `/excluirCarro/${idCarro}`
            );
        } catch(error) {
            console.log(error)
            toast.error('Erro ao excluir o carro.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <div className="container-exclusao">
            <div className={`modal-exclusao-fade ${exclusao ? '' : 'hide'}`} onClick={closeExclusao}></div>
            <div className={`modal-exclusao ${exclusao ? '' : 'hide'}`}>
                <p>Deseja mesmo excluir este registro?</p>
                <div className="action">
                    <button 
                        className="btn-sim" 
                        onClick={() => {
                            deleteCarro();
                            closeExclusao();
                            location.reload();
                        }}
                    >
                        Sim
                    </button>
                    <button className="btn-nao" onClick={() => closeExclusao()}>Não</button>
                </div>
            </div>
        </div>
    )
}