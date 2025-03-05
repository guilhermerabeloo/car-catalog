import './css/Header.css'
import logo from '../assets/logo.jpg'
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div id="header">
                <div id="area-utilizavel">
                    <div id="area-logo">
                        <img src={logo} alt="seu logo aqui" id="img-logo"/>
                    </div>
                    <div id="area-nav">
                        <Link to="/catalogo">
                            <button id="btn-catalogo">Catalogo</button>
                        </Link>
                        <Link to="/estoque">
                            <button id="btn-estoque">Estoque</button>
                        </Link>
                    </div>
                    <div id="area-menu">
                        <BsList className="menu-list"/>
                    </div>
                </div>
            </div>
        </>
    )
}