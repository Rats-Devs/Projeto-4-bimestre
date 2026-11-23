código MYSQL:

CREATE DATABASE CINEMA;

USE CINEMA;

CREATE TABLE FILMES (
    ID_FILMES INT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(200) NOT NULL,
    CLASSIFICACAO_IDADE INT NOT NULL,
    SINOPSE VARCHAR(1000),
    GENERO VARCHAR(100),
    DURACAO INT NOT NULL,
    URL_IMAGEM VARCHAR(500) NULL,
    URL_BANNER VARCHAR(500) NULL,
    DIRETOR VARCHAR(150),
    ANO_LANCAMENTO INT
);

CREATE TABLE INGRESSOS (
    ID_INGRESSOS INT AUTO_INCREMENT PRIMARY KEY,
    ID_FILMES_FK INT NOT NULL,
    ASSENTO VARCHAR(10) NOT NULL,
    TIPO_INGRESSO VARCHAR(50) NOT NULL,
    PRECO DECIMAL(10,2) NOT NULL,
    DATA_COMPRA DATETIME DEFAULT CURRENT_TIMESTAMP,
    HORARIO_SESSAO TIME NOT NULL,

    FOREIGN KEY (ID_FILMES_FK) REFERENCES FILMES(ID_FILMES),

    UNIQUE (ID_FILMES_FK, ASSENTO, HORARIO_SESSAO)
);

Configurar a conexão:
conferir se o usuário, senha, servidor e nome do banco no appsettings.json tá igual ao MYSQL do computador

/*
DELETE FROM INGRESSOS;
DELETE FROM FILMES;

ALTER TABLE INGRESSOS AUTO_INCREMENT = 1;
ALTER TABLE FILMES AUTO_INCREMENT = 1;

deletar todos os registros e resetar o ID
*/

INSERTS:

INSERT INTO FILMES (
    TITULO,
    CLASSIFICACAO_IDADE,
    SINOPSE,
    GENERO,
    DURACAO,
    URL_IMAGEM,
    URL_BANNER,
    DIRETOR,
    ANO_LANCAMENTO
) VALUES

(
    'Avatar',
    12,
    'Jake Sully, um ex-fuzileiro naval paraplégico, é enviado a Pandora e acaba se envolvendo com o povo Na’vi, descobrindo um mundo que mudará sua vida.',
    'Ficção Científica',
    162,
    'https://m.media-amazon.com/images/I/91N1lG+LBIS.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSig2gi2Csn2LVxa75pBrQllQwDl2jmB0c4JQFq6hnw6nCFfaAT06VWuew&s=10',
    'James Cameron',
    2009
),

(
    'Vingadores: Ultimato',
    12,
    'Após os acontecimentos devastadores causados por Thanos, os Vingadores restantes se unem para tentar restaurar o universo e trazer de volta aqueles que desapareceram.',
    'Ação',
    181,
    'https://posterflix.com.br/cdn/shop/files/pos-01734-cb178dc5929e16ac7817181315112501-1024-1024.jpg?v=1792176741&width=900',
    'https://blogdebrinquedo.com.br/wp-content/uploads/2019/04/20190426quebra-cabecas-vingadores-ultimato-kin-leung-avengers-endgame-collection-jigsaw-puzzle-02.jpg',
    'Anthony Russo e Joe Russo',
    2019
),

(
    'Batman: O Cavaleiro das Trevas',
    12,
    'Batman enfrenta o Coringa, um criminoso que busca espalhar o caos em Gotham City e desafiar os limites morais de seus habitantes.',
    'Ação',
    152,
    'https://static.wikia.nocookie.net/dublagem/images/c/c2/DKR.jpg/revision/latest?cb=20250422014431&path-prefix=pt-br',
    'https://ovicio.com.br/wp-content/uploads/the-dark-knight-20-1200-1200-675-675-crop-000000.jpg',
    'Christopher Nolan',
    2008
),

(
    'Carros 2',
    0,
    'Relâmpago McQueen e Mate viajam pelo mundo para participar de uma competição internacional, mas acabam envolvidos em uma missão de espionagem.',
    'Animação',
    106,
    'https://static.wikia.nocookie.net/dublagem/images/a/af/Carros_2.jpeg/revision/latest?cb=20230721135632&path-prefix=pt-br',
    'https://images4.alphacoders.com/144/144758.jpg',
    'John Lasseter',
    2011
),

(
    'Coraline',
    10,
    'Coraline descobre uma porta secreta em sua nova casa que leva a uma versão alternativa de sua vida, aparentemente perfeita, mas que esconde segredos assustadores.',
    'Animação / Fantasia',
    100,
    'https://image.tmdb.org/t/p/original/rranXmvqPT4NoXzmxhFtXr9nNYT.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA1wgIZqosSdAfyXQ-VXDuPTBxOljoZsV7UfGofhn9ALj_rWQYq3sKG2c&s=10',
    'Henry Selick',
    2009
),

(
    'Harry Potter e a Pedra Filosofal',
    10,
    'Harry Potter descobre que é um bruxo e começa a estudar em Hogwarts, onde conhece seus amigos e descobre mistérios ligados à Pedra Filosofal.',
    'Fantasia',
    152,
    'https://posterflix.com.br/cdn/shop/files/pos-01151-6073d84a95ca4f27d217181339331228-1024-1024.jpg?v=1792177140',
    'https://images5.alphacoders.com/676/676896.jpg',
    'Chris Columbus',
    2001
),

(
    'Lilo Stitch',
    10,
    'Uma garota havaiana chamada Lilo adota uma criatura alienígena fugitiva chamada Stitch. Juntos, eles descobrem o significado de família e amizade.',
    'Comédia / Aventura',
    111,
    'https://posterflix.com.br/cdn/shop/files/pos-04178-31087f4d20a59296c117476602279494-1024-1024.jpg?v=1792180327&width=900',
    'https://4kwallpapers.com/images/wallpapers/lilo-stitch-2025-7680x4320-20079.jpg',
    'Dean Fleischer Camp',
    2025
),

(
    'Quarteto Fantástico: Primeiros Passos',
    12,
    'A Primeira Família da Marvel precisa enfrentar uma ameaça cósmica que coloca em risco a Terra e tudo o que eles conhecem.',
    'Ação / Ficção Científica',
    115,
    'https://www.papodecinema.com.br/wp-content/uploads/2025/07/20250729-quarteto-fantastico-primeiros-passos-poster-papo-de-cinema-scaled.webp',
    'https://images6.alphacoders.com/139/1397668.jpg',
    'Matt Shakman',
    2025
),

(
    'Sonic: O Filme',
    0,
    'Sonic, um ouriço azul extremamente veloz, chega à Terra e precisa unir forças com um policial para enfrentar o Dr. Robotnik.',
    'Ação / Aventura',
    100,
    'https://m.media-amazon.com/images/S/pv-target-images/fc835c3b3882f114c7c5efdfbb2790dd6050235ce9397913bd21e22c68553c3c.jpg',
    'https://wallpapercat.com/w/full/b/a/7/374189-3840x2160-desktop-4k-sonic-the-hedgehog-movie-background-photo.jpg',
    'Jeff Fowler',
    2020
),

(
    'O Espetacular Homem-Aranha',
    10,
    'Peter Parker investiga os mistérios de seu passado enquanto tenta equilibrar sua vida pessoal e suas responsabilidades como Homem-Aranha.',
    'Ação / Aventura',
    136,
    'https://static.wikia.nocookie.net/marvel-filmes/images/3/3a/O_Espetacular_Homem-Aranha.jpg/revision/latest?cb=20130730202807&path-prefix=pt-br',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw-4SbcFKZZxyPZfggLwFPn7LEiQ0MCYQFmPgsc-7Xl5kvsL8UocTqutr8&s=10',
    'Marc Webb',
    2012
),

(
    'Star Wars: A Ascensão Skywalker',
    10,
    'A Resistência enfrenta sua batalha final contra a ameaça da Primeira Ordem enquanto Rey busca compreender seu passado e seu destino.',
    'Ficção Científica',
    142,
    'https://conteudo.imguol.com.br/c/entretenimento/fd/2019/08/24/o-novo-poster-de-star-wars-a-ascensao-skywalker-1566668329684_v2_1296x1920.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNwe21bZ0ZbbwDXjTlSvKa3ArSgCbsbbB8IixWl3grHGV2vnUuTgWEP8zf&s=10',
    'J.J. Abrams',
    2019
),

(
    'Superman',
    12,
    'Superman tenta conciliar sua origem kryptoniana com sua vida humana enquanto enfrenta desafios que testam sua esperança e seus valores.',
    'Ação / Ficção Científica',
    129,
    'https://posterflix.com.br/cdn/shop/files/pos-04260-0d853c54103e19561b17510255470935-1024-1024.jpg?v=1792180401&width=900',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB03wT-K8vPHWusyi0fD1ClrySVJPCKtPOXVDJ7Iy4iCZRKAyntEAH2vw9&s=10',
    'James Gunn',
    2025
);