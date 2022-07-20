import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

const client = axios.create({
  baseURL: config.API_URL,
  params: {
    'api-key': config.API_TOKEN,
  },
});

export default client;
