import axios from 'axios';

const api = axios.create({
    baseURL: 'http://<COLOQUE-O-ENDEREÇO-DE-IP-DO-SEU-COMPUTADOR>/api' // Corrigido de baseUrl para baseURL
});

export default api;
