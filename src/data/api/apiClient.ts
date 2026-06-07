import axios from 'axios';
import {API_URL} from '../../constants/Config';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config)=>{
        const token = await SecureStore.getItemAsync('user_token');
        if(token && config.headers){
            config.headers.Authorization =`Bearer ${token}`;
        }
        return config;

    },
    (error)=>Promise.reject(error)
);

export default apiClient;