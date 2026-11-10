import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

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

  const LISTA_FILMES = [
    { id: "1", titulo: "Spiderman: Um Novo dia", reviews: "6.7K", comments: "67k", imagem: "https://cdn.marvel.com/content/2x/smbnd_online_1400x2100_hoodie_02.webp" },
    { id: "2", titulo: "Logan", reviews: "6.7K", comments: "67k", imagem: "https://i.ebayimg.com/00/s/MTYwMFgxMDM4/z/IgYAAOSwBr1kXLCG/$_57.JPG?set_id=880000500F" },
    { id: "3", titulo: "The Batman", reviews: "6.7K", comments: "67k", imagem: "https://static.wikia.nocookie.net/universo-batman/images/a/ac/P%C3%B4ster_de_%27Batman%27.jpg/revision/latest?cb=20220307110904&path-prefix=pt-br" },
    { id: "4", titulo: "It: Chapter Two", reviews: "6.7K", comments: "67k", imagem: "https://pbs.twimg.com/media/D6IsBmFV4AEQ1lz?format=jpg&name=4096x4096" },
    { id: "5", titulo: "Deadpool", reviews: "6.7K", comments: "67k", imagem: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/04eafb25626631.5634844b7293f.jpg" },
    { id: "6", titulo: "Star Wars: The last Jedi", reviews: "6.7K", comments: "67k", imagem: "https://lumiere-a.akamaihd.net/v1/images/sb_teaser2_1-sht_v3a_online_lg_44ecdb4e.jpeg" },
    { id: "7", titulo: "Spiderman", reviews: "6.7K", comments: "67k", imagem: "https://acdn-us.mitiendanube.com/stores/004/687/740/products/pos-01392-9512d27af47f9af48317181332018571-1024-1024.webp" },
    { id: "8", titulo: "Red notice", reviews: "6.7K", comments: "67k", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF6hOt4esl48VTYwseV3WAco0eUalJcWOOkarmtgcLuxUo3_PUaVsaO30&s=10" },
  ];

  const renderizarFilme = ({ item }: { item: typeof LISTA_FILMES[0] }) => (
    <TouchableOpacity style={styles.cartaoFilme} onPress={() => router.push(`/${item.id}`)} activeOpacity={0.8}>
      <View style={[styles.posterFilme, { backgroundColor: cor_secundaria + "15", overflow: "hidden" }]}>
        <Image source={{ uri: item.imagem }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      </View>

      <View style={styles.linhaEstatisticas}>
        <Text style={[styles.textDestaque, { color: cor_destaque }]}>{item.reviews} review</Text>
        <Text style={{ color: cor_secundaria + "50", fontSize: 8 }}> • </Text>
        <Text style={[styles.textDestaque, { color: cor_destaque }]}>{item.comments} comments</Text>
      </View>

      <Text style={[styles.tituloFilme, { color: cor_secundaria }]} numberOfLines={1}>
        {item.titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.tela, { backgroundColor: cor_principal }]}>
      <FlatList
        data={LISTA_FILMES} //pega os dados que tão dentro de LISTA_FILMES
        renderItem={renderizarFilme}
        keyExtractor={(item) => item.id} //identificação única de cada item
        numColumns={2}
        showsVerticalScrollIndicator={false}//tira a barra de rolagem
        columnWrapperStyle={styles.linhaGrade}//aplica o css nas linhas
        ListHeaderComponent={ //antes de colocar a flatlist coloca a barra de pesquisa etc
          <View>
            <View style={styles.containerUser}>
              <View>
                <Text style={[styles.textOla, { color: cor_secundaria + "80" }]}>Olá</Text>
                <Text style={[styles.textName, { color: cor_secundaria }]}>Juca</Text>
              </View>

              <TouchableOpacity style={styles.botaoSino}>
                <Ionicons name="notifications-outline" size={25} color={cor_secundaria} />
              </TouchableOpacity>
            </View>

            <View style={[styles.caixaPesquisaContainer, { backgroundColor: cor_secundaria + "10", marginBottom: 25 }]}>
              <TextInput placeholder="Pesquise um filme..." placeholderTextColor="#838181" style={styles.search} />
              <Ionicons name="search-outline" size={25} color={cor_secundaria + "80"} style={{ marginRight: 20 }} />
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 25
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
    fontFamily: "Poppins"
  },
  textName: {
    fontSize: 23,
    fontFamily: "PoppinsBold"
  },
  botaoSino: {
    padding: 5,
  },
  caixaPesquisaContainer: {
    height: 45,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  search: {
    flex: 1,
    paddingHorizontal: 20,
    height: "100%",
    fontSize: 14,
    borderWidth: 0,
    color: "#F2F0EF",
    fontFamily: "Poppins",
    ...({ outlineStyle: "none" } as any)
  },
  linhaGrade: {
    justifyContent: "space-between",
    marginBottom: 25
  },
  cartaoFilme: {
    width: "47%"
  },
  posterFilme: {
    height: 250,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  linhaEstatisticas: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4
  },
  textDestaque: {
    fontSize: 10,
    fontFamily: "PoppinsSemiBold"
  },
  tituloFilme: {
    fontSize: 12,
    fontFamily: "PoppinsBold"
  }
});