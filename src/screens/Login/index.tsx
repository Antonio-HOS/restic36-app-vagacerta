import { Image } from 'react-native';
import { Wrapper,Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import { useState } from 'react';

import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState(null);
  
    // Função de login
    const login = async () => {
      try {
        const response = await api.post('/login', {
          email: email,
          senha: senha,
        });
        
        // Salve o token no estado ou em um armazenamento seguro (ex: AsyncStorage)
        setToken(response.data.token);
        console.log('Login bem-sucedido!', response.data);
        
        // Se você usar o token para autenticação, adicione-o nas próximas requisições
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        
      } catch (error) {
        console.error('Erro no login', error.response || error);
      }
    };
  
    // Função para buscar dados após o login
    const getDados = async () => {
      try {
        const response = await api.get('/posts');
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados', error.response || error);
      }
    };
  
    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>

                <Form>
                    <Logo />
                    <Input label='E-mail' placeholder='digite seu e-mail'/>
                    <Input label='Senha' placeholder='digite sua senha'/>
                    <Button 
                    title="Entrar" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={() => navigation.navigate('Auth', { screen: 'Home' })}
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
