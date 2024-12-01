import React, { useEffect } from "react";
import { Image, FlatList, View, Text } from "react-native";
import { Wrapper, Container, ListContainer, TextVagas } from "./styles";
import BGTop from "../../assets/BGTop.png";
import Logo from "../../components/Logo";
import VagaCard from "../../components/VagaCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

export default function List() {
  const [vagas, setVagas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
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
      <Image source={BGTop} style={{ maxHeight: 86 }} />

      <Container>
        <Logo />
        <TextVagas>{DATA.length} vagas encontradas!</TextVagas>
        <ListContainer>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <VagaCard
                id={item.id}
                title={item.title}
                dataCreated={item.dataCadastro}
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
