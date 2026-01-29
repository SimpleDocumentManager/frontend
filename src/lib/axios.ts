import axiosDefault, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import jsCookie from 'js-cookie'

const axios: AxiosInstance = axiosDefault.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const onAxiosError = async (error: AxiosError<{ message: string; statusCode: number }>) => {
    const message = error.response?.data?.message || 'Something went wrong, please try again later'
    const statusCode = error.response?.data?.statusCode || 500

    if (statusCode === 401) {
        if (message === 'Token expired, please refresh your token') {
            const req = error.config as AxiosError['config'] & { _retry: boolean }
            const refreshToken = jsCookie.get('refresh_token')

            if (req._retry || !refreshToken) {
                jsCookie.remove('access_token')
                jsCookie.remove('refresh_token')
                window.location.href = '/login'
                return
            }

            req._retry = true

            const res = await axios.post('/v1/sessions/refresh', undefined, {
                headers: { Authorization: `Bearer ${refreshToken}` },
            })
            const token = res.data.data.accessToken

            jsCookie.set('access_token', token)

            req.headers.Authorization = `Bearer ${token}`

            return await axios.request(req)
        }

        jsCookie.remove('access_token')
        jsCookie.remove('refresh_token')
        window.location.href = '/login'
        return
    }

    throw error
}

const onAxiosRequest = async (config: InternalAxiosRequestConfig) => {
    const token = jsCookie.get('access_token')
    config.headers = config.headers || {}
    if (!config.headers.Authorization && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

axios.interceptors.request.use(onAxiosRequest, Promise.reject)

axios.interceptors.response.use(Promise.resolve, onAxiosError)

export default axios
