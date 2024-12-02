import React, { useEffect } from "react";
import { Image, FlatList, View, Text, Alert } from "react-native";
import { Wrapper, Container, ListContainer, TextVagas } from "./styles";
import BGTop from "../../assets/vagas2.webp";
import Logo from "../../components/Logo";
import VagaCard from "../../components/VagaCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { Atualizar } from "../../components/Atualizar";

export default function List() {
  const [vagas, setVagas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleAtualizar = () => {
    fetchVagas();
    Alert.alert("Atualizado com sucesso!");
  };

  const fetchVagas = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("@token");
      if (storedToken) {
        api.defaults.headers.Authorization = `Bearer ${storedToken};`;
      }
      const response = await api.get("/vagas", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setVagas(response.data.jobs);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log("Erro ao recuperar vagas:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVagas();
  }, []);
  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }
  const DATA = vagas;
  return (
    <Wrapper>
      <Image source={BGTop} style={{ height: 150 }} />

      <Container>
        <Logo />
        <TextVagas>{DATA.length} vagas encontradas!</TextVagas>

        <Atualizar
          title="Atualizar"
          noSpacing={false}
          variant="primary"
          onPress={handleAtualizar}
        />
        <ListContainer>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <VagaCard
                id={item.id}
                title={item.title}
                dataCreated={item.dataCadastro.slice(0, 10)}
                company={item.empresa}
              />
            )}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={() => (
              <View>
                <Text>Você ainda não tem tarefas cadastradas</Text>
                <Text>Crie tarefas e organize seus itens a fazer.</Text>
              </View>
            )}
          />
        </ListContainer>
      </Container>
    </Wrapper>
  );
}
