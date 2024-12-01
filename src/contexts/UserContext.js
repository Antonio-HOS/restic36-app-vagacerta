import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';

// Criação do contexto
const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazenará { name, email }
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Recuperar token e usuário do AsyncStorage ao inicializar
    const loadUserAndToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@token');
        const storedUser = await AsyncStorage.getItem('@user');

        if (storedToken) {
          setToken(storedToken);
          api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        }
        console.log(storedUser);

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse para objeto { name, email }
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      }
    };

    loadUserAndToken();
  }, []);

  const saveToken = async (newToken) => {
    try {
      await AsyncStorage.setItem('@token', newToken);
      setToken(newToken);
      api.defaults.headers.Authorization = `Bearer ${newToken}`;
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o token');
    }
  };

  const saveUser = async (userData) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(userData)); // Salva como string
      setUser(userData); // Atualiza o estado
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados do usuário');
    }
  };

  const clearUserAndToken = async () => {
    try {
      await AsyncStorage.multiRemove(['@token', '@user']); // Remove ambos
      setToken({});
      setUser({});
      delete api.defaults.headers.Authorization; // Remove headers da API
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover os dados do usuário');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, saveToken, saveUser, clearUserAndToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
