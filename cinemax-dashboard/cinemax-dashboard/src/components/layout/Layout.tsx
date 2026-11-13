
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import {
    Clapperboard,
    LayoutDashboard,
    Film,
    Settings,
    Menu,
    X,
    Plus,
    ExternalLink
} from "lucide-react";

// Lista de páginas disponíveis no menu lateral.
const links = [
    {
        to: "/",
        label: "Visão geral",
        icon: LayoutDashboard,
        end: true
    },
    {
        to: "/filmes",
        label: "Filmes",
        icon: Film
    },
    {
        to: "/filmes/novo",
        label: "Cadastrar filme",
        icon: Plus
    },
    {
        to: "/configuracoes",
        label: "Configurações",
        icon: Settings
    }
];

export default function Layout() {

    // Controla a abertura e o fechamento do menu mobile.
    const [open, setOpen] = useState(false);

    return (
        <div className="app-shell">

            {/* Fundo escuro que aparece atrás do menu no mobile */}
            {open && (
                <button
                    className="mobile-overlay"
                    aria-label="Fechar menu"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Menu lateral */}
            <aside
                className={`sidebar ${
                    open ? "sidebar-open" : ""
                }`}
            >

                {/* Identidade visual do Cinemax */}
                <div className="brand">
                    <span className="brand-mark">
                        <Clapperboard size={22} />
                    </span>

                    <span>
                        CINEMAX
                        <small>ADMINISTRAÇÃO</small>
                    </span>

                    {/* Botão para fechar o menu no mobile */}
                    <button
                        className="icon-button close-menu"
                        onClick={() => setOpen(false)}
                        aria-label="Fechar"
                    >
                        <X />
                    </button>
                </div>

                {/* Identificação da seção de navegação */}
                <div className="nav-caption">
                    MENU PRINCIPAL
                </div>

                {/* Links de navegação */}
                <nav>
                    {links.map(({
                        to,
                        label,
                        icon: Icon,
                        end
                    }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Informações no rodapé do menu */}
                <div className="sidebar-bottom">
                    <div className="api-mini">
                        <span className="status-dot" />
                        <span>API configurada</span>
                    </div>

                    <small>
                        Cinemax Dashboard · v1.0
                    </small>
                </div>
            </aside>

            {/* Área principal da aplicação */}
            <main className="main-area">

                {/* Barra superior */}
                <header className="topbar">

                    {/* Botão que abre o menu no mobile */}
                    <button
                        className="icon-button mobile-menu"
                        onClick={() => setOpen(true)}
                        aria-label="Abrir menu"
                    >
                        <Menu />
                    </button>

                    {/* Identificação da localização atual */}
                    <div className="breadcrumb">
                        Cinemax
                        <span>/</span>
                        Painel administrativo
                    </div>

                    {/* Link para a documentação da API */}
                    <a
                        className="topbar-link"
                        href="http://localhost:5160/swagger"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Swagger API
                        <ExternalLink size={14} />
                    </a>
                </header>

                {/* Área onde as páginas são renderizadas */}
                <div className="page-wrap">
                    <Outlet />
                </div>

            </main>
        </div>
    );
}
