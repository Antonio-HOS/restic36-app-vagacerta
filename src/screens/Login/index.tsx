import React, { useState } from "react";
import { Image, Alert } from "react-native";
import {
  Wrapper,
  Container,
  Form,
  TextContainer,
  TextBlack,
  TextLink,
  TextLinkContainer,
} from "./styles";
import BGTop from "../../assets/vagas3.jpg";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../contexts/UserContext"; // Importando o contexto

export default function Login({ navigation }) {
  const { setUser, saveToken } = useUser(); // Obtendo as funções do contexto
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // Função de login
  const login = async () => {
    setLoading(true); // Inicia o loading

    try {
      // Requisição para o login da API
      const response = await api.post("/usuario/login", { email, senha });

      const { token, nome, email: userEmail, id } = response.data; // Ajuste com base no retorno real da API

      // Salva o token no AsyncStorage e atualiza o contexto
      await AsyncStorage.setItem("@token", token);
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({ nome, email: userEmail, id })
      );

      saveToken(token); // Salva o token no contexto global

      // Atualiza os dados do usuário no contexto
      setUser({ nome, email: userEmail, id });

      // Configura os cabeçalhos do axios para autenticação futura
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Limpa o campo de senha
      setSenha("");

      // Navega para a tela "Home" após o login bem-sucedido
      navigation.navigate("Auth", { screen: "Home" });
    } catch (error) {
    //   console.error("Erro no login:", error.response || error);
      Alert.alert(
        "Erro",
        "Não foi possível realizar o login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <Wrapper>
      <Image
        source={BGTop}
        style={{ maxHeight: 260, width: "100%" }}
        resizeMode="cover"
      />

      <Container>
        <Form>
          <Logo />
          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={(text) => setEmail(text)} // Atualiza o email no estado
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={(text) => setSenha(text)} // Atualiza a senha no estado
            secureTextEntry // Para esconder a senha
          />
          <Button
            title={loading ? "Carregando..." : "Entrar"} // Alterando o texto do botão enquanto carrega
            noSpacing={true}
            variant="primary"
            onPress={login}
            disabled={loading} // Desabilita o botão enquanto o login está sendo feito
          />
          <TextContainer>
            <TextBlack>Não tem uma conta?</TextBlack>
            <TextLinkContainer
              onPress={() => navigation.navigate("FormScreen")}
            >
              <TextLink>Crie agora mesmo.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}
