
import { useQuery } from "@tanstack/react-query";

import {
    Activity,
    AlertCircle,
    CheckCircle2,
    RefreshCw
} from "lucide-react";

import { filmService } from "../services/filmService";
import { getApiBaseUrl } from "../services/api";

export default function ApiStatus() {
    // Consulta a API para verificar se ela está respondendo.
    const query = useQuery({
        queryKey: ["api-health"],
        queryFn: filmService.list,

        // Atualiza a verificação a cada 30 segundos.
        refetchInterval: 30_000,

        // Não tenta novamente automaticamente em caso de erro.
        retry: false
    });

    return (
        <div
            className={`api-status ${
                query.isError
                    ? "offline"
                    : query.isSuccess
                        ? "online"
                        : "checking"
            }`}
        >
            {/* Ícone que representa o estado atual da conexão */}
            {query.isError ? (
                <AlertCircle size={17} />
            ) : query.isSuccess ? (
                <CheckCircle2 size={17} />
            ) : (
                <RefreshCw
                    size={17}
                    className="spin"
                />
            )}

            {/* Informações sobre a conexão */}
            <span>
                <strong>
                    {query.isError
                        ? "API indisponível"
                        : query.isSuccess
                            ? "API conectada"
                            : "Verificando API"}
                </strong>

                <small>{getApiBaseUrl()}</small>
            </span>

            {/* Ícone decorativo de atividade */}
            <Activity
                size={17}
                className="status-pulse"
            />
        </div>
    );
}
