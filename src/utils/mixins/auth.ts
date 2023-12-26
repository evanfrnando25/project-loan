import Cookies from 'js-cookie'

export const getToken = (): string | null => {
    return Cookies.get('token') || null
}

export const removeCredential = () => {
    Cookies.remove('token')
}