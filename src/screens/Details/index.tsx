import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Wrapper,
  Container,
  Header,
  HeaderButtonContainer,
  ButtonIcon,
  ButtonText,
  ContentContainer,
  Title,
  Description,
  Info,
} from "../Details/styles";
import Logo from "../../components/Logo";
import theme from "../../theme";
import { Button } from "../../components/Button";
import api from "../../services/api";
import { Linking, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("@token");
      if (storedToken) {
        api.defaults.headers.Authorization = `Bearer ${storedToken};`;
      }

      setLoading(true);
      const response = await api.get(`/vagas/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setDetails(response.data.job);
      console.log(response.data);
    } catch (err) {
      setError("Erro ao buscar detalhes da vaga.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const openLink = () => {
    const handleOpenLink = async () => {
      const url = `https://wa.me/${details.telefone}?text=Olá%20Do%20Cepedi`;
      const supported = await Linking.canOpenURL(url);
      console.log(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erro", `Não foi possível abrir o link: ${url}`);
      }
    };
    handleOpenLink();
  };

  return (
    <Wrapper>
      <Header>
        <HeaderButtonContainer onPress={() => navigation.goBack()}>
          <ButtonIcon>
            <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
          </ButtonIcon>
          <ButtonText>Voltar</ButtonText>
        </HeaderButtonContainer>
        <Logo />
      </Header>

      <Container>
        <ContentContainer>
          {loading ? (
            <Title>Carregando...</Title>
          ) : error ? (
            <Description>{error}</Description>
          ) : details ? (
            <>
              <Title>{details.title}</Title>

              <Description>•Descrição:</Description>
              <Info>{details.description}</Info>
              <Description>•Status:</Description>
              <Info>{details.status}</Info>
              <Description>•Telefone:</Description>
              <Info>{details.telefone}</Info>
              <Description>•Data Cadastro:</Description>
              <Info>{details.dataCadastro.slice(0, 10)}</Info>

            </>
          ) : (
            <Description>Nenhuma informação encontrada.</Description>
          )}
        </ContentContainer>

        {details && details.status === "ativo" && (
          <Button
            onPress={openLink}
            title="Entrar em contato"
            noSpacing={true}
            variant="primary"
          />
        )}
      </Container>
    </Wrapper>
  );
}
