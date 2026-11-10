import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DetalhesFilme() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const cor_principal = "#1C1E1F";
  const cor_secundaria = "#F2F0EF";
  const cor_destaque = "#FF0000";

  const FILMES = {
    "1": {
      titulo: "Spiderman: Um Novo Dia",
      ano: "2026",
      genero: "Ação / Aventura",
      duracao: "2h 30min",
      nota: "7.8",
      reviews: "6.7K",
      imagem:
        "https://cdn.marvel.com/content/2x/smbnd_online_1400x2100_hoodie_02.webp",
      descricao:
        "Peter Parker enfrenta novos desafios enquanto tenta equilibrar sua vida pessoal com as responsabilidades de ser o Homem-Aranha.",
    },

    "2": {
      titulo: "Logan",
      ano: "2017",
      genero: "Ação / Drama",
      duracao: "2h 17min",
      nota: "8.1",
      reviews: "6.7K",
      imagem:
        "https://i.ebayimg.com/00/s/MTYwMFgxMDM4/z/IgYAAOSwBr1kXLCG/$_57.JPG?set_id=880000500F",
      descricao:
        "Em um futuro onde os mutantes estão praticamente extintos, Logan precisa proteger uma jovem mutante enquanto enfrenta ameaças do seu passado.",
    },

    "3": {
      titulo: "The Batman",
      ano: "2022",
      genero: "Ação / Crime",
      duracao: "2h 56min",
      nota: "7.8",
      reviews: "6.7K",
      imagem:
        "https://static.wikia.nocookie.net/universo-batman/images/a/ac/P%C3%B4ster_de_%27Batman%27.jpg/revision/latest?cb=20220307110904&path-prefix=pt-br",
      descricao:
        "The Batman acompanha Bruce Wayne em seu segundo ano como vigilante de Gotham. Enquanto investiga uma série de crimes misteriosos, Batman enfrenta o Charada.",
    },

    "4": {
      titulo: "It: Chapter Two",
      ano: "2019",
      genero: "Terror",
      duracao: "2h 49min",
      nota: "6.5",
      reviews: "6.7K",
      imagem:
        "https://pbs.twimg.com/media/D6IsBmFV4AEQ1lz?format=jpg&name=4096x4096",
      descricao:
        "Anos depois dos acontecimentos originais, o Clube dos Perdedores retorna a Derry para enfrentar novamente a ameaça que marcou sua infância.",
    },

    "5": {
      titulo: "Deadpool",
      ano: "2016",
      genero: "Ação / Comédia",
      duracao: "1h 48min",
      nota: "8.0",
      reviews: "6.7K",
      imagem:
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/04eafb25626631.5634844b7293f.jpg",
      descricao:
        "Wade Wilson ganha habilidades especiais após um experimento e assume a identidade de Deadpool em busca de vingança.",
    },

    "6": {
      titulo: "Star Wars: The Last Jedi",
      ano: "2017",
      genero: "Ação / Aventura",
      duracao: "2h 32min",
      nota: "7.0",
      reviews: "6.7K",
      imagem:
        "https://lumiere-a.akamaihd.net/v1/images/sb_teaser2_1-sht_v3a_online_lg_44ecdb4e.jpeg",
      descricao:
        "Rey procura Luke Skywalker enquanto a Resistência enfrenta novos perigos durante a guerra contra a Primeira Ordem.",
    },

    "7": {
      titulo: "Spiderman",
      ano: "2002",
      genero: "Ação / Aventura",
      duracao: "2h 1min",
      nota: "7.4",
      reviews: "6.7K",
      imagem:
        "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-01392-9512d27af47f9af48317181332018571-1024-1024.webp",
      descricao:
        "Depois de ser picado por uma aranha geneticamente modificada, Peter Parker ganha poderes e decide usá-los para proteger as pessoas.",
    },

    "8": {
      titulo: "Red Notice",
      ano: "2021",
      genero: "Ação / Comédia",
      duracao: "1h 58min",
      nota: "6.3",
      reviews: "6.7K",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF6hOt4esl48VTYwseV3WAco0eUalJcWOOkarmtgcLuxUo3_PUaVsaO30&s=10",
      descricao:
        "Um agente do FBI precisa trabalhar ao lado de dois criminosos rivais para capturar um dos ladrões de arte mais procurados do mundo.",
    },
  };

  const filme = FILMES[id as keyof typeof FILMES];

  if (!filme) {
    return (
      <View style={[styles.tela, { backgroundColor: cor_principal }]}>
        <Text style={[styles.erro, { color: cor_secundaria }]}>
          Filme não encontrado
        </Text>

        <TouchableOpacity
          style={[styles.botaoVoltarErro, { backgroundColor: cor_destaque }]}
          onPress={() => router.back()}
        >
          <Text style={{ color: cor_secundaria }}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.tela, { backgroundColor: cor_principal }]}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGEM DO FILME */}
        <View style={styles.containerImagem}>

          <Image
            source={{ uri: filme.imagem }}
            style={styles.imagem}
            resizeMode="cover"
          />

          {/* BOTÃO VOLTAR */}
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={cor_secundaria}
            />
          </TouchableOpacity>

          {/* BOTÃO PLAY */}
          <TouchableOpacity style={styles.botaoPlay}>
            <Ionicons
              name="play"
              size={28}
              color={cor_principal}
            />
          </TouchableOpacity>

        </View>

        {/* CONTEÚDO */}
        <View style={styles.conteudo}>

          {/* TÍTULO */}
          <View style={styles.linhaTitulo}>

            <Text
              style={[
                styles.titulo,
                { color: cor_secundaria },
              ]}
            >
              {filme.titulo}
            </Text>

            <View style={styles.imdb}>
              <Text style={styles.textoImdb}>
                IMDb {filme.nota}
              </Text>
            </View>

          </View>

          {/* INFORMAÇÕES */}
          <View style={styles.informacoes}>

            <Text style={styles.info}>
              {filme.ano}
            </Text>

            <Text style={styles.ponto}>•</Text>

            <Text style={styles.info}>
              {filme.genero}
            </Text>

            <Text style={styles.ponto}>•</Text>

            <Text style={styles.info}>
              {filme.duracao}
            </Text>

          </View>

          {/* AVALIAÇÃO */}
          <View style={styles.avaliacao}>

            {[1, 2, 3, 4, 5].map((item) => (
              <Ionicons
                key={item}
                name="star"
                size={18}
                color="#FFD900"
              />
            ))}

            <Text style={styles.reviews}>
              {filme.reviews} reviews
            </Text>

          </View>

          {/* DESCRIÇÃO */}
          <Text
            style={[
              styles.tituloSecao,
              { color: cor_secundaria },
            ]}
          >
            Sobre o filme
          </Text>

          <Text
            style={[
              styles.descricao,
              { color: cor_secundaria + "90" },
            ]}
          >
            {filme.descricao}
          </Text>

          {/* BOTÕES */}
          <View style={styles.botoes}>

            <TouchableOpacity
              style={[
                styles.botaoComprar,
                { backgroundColor: cor_destaque },
              ]}
            >
              <Ionicons
                name="ticket-outline"
                size={21}
                color={cor_secundaria}
              />

              <Text
                style={[
                  styles.textoComprar,
                  { color: cor_secundaria },
                ]}
              >
                Comprar ingresso
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.botaoFavorito,
                { borderColor: cor_destaque },
              ]}
            >
              <Ionicons
                name="bookmark-outline"
                size={24}
                color={cor_destaque}
              />
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
  },

  containerImagem: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },

  imagem: {
    width: "100%",
    height: "100%",
  },

  botaoVoltar: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 2,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#00000090",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoPlay: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#F2F0EF",
    justifyContent: "center",
    alignItems: "center",
  },

  conteudo: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },

  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titulo: {
    flex: 1,
    fontSize: 25,
    fontFamily: "PoppinsBold",
  },

  imdb: {
    backgroundColor: "#FFD900",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },

  textoImdb: {
    color: "#1C1E1F",
    fontSize: 10,
    fontFamily: "PoppinsBold",
  },

  informacoes: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },

  info: {
    color: "#F2F0EF90",
    fontSize: 11,
    fontFamily: "Poppins",
  },

  ponto: {
    color: "#838181",
    marginHorizontal: 7,
  },

  avaliacao: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  reviews: {
    color: "#F2F0EF80",
    fontSize: 10,
    fontFamily: "Poppins",
    marginLeft: 8,
  },

  tituloSecao: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginTop: 25,
    marginBottom: 8,
  },

  descricao: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: "Poppins",
  },

  botoes: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  botaoComprar: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  textoComprar: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
  },

  botaoFavorito: {
    width: 52,
    height: 52,
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  erro: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginTop: 300,
  },

  botaoVoltarErro: {
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },

});