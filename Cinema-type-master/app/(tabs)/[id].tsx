import {Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useEffect, useRef, useState } from "react";

interface Filme {
  idFilme: number;
  titulo: string;
  classificacaoIdade: number;
  sinopse: string;
  genero: string;
  duracao: number;
  urlImagem: string | null;
  diretor: string;
  anoLancamento: number;
}

export default function DetalhesFilme() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [filme, setFilme] = useState<Filme | null>(null);//state q vai armazenar os dados do filme da API
  const [carregando, setCarregando] = useState(true);

  const [tipoSelecionado, setTipoSelecionado] = useState<"Inteira" | "Meia" | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [assentosSelecionados, setAssentosSelecionados] = useState<string[]>([]);
  const [assentosOcupados, setAssentosOcupados] = useState<string[]>([]);

  const [comprando, setComprando] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function buscarFilme() {
      setCarregando(true);//inicia novamente o carregamento caso o ID mude.

      //permite tratar erros na requisição
      try {
        const resposta = await fetch(
          `http://localhost:5160/api/Filme/${id}`
        );

        //verifica se a resposta HTTP foi bem-sucedida.
        if (!resposta.ok) {
          setFilme(null);
          return;
        }

        const dados = await resposta.json();

        //guarda o filme recebido da API
        setFilme(dados);

      //permite tratar erros na requisição
      } catch (erro) {
        console.error("Erro ao buscar filme:", erro);
        setFilme(null);

      } finally {
        //executa mesmo se ocorrer algum erro
        setCarregando(false);
      }
    }

      buscarFilme();
    }, [id]);

  useEffect(() => {
    if (!horarioSelecionado || !id) return;

    const buscarAssentosOcupados = async () => {
      try {
        const resposta = await fetch(
          `http://localhost:5160/api/Ingresso/assentos-ocupados?idFilme=${id}&horarioSessao=${encodeURIComponent(horarioSelecionado)}`
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar assentos ocupados.");
        }

        const dados = await resposta.json();

        setAssentosOcupados(dados);
        setAssentosSelecionados([]);
      } catch (erro) {
        console.error("Erro ao consultar assentos:", erro);
      }
    };

      buscarAssentosOcupados();
    }, [id, horarioSelecionado]);

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

  const horarios = ["12:00", "15:30", "19:00"];

  const precoInteira = 30;
  const precoMeia = 15;

  const fileiras = ["A", "B", "C", "D", "E"];
  const quantidadeAssentos = 12;

  const precoUnitario =
    tipoSelecionado === "Inteira" ? precoInteira :
    tipoSelecionado === "Meia" ? precoMeia : 0;

  const total = assentosSelecionados.length * precoUnitario;

  if (carregando) {
    return null;
  }

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

  const comprarIngressos = async () => {
    // Verifica se todas as informações foram selecionadas
    if (!tipoSelecionado) {
      alert("Selecione o tipo de ingresso.");
      return;
    }

    if (!horarioSelecionado) {
      alert("Selecione um horário.");
      return;
    }

    if (assentosSelecionados.length === 0) {
      alert("Selecione pelo menos um assento.");
      return;
    }

    setComprando(true);

    const preco = tipoSelecionado === "Inteira" ? 30 : 15;
    const assentosComprados: string[] = [];//guarda os assentos que ja estão ocupados

    try {
      // Envia um ingresso para cada assento selecionado
      for (const assento of assentosSelecionados) {
        const resposta = await fetch("http://localhost:5160/api/Ingresso", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idFilme: Number(id),
            assento: assento,
            tipoIngresso: tipoSelecionado,
            preco: preco,
            horarioSessao: `${horarioSelecionado}:00`,
          }),
        });

        if (resposta.status === 409) {
          throw new Error(
            `O assento ${assento} já foi comprado por outra pessoa.`
          );
        }

        if (!resposta.ok) {
          throw new Error(
            `Não foi possível comprar o assento ${assento}. Erro HTTP: ${resposta.status}.`
          );
        }

        // Só registra na lista depois que o backend confirmar o POST
        assentosComprados.push(assento);
      }

      // Atualiza os assentos ocupados na tela
      setAssentosOcupados((anteriores) => [
        ...anteriores,
        ...assentosComprados,
      ]);

      setAssentosSelecionados([]);

      alert("Compra realizada com sucesso!");
      } catch (erro) {
        console.error("Erro na compra:", erro);

        // Mantém na tela os assentos que já foram comprados
        if (assentosComprados.length > 0) {
          setAssentosOcupados((anteriores) => [
            ...anteriores,
            ...assentosComprados,
          ]);

          setAssentosSelecionados((anteriores) =>
            anteriores.filter(
              (assento) => !assentosComprados.includes(assento)
            )
          );
        }

        const mensagem =
          erro instanceof Error ? erro.message : "Erro ao realizar a compra.";

        if (assentosComprados.length > 0) {
          alert(
            `${mensagem}\n\nAssentos já comprados: ${assentosComprados.join(", ")}.`
          );
        } else {
          alert(mensagem);
        }
      } finally {
      setComprando(false);
    }
  };

  return (
    <View style={[styles.tela, { backgroundColor: cor_principal }]}>

    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>

        {/* IMAGEM DO FILME */}
        <View style={styles.containerImagem}>

          {filme.urlImagem && (
            <Image
              source={{ uri: filme.urlImagem }}
              style={styles.imagem}
              resizeMode="cover"
            />
          )}

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

          </View>

          {/* INFORMAÇÕES */}
          <View style={styles.informacoes}>

            <Text style={styles.info}>
              {filme.anoLancamento}
            </Text>

            <Text style={styles.ponto}>•</Text>

            <Text style={styles.info}>
              {filme.genero}
            </Text>

            <Text style={styles.ponto}>•</Text>

            <Text style={styles.info}> {filme.duracao} min</Text>

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
            {filme.sinopse}
          </Text>

          {/* COMPRA DE INGRESSOS */}
          <View style={styles.secaoCompra}>

            <Text style={[styles.tituloCompra, { color: cor_secundaria }]}>
              Tipo do ingresso
            </Text>

            <View style={styles.linhaOpcoes}>
              {(["Inteira", "Meia"] as const).map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.opcaoCompra,
                    tipoSelecionado === tipo && styles.opcaoAtiva,
                  ]}
                  onPress={() => setTipoSelecionado(tipo)}
                >
                  <Text
                    style={[
                      styles.textoOpcao,
                      tipoSelecionado === tipo && styles.textoOpcaoAtiva,
                    ]}
                  >
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.tituloCompra, { color: cor_secundaria }]}>
              Horários
            </Text>

            <View style={styles.linhaOpcoes}>
              {horarios.map((horario) => (
                <TouchableOpacity
                  key={horario}
                  style={[
                    styles.opcaoCompra,
                    horarioSelecionado === horario && styles.opcaoAtiva,
                  ]}
                  onPress={() => {
                    setHorarioSelecionado(horario);
                    setAssentosSelecionados([]);
                  }}
                >
                  <Text
                    style={[
                      styles.textoOpcao,
                      horarioSelecionado === horario && styles.textoOpcaoAtiva,
                    ]}
                  >
                    {horario}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.tituloCompra, { color: cor_secundaria }]}>
              Selecione seus assentos
            </Text>

            <View style={styles.legendaAssentos}>
              <View style={styles.itemLegenda}>
                <View style={styles.assentoLegenda} />
                <Text style={styles.textoLegenda}>Disponíveis</Text>
              </View>

              <View style={styles.itemLegenda}>
                <View style={[styles.assentoLegenda, styles.assentoOcupado]} />
                <Text style={styles.textoLegenda}>Ocupados</Text>
              </View>

              <View style={styles.itemLegenda}>
                <View style={[styles.assentoLegenda, styles.assentoSelecionado]} />
                <Text style={styles.textoLegenda}>Selecionados</Text>
              </View>
            </View>

            <View style={styles.telaCinema}>
              <Text style={styles.textoTela}>TELA</Text>
            </View>

            {fileiras.map((fileira) => (
              <View key={fileira} style={styles.fileiraAssentos}>
                {Array.from({ length: quantidadeAssentos }, (_, index) => {
                  const assento = `${fileira}${index + 1}`;
                  const selecionado = assentosSelecionados.includes(assento);
                  const ocupado = assentosOcupados.includes(assento);

                  return (
                    <TouchableOpacity
                      key={assento}
                      disabled={ocupado}
                      style={[
                        styles.assento,
                        ocupado && styles.assentoOcupado,
                        (index === 3 || index === 9) && styles.espacoCorredor,
                        selecionado && styles.assentoSelecionado,
                      ]}
                      onPress={() => {
                        if (ocupado) return;

                        setAssentosSelecionados((anteriores) =>
                          selecionado
                            ? anteriores.filter((item) => item !== assento)
                            : [...anteriores, assento]
                        );
                      }}
                    >
                      <Text
                        style={[
                          styles.textoAssento,
                          selecionado && styles.textoAssentoSelecionado,
                        ]}
                      >
                        {assento}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* RESUMO DA COMPRA */}
            <View style={styles.resumoCompra}>
              <Text style={styles.tituloCompra}>Resumo da compra</Text>

              <Text style={styles.textoResumo}>
                Assentos: {assentosSelecionados.length > 0
                  ? assentosSelecionados.join(", ")
                  : "Nenhum"}
              </Text>

              <Text style={styles.textoResumo}>
                Quantidade: {assentosSelecionados.length}
              </Text>

              <Text style={styles.textoResumo}>
                Horário: {horarioSelecionado || "Não selecionado"}
              </Text>

              <Text style={styles.textoResumo}>
                Total: R$ {total.toFixed(2).replace(".", ",")}
              </Text>
            </View>

          {/* BOTÕES */}
          <View style={styles.botoes}>

            {/* BOTÃO COMPRAR */}
              <TouchableOpacity
                style={[
                  styles.botaoComprar,
                  { backgroundColor: cor_destaque },
                ]}
                onPress={comprarIngressos}
                disabled={comprando}
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
                {comprando ? "Processando..." : "Comprar ingresso"}
              </Text>
            </TouchableOpacity>

            {/* BOTÃO FAVORITO */}
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

  secaoCompra: {
    marginTop: 35,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },

  tituloCompra: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginBottom: 15,
  },

  linhaOpcoes: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },

  opcaoCompra: {
    borderWidth: 1,
    borderColor: "#777",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },

  opcaoAtiva: {
    backgroundColor: "#FF0000",
    borderColor: "#FF0000",
  },

  textoOpcao: {
    color: "#F2F0EF",
    fontFamily: "PoppinsSemiBold",
  },

  textoOpcaoAtiva: {
    color: "#F2F0EF",
  },

  legendaAssentos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  itemLegenda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  assentoLegenda: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#777",
  },

  assentoOcupado: {
    backgroundColor: "#444",
  },

  textoLegenda: {
    color: "#F2F0EF90",
    fontSize: 10,
    fontFamily: "Poppins",
  },

  telaCinema: {
    height: 35,
    backgroundColor: "#777",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  textoTela: {
    color: "#1C1E1F",
    fontFamily: "PoppinsBold",
    fontSize: 11,
  },

  fileiraAssentos: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 3,
    marginBottom: 9,
  },

  assento: {
    width: 23,
    height: 27,
    borderRadius: 5,
    backgroundColor: "#777",
    justifyContent: "center",
    alignItems: "center",
  },

  assentoSelecionado: {
    backgroundColor: "#FF0000",
  },

  textoAssento: {
    color: "#F2F0EF",
    fontSize: 9,
  },

  textoAssentoSelecionado: {
    color: "#F2F0EF",
  },

  resumoCompra: {
    marginTop: 30,
    padding: 18,
    backgroundColor: "#292B2C",
    borderRadius: 10,
    gap: 10,
  },

  textoResumo: {
    color: "#F2F0EF",
    fontSize: 12,
    fontFamily: "Poppins",
  },

  espacoCorredor: {
    marginLeft: 12,
  },

});