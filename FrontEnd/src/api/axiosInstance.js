

// axiosConfig.ts
import axios from 'axios'

import { base_url_be } from '../utils/global'

const axiosInstance = axios.create({
  baseURL: base_url_be, // Ganti dengan baseURL yang sesuai
  timeout: 50000 // Sesuaikan dengan timeout yang diinginkan
})
// Interceptor untuk menangani request sebelum dikirim
axiosInstance.interceptors.request.use(
  (config) => {
    // Misalkan token disimpan dalam localStorage dengan key 'authToken'
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` 
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// Interceptor untuk menangani response
axiosInstance.interceptors.response.use(
  (response) => {
    // Lakukan penanganan jika diperlukan
    return response
  },
  (error) => {
    console.log(error)
    if (
      error.response.status == 401 &&
      error.response.statusText == 'Unauthorized'
    ) {
      alert('U bent afgemeld omdat uw sessie verlopen is')
      // Bersihkan data pengguna dari localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('UID')
      localStorage.removeItem('accessToken')

      // Arahkan ke halaman login atau halaman lainnya
      window.location.href = '/'
    }
    // Lakukan penanganan error seperti menampilkan pesan kesalahan
    return Promise.reject(error)
  }
)
export default axiosInstance