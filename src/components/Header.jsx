import './css/Header.css'
import logo from '../assets/logo.jpg'
import { BsList } from "react-icons/bs";

export default function Header() {
    return (
        <>
            <div id="header">
                <div id="area-utilizavel">
                    <div id="area-logo">
                        <img src={logo} alt="seu logo aqui" id="img-logo"/>
                    </div>
                    <div id="area-nav">
                        <button id="btn-catalogo">Catalogo</button>
                        <button id="btn-estoque">Estoque</button>
                    </div>
                    <div id="area-menu">
                        <BsList className="menu-list"/>
                    </div>
                </div>
            </div>
        </>
    )
}