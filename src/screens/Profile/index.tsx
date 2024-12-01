import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext"; // Importando o contexto
import {
  Wrapper,
  Container,
  Header,
  HeaderButtonContainer,
  ButtonIcon,
  ButtonText,
  ContentContainer,
} from "../Profile/styles";
import Logo from "../../components/Logo";
import theme from "../../theme";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import api from "../../services/api";
import { LogOut } from "../../components/LogOut";

export default function Profile({ navigation }) {
  // Acessando o contexto do usuário
  const { user, setUser } = useUser(); // Pegando o estado do usuário e a função para atualizá-lo
  const [senha, setSenha] = useState("");

  // Recuperar o token do AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@token"); // Recupera o token armazenado
      return token; // Retorna o token
    } catch (error) {
      console.error("Erro ao recuperar o token", error);
      return null; // Caso haja erro, retorna null
    }
  };

  // Função PUT para atualizar os dados do perfil
  const handleSaveProfile = async () => {
    const token = await getToken(); // Recupera o token
    console.log(user);
    if (token) {
      try {
        const response = await api.patch(
          `/usuario/${user.id}`,
          {
            nome: user.nome, // Usa o nome do contexto
            email: user.email, // Usa o email do contexto
            senha: senha, // Usa a senha local
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
            },
          }
        );

        // Exibe um alerta de sucesso
        Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
        setSenha(""); // Limpa a senha após a atualização
        // Atualiza os dados no contexto após a atualização
        setUser({
            ...user,
          nome: response.data.user.nome,
          email: response.data.user.email,
        });
        console.log(response.data);
      } catch (error) {
        Alert.alert("Erro", "Erro ao salvar as informações.");
        console.log(error);
      }
    } else {
      Alert.alert("Erro", "Token não encontrado");
    }
  };

  const handleLogOut = async () => {
    try {
      // Limpa o token do AsyncStorage
      await AsyncStorage.removeItem("@token");
      // Limpa o contexto de usuário
      setUser({}); // ou setUser({}) caso queira preservar uma estrutura vazia
      // Redireciona para a tela de login
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer logout.");
      console.log(error);
    }
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
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            value={user.nome} // Usando o nome do contexto
            onChangeText={(text) => setUser({ ...user, nome: text })} // Atualiza o nome no contexto
          />
          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={user.email} // Usando o email do contexto
            onChangeText={(text) => setUser({ ...user, email: text })} // Atualiza o email no contexto
          />
          <Input
            label="Senha"
            placeholder="Atualize a sua senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha} // Atualiza a senha localmente
          />
        </ContentContainer>

        <Button
          title="Salvar informações"
          noSpacing={true}
          variant="primary"
          onPress={handleSaveProfile} // Chama a função de salvar ao pressionar
        />
      </Container>
        <LogOut title="Fazer LogOut" onPress={handleLogOut}  noSpacing={false}
          variant="primary"
          />
    </Wrapper>
  );
}
