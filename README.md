# 📱 Meu Projeto React Native

Este é um aplicativo mobile desenvolvido com [React Native](https://reactnative.dev/), utilizando Expo e integração com um backend para gerenciar dados de vagas de emprego.

## ⚡ Tecnologias

- **React Native**: Framework para construção de aplicativos móveis nativos.
- **JavaScript/TypeScript**: Linguagens utilizadas no desenvolvimento.
- **Expo**: Ferramenta para facilitar o desenvolvimento, construção e implantação de aplicativos React Native.
- **Axios**: Biblioteca para fazer requisições HTTP.

## 🚀 Como executar

### 1. Clone o repositório

Clone este repositório para sua máquina local e acesse a pasta do projeto:

```bash
git clone https://github.com/Antonio-HOS/restic36-app-vagacerta.git
```

```bash
cd restic36-app-vagacerta
```

### 2.Configure o arquivo api.js:

**No arquivo src/api.js, atualize a URL base da API com o endereço do seu backend local.**

```javascript
const api = axios.create({
  baseURL: "http://192.168.X.X:3000/api",
});
```

_importante: Certifique-se de que o endereço IP corresponde ao IP do computador onde o backend está rodando._

## 3. Instale as dependências:

```bash
  npm install --legacy-peer-deps
```

```bash
  yarn install --legacy-peer-deps
```

## 4. Execute o aplicativo:

```bash
  npm start
```

```bash
  yarn start
```

Escaneie o QR code no terminal ou na página do Expo com o aplicativo Expo Go (iOS/Android) ou execute em um emulador configurado.

# 🔗 Backend

O backend para este aplicativo pode ser encontrado neste [repositório](https://github.com/Antonio-HOS/vagas-api)

Certifique-se de seguir as instruções do repositório do backend para configurá-lo e iniciá-lo.
