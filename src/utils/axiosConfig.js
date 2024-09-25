import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://chobarcart-api.onrender.com',
    withCredentials : true
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if(error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem("refreshToken")
                if(!refreshToken){
                    return Promise.reject(error)
                }
                const res = await axiosInstance.post("users/refresh-token", {
                    refreshToken
                })
                const accessToken = res.data.data.accessToken
                const newRefreshTokne = res.data.data.refreshToken

                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", newRefreshTokne)

                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
                return axiosInstance(originalRequest)
            } catch (error) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance