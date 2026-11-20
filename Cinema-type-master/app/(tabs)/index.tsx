import {Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useEffect, useState } from "react";

//interface serve para definir a estrutura e os tipos dos dados q podemos utilizar
interface Filme {
  idFilme: number;
  titulo: string;
  classificacaoIdade: number;
  genero: string;
  duracao: number;
  urlImagem: string | null;
}

export default function HomeScreen() {
  const router = useRouter();

  // Guarda os filmes recebidos da API
  const [filmes, setFilmes] = useState<Filme[]>([]);

  // Controla o carregamento e possíveis erros
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca os filmes quando a tela é aberta
  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch("http://localhost:5160/api/Filme");

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os filmes.");
        }

        const dados: Filme[] = await resposta.json();

        setFilmes(dados);
      } catch (erro) {
        console.error("Erro ao buscar filmes:", erro);
        setErro("Não foi possível carregar os filmes.");
      } finally {
        setCarregando(false);
      }
    }

    buscarFilmes();
  }, []);

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

  // Renderiza cada filme recebido da API
  const renderizarFilme = ({ item }: { item: Filme }) => (
    <TouchableOpacity
      style={styles.cartaoFilme}
      onPress={() => router.push(`/${item.idFilme}`)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.posterFilme,
          {
            backgroundColor: cor_secundaria + "15",
            overflow: "hidden",
          },
        ]}
      >
        <Image
          source={{ uri: item.urlImagem }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      <Text
        style={[styles.tituloFilme, { color: cor_secundaria }]}
        numberOfLines={1}
      >
        {item.titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.tela, { backgroundColor: cor_principal }]}>

      {carregando ? (
        <Text style={{ color: cor_secundaria }}>
          Carregando filmes...
        </Text>
      ) : erro ? (
        <Text style={{ color: cor_destaque }}>
          {erro}
        </Text>
      ) : (
        <FlatList
          data={filmes}
          renderItem={renderizarFilme}
          keyExtractor={(item) => item.idFilme.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.linhaGrade}
          ListHeaderComponent={
            <View>
              <View style={styles.containerUser}>
                <View>
                  <Text
                    style={[
                      styles.textOla,
                      { color: cor_secundaria + "80" },
                    ]}
                  >
                    Olá
                  </Text>

                  <Text
                    style={[
                      styles.textName,
                      { color: cor_secundaria },
                    ]}
                  >
                    Juca
                  </Text>
                </View>

                <TouchableOpacity style={styles.botaoSino}>
                  <Ionicons
                    name="notifications-outline"
                    size={25}
                    color={cor_secundaria}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.caixaPesquisaContainer,
                  {
                    backgroundColor: cor_secundaria + "10",
                    marginBottom: 25,
                  },
                ]}
              >
                <TextInput
                  placeholder="Pesquise um filme..."
                  placeholderTextColor="#838181"
                  style={styles.search}
                />

                <Ionicons
                  name="search-outline"
                  size={25}
                  color={cor_secundaria + "80"}
                  style={{ marginRight: 20 }}
                />
              </View>
            </View>
          }
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 25,
  },

  containerUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
  },

  textOla: {
    fontSize: 13,
    fontFamily: "Poppins",
  },

  textName: {
    fontSize: 23,
    fontFamily: "PoppinsBold",
  },

  botaoSino: {
    padding: 5,
  },

  caixaPesquisaContainer: {
    height: 45,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  search: {
    flex: 1,
    paddingHorizontal: 20,
    height: "100%",
    fontSize: 14,
    borderWidth: 0,
    color: "#F2F0EF",
    fontFamily: "Poppins",
    ...({ outlineStyle: "none" } as any),
  },

  linhaGrade: {
    justifyContent: "space-between",
    marginBottom: 25,
  },

  cartaoFilme: {
    width: "47%",
  },

  posterFilme: {
    height: 250,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  linhaEstatisticas: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },

  textDestaque: {
    fontSize: 10,
    fontFamily: "PoppinsSemiBold",
  },

  tituloFilme: {
    fontSize: 12,
    fontFamily: "PoppinsBold",
  },
});