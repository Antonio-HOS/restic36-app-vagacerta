import React, { useState } from "react";
import { Image, Alert } from "react-native";
import axios from "axios";
import {
  Wrapper,
  Container,
  Form,
  TextContainer,
  TextBlack,
  TextLink,
  TextLinkContainer,
} from "./styles";
import BGTop from "../../assets/vagas2.webp";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import api from "../../services/api";

export default function FormScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função para enviar os dados para o backend
  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }
  
    try {
      const response = await api.post("/usuario/register", {
        nome,
        email,
        senha,
      });
  
      // Sucesso na requisição
      Alert.alert("Sucesso", "Dados enviados com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar os dados.");
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
            label="Nome"
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          <Button
            title="Criar conta"
            noSpacing={true}
            variant="primary"
            onPress={handleSubmit}
          />
          <TextContainer>
            <TextBlack>Já tem uma conta?</TextBlack>
            <TextLinkContainer onPress={() => navigation.navigate("Login")}>
              <TextLink>Faça seu login.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}
