import React, { useState } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../contexts/UserContext'; // Importando o contexto

export default function Login({ navigation }) {
    const { setUser } = useUser(); // Obtendo a função setUser do contexto
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    // Função de login
    const login = async () => {
        setLoading(true); // Inicia o loading

        try {
            // Requisição para o login da API
            const response = await api.post('/usuario/login', {
                email: email,
                senha: senha,
            });

            // Salva o token no AsyncStorage
            await AsyncStorage.setItem('@token', response.data.token);
            // await AsyncStorage.setItem('@email', response.data.email);
            // await AsyncStorage.setItem('@senha', response.data.senha);

            // Atualiza os cabeçalhos do axios com o token para autenticação futura
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            // Atualiza os dados do usuário no contexto
            setUser({
                nome: response.data.nome,  // Aqui você precisa ajustar conforme o que a API retorna
                email: response.data.email, // Ajuste para os dados reais que a API retorna
                senha: response.data.senha, // Não é comum armazenar a senha no contexto, então pode deixar vazio
                id: response.data.id // Ajuste para os dados reais que a API retorna
            });

            // Navega para a tela "Home" após o login bem-sucedido
            navigation.navigate('Auth', { screen: 'Home' });

        } catch (error) {
            console.error('Erro no login', error.response || error);
            // Aqui você pode exibir uma mensagem de erro se necessário
        } finally {
            setLoading(false); // Finaliza o loading
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>
                <Form>
                    <Logo />
                    <Input 
                        label='E-mail' 
                        placeholder='Digite seu e-mail'
                        value={email}
                        onChangeText={(text) => setEmail(text)} // Atualiza o email no estado
                    />
                    <Input 
                        label='Senha' 
                        placeholder='Digite sua senha'
                        value={senha}
                        onChangeText={(text) => setSenha(text)} // Atualiza a senha no estado
                        secureTextEntry // Para esconder a senha
                    />
                    <Button
                        title={loading ? 'Carregando...' : 'Entrar'} // Alterando o texto do botão enquanto carrega
                        noSpacing={true}
                        variant='primary'
                        onPress={login}
                        disabled={loading} // Desabilita o botão enquanto o login está sendo feito
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>
                                Crie agora mesmo.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>
        </Wrapper>
    );
}
