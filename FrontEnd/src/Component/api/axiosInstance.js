import axios from "axios"; 

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',  // Perbaiki penulisan Content-Type
  },
  timeout: 1000,  // Pindahkan timeout di luar headers
});

export default instance;
