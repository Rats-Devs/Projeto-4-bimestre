import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const cor_principal = "#1C1E1F";
  const cor_secundaria = "#F2F0EF";
  const cor_destaque = "#FF0000";

  return (
    <View style={[styles.screen, { backgroundColor: cor_principal }]}>
      
      <View style={styles.top}>
        <Ionicons name="film" size={60} color={cor_destaque} />
        <Text style={[styles.titulo, { color: cor_secundaria }]}>Login</Text>
        <Text style={styles.subtitulo}>Entre na sua conta</Text>
      </View>

      <View style={styles.login}>
        
        <Text style={[styles.text, { color: cor_secundaria }]}>Nome Completo</Text>
        <View style={[styles.caixaTextoContainer, { borderColor: cor_secundaria}]}>
          <TextInput 
            placeholder="Digite seu nome"
            placeholderTextColor="#838181"
            style={styles.caixaTexto}
          />
        </View>

        <Text style={[styles.text, { color: cor_secundaria }]}>Email</Text>
        <View style={[styles.caixaTextoContainer, { borderColor: cor_secundaria}]}>
          <TextInput 
            placeholder="Digite seu email"
            placeholderTextColor="#838181"
           style={styles.caixaTexto}
          />
        </View>

        <Text style={[styles.text, { color: cor_secundaria }]}>Digite a senha</Text>
        
        <View style={[styles.caixaTextoContainer, { borderColor: cor_secundaria }]}>
          <TextInput 
            placeholder="Digite a senha"
            placeholderTextColor="#838181"
            style={styles.caixaTexto}
          />

          <Ionicons name="eye-off-outline" size={18} color="#838181" style={{ marginRight: 15 }} />
        </View>

        <TouchableOpacity style={styles.linkEsqueci}>
          <Text style={{ color: cor_destaque, fontWeight: "600" }}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botaoPrincipal, { backgroundColor: cor_destaque }]}>
          <Text style={[styles.textoBotao, { color: cor_secundaria }]}>Login</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,                        
    justifyContent: "center",       
    paddingHorizontal: 24      
  },
  top: {
    alignItems: "flex-start",          
    marginBottom: 30            
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15
  },
  subtitulo: {
    color: "#838181",
    fontSize: 14,
    marginTop: 5
  },
  login: {
    width: "100%"                 
  },
  text: {
    fontSize: 14,
    marginBottom: 8              
  },
  caixaTextoContainer: {
    height: 60,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  caixaTexto: {
    flex: 1, 
    paddingHorizontal: 16, 
    height: "100%", 
    fontSize: 16, 
    borderWidth: 0, 
    color: "#F2F0EF", 
    ...({ outlineStyle: 'none' } as any) //trate como qualquer coisa e os três pontos sao para o none ficar "invisivel"
  },
  linkEsqueci: {
    alignSelf: "flex-end",          
    marginBottom: 24
  },
  botaoPrincipal: {
    height: 50,
    borderRadius: 4,                
    justifyContent: "center",       
    alignItems: "center",
    marginBottom: 30
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "700"
  }
});