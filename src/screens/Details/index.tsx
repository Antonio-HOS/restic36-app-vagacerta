import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import api from '../../services/api';
import { Linking, Alert } from 'react-native';

export default function Details({ route, navigation }) {
    const { id } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/vagas/${id}`); 
            setDetails(response.data.job);
            console.log(response.data)
        } catch (err) {
            setError('Erro ao buscar detalhes da vaga.');
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
            Alert.alert('Erro', `Não foi possível abrir o link: ${url}`);
          }
        }
        handleOpenLink();
    };

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
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
                            <Description>{details.description}</Description>
                            <Description>{details.telefone}</Description>
                            <Description>{details.status}</Description>
                            <Description>{details.telefone}</Description>
                            <Description>{details.dataCadastro}</Description>
                        </>
                    ) : (
                        <Description>Nenhuma informação encontrada.</Description>
                    )}
                </ContentContainer>

                {details && details.status === 'ativo' && <Button 
                    onPress={openLink}
                    title="Entrar em contato" 
                    noSpacing={true} 
                    variant='primary'
                />}
            </Container>
        </Wrapper>
    );
}