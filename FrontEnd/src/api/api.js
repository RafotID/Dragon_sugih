import axiosInstance from "./axiosInstance"

export const registerApi = (values) => {
  return axiosInstance.post(`/signup`,values)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
export const loginApi = (values) => {
  return axiosInstance.post(`/login`,values).then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}