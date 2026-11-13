# Cinemax Dashboard

Dashboard administrativa em React + TypeScript para consumir a API ASP.NET Core existente.

## Requisitos
- Node.js 20 ou superior
- API Cinemax em execução
- Endpoints existentes em `/api/Filme`

## Instalação
```bash
npm install
cp .env.example .env
npm run dev
```

Acesse o endereço mostrado pelo Vite.

## Configuração da API
Edite `.env`:
```env
VITE_API_URL=http://localhost:5160
```
A URL acima é apenas o exemplo anotado no projeto. Use a porta real da API.

### Acesso pelo celular
Se abrir a dashboard no celular, `localhost` aponta para o próprio celular, não para o computador onde a API está rodando. Use o IP local do computador, por exemplo:
```env
VITE_API_URL=http://192.168.0.10:5160
```
O celular e o computador precisam estar na mesma rede Wi-Fi, e a API precisa aceitar conexões externas. Confira também o CORS e o firewall do computador. Não exponha a API publicamente sem autenticação e HTTPS.

## Endpoints usados
- `GET /api/Filme`
- `GET /api/Filme/{idFilme}`
- `POST /api/Filme`
- `PUT /api/Filme/{idFilme}`
- `DELETE /api/Filme/{idFilme}`

Os campos seguem `FilmeRequest`: `titulo`, `classificacaoIdade`, `sinopse`, `genero`, `duracao`, `urlImagem`, `diretor`, `anoLancamento`.

## Observações
- A API precisa estar executando antes de carregar os filmes.
- A dashboard não acessa o MySQL diretamente.
- A API atual retorna `Ok()` sem o filme no PUT; por isso a dashboard invalida e consulta novamente a lista.
- Não há autenticação administrativa descrita no código enviado. A dashboard não inventa uma autenticação que o backend não oferece.
- O indicador de conexão verifica a listagem de filmes; lista vazia é considerada API acessível.
