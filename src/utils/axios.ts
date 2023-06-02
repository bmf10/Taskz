/* eslint-disable no-undef */
import OgAxios, { AxiosResponse } from "axios"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || typeof window === "object"
    ? `${window.location.origin}/api`
    : ""

const axios = OgAxios.create({
  baseURL: BASE_URL,
})

const successInterceptor = (res: AxiosResponse) => {
  return res.data
}

axios.interceptors.response.use(successInterceptor)

export default axios
