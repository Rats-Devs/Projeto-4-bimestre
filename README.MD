# Cinemax — Preparação para o computador da escola

## 1. Objetivo

Preparar o projeto Cinemax para funcionar em outro computador, mantendo a integração entre:

- Backend em C# / ASP.NET Core.
- Banco de dados MySQL.
- Site Cinemax.
- Aplicativo React Native.
- Dashboard administrativo (quando estiver finalizado).

**Importante:** copiar os arquivos do projeto não é suficiente. Também precisamos configurar o ambiente, instalar as dependências e preparar o banco de dados.

---

## 2. O que levar para a escola

Antes de sair de casa, conferir:

- [ ] Projeto completo atualizado.
- [ ] Backend C#.
- [ ] Código do site.
- [ ] Código do aplicativo.
- [ ] Código do dashboard, caso já esteja finalizado.
- [ ] Arquivo `.sql` com a estrutura e os dados necessários do banco.
- [ ] Arquivos de imagens, banners, fontes e outros recursos.
- [ ] Arquivos de configuração necessários.
- [ ] Backup do projeto original.

**Recomendação:** levar uma cópia em pendrive e outra em um serviço de armazenamento na nuvem ou no GitHub.

---

## 3. Programas necessários

Verificar se o computador da escola possui:

- [ ] .NET SDK compatível com o backend.
- [ ] MySQL Server.
- [ ] Node.js e npm.
- [ ] Visual Studio ou Visual Studio Code.
- [ ] Git (opcional, mas recomendado).

Para conferir as instalações, utilizar o terminal:

```bash
dotnet --version
node -v
npm -v
git --version
```

---

## 4. Preparar o banco de dados

No computador da escola:

1. Instalar ou iniciar o MySQL Server.
2. Criar o banco de dados do Cinemax.
3. Importar o arquivo `.sql` exportado do computador original.
4. Conferir se as tabelas foram criadas.
5. Conferir se os filmes e demais dados necessários estão presentes.
6. Verificar as chaves estrangeiras e restrições UNIQUE.

**Atenção:** a restrição UNIQUE dos ingressos deve continuar impedindo a compra duplicada do mesmo assento para o mesmo filme e horário.

---

## 5. Configurar o backend C#

Abrir a pasta do backend e conferir a string de conexão com o MySQL.

Verificar principalmente:

- Nome do servidor.
- Porta do MySQL.
- Nome do banco.
- Usuário.
- Senha.

Não utilizar a senha do computador pessoal se ela for diferente da senha configurada na escola.

No terminal, dentro da pasta do backend:

```bash
dotnet restore
dotnet build
dotnet run
```

A API utilizada no computador original está em:

```text
http://localhost:5160
```

Depois de iniciar a API, testar:

```text
http://localhost:5160/swagger
```

Também testar o endpoint:

```text
http://localhost:5160/api/Filme
```

Verificar se os filmes são retornados corretamente.

---

## 6. Configurar o site

1. Abrir a pasta do site.
2. Conferir os caminhos das imagens e dos arquivos CSS e JavaScript.
3. Procurar as URLs utilizadas nas requisições à API.
4. Confirmar que elas apontam para a API executada no computador da escola.
5. Abrir o site pelo ambiente adequado e testar a listagem dos filmes.
6. Testar a consulta de assentos ocupados e a compra de um ingresso.

---

## 7. Configurar o aplicativo React Native

Abrir a pasta `Cinema-type-master`.

Instalar as dependências:

```bash
npm install
```

Iniciar o Expo:

```bash
npx expo start
```

Para executar pelo navegador, pressionar:

```text
w
```

**Atenção à URL da API:**

O aplicativo atualmente utiliza:

```text
http://localhost:5160
```

Isso funciona quando o aplicativo é executado no navegador do próprio computador.

Se for executado em um celular físico, será necessário utilizar o endereço IP local do computador, desde que ambos estejam na mesma rede e o firewall permita a conexão.

---

## 8. Testes obrigatórios antes da apresentação

### Backend

- [ ] API inicia sem erros.
- [ ] Swagger abre corretamente.
- [ ] GET de filmes funciona.
- [ ] GET de filme por ID funciona.
- [ ] POST de filmes funciona.
- [ ] Demais operações CRUD funcionam.

### Site

- [ ] Filmes são carregados pela API.
- [ ] Detalhes dos filmes aparecem corretamente.
- [ ] Compra de ingressos funciona.
- [ ] Assentos ocupados aparecem corretamente.

### Aplicativo

- [ ] Filmes são carregados pela API.
- [ ] Detalhes dos filmes aparecem corretamente.
- [ ] Horários podem ser selecionados.
- [ ] Assentos podem ser selecionados.
- [ ] Assentos ocupados não podem ser selecionados.
- [ ] Compra de ingressos funciona.
- [ ] Compra aparece também no site.

### Banco de dados

- [ ] Registros são inseridos corretamente.
- [ ] Dados permanecem após reiniciar a API.
- [ ] Não existem compras duplicadas.
- [ ] Relacionamentos entre as tabelas funcionam.

### Dashboard

- [ ] Listagem de filmes funciona.
- [ ] Cadastro de filmes funciona.
- [ ] Edição de filmes funciona.
- [ ] Exclusão de filmes funciona.
- [ ] Alterações aparecem no site e no aplicativo.

---

## 9. Cuidados importantes

- Não apagar o projeto original do computador pessoal.
- Não esquecer de exportar o banco de dados.
- Não esquecer imagens e outros arquivos que não estejam no repositório.
- Não compartilhar senhas ou credenciais no GitHub.
- Verificar se o firewall permite as conexões necessárias.
- Não presumir que o projeto funciona só porque compilou: testar a integração completa.

---

## 10. Ordem recomendada para preparar o computador

1. Instalar os programas necessários.
2. Copiar o projeto.
3. Preparar o MySQL.
4. Importar o banco de dados.
5. Configurar a conexão do backend.
6. Iniciar e testar a API.
7. Iniciar e testar o site.
8. Iniciar e testar o aplicativo.
9. Preparar e testar o dashboard.
10. Fazer uma compra de teste e conferir a sincronização entre as interfaces.

**Objetivo final:** conseguir executar o Cinemax no computador da escola, com todas as partes conectadas ao mesmo backend e banco de dados.