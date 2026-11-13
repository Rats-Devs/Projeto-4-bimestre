
import { Server, Info } from "lucide-react";

import ApiStatus from "../components/ApiStatus";
import { getApiBaseUrl } from "../services/api";

export default function Settings() {
    return (
        <>
            {/* Cabeçalho da página */}
            <div className="page-heading">
                <div>
                    <div className="eyebrow">SISTEMA</div>
                    <h1>Configurações</h1>
                    <p>
                        Informações da integração da Dashboard com o backend.
                    </p>
                </div>
            </div>

            {/* Painel de configurações da API */}
            <section className="panel settings-panel">

                {/* Título da seção */}
                <div className="settings-title">
                    <Server />

                    <div>
                        <h2>Conexão com a API</h2>
                        <p>
                            Endereço configurado para as requisições HTTP.
                        </p>
                    </div>
                </div>

                {/* Componente que verifica o estado da conexão */}
                <ApiStatus />

                {/* Exibe o endereço base da API */}
                <div className="config-line">
                    <span>URL base</span>
                    <code>{getApiBaseUrl()}</code>
                </div>

                {/* Orientação para alterar o endereço da API */}
                <div className="info-note">
                    <Info size={17} />

                    <span>
                        Para alterar o endereço, edite a variável
                        VITE_API_URL no arquivo .env e reinicie
                        o servidor de desenvolvimento.
                    </span>
                </div>

                {/* Métodos HTTP utilizados pelo sistema */}
                <div className="config-line">
                    <span>Rotas utilizadas</span>
                    <code>GET, POST, PUT e DELETE /api/Filme</code>
                </div>
            </section>
        </>
    );
}
