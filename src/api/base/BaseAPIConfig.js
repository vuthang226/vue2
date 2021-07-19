import APIConfig from '@/api/config/APIConfig.js';
import axios from 'axios';

const BaseAPIConfig = axios.create({
    baseURL: APIConfig,
    headers: { 'Content-type': 'application/json' }
});

export default BaseAPIConfig;