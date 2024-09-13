import Env from "./env"

export const BASE_URL = `${Env.BACKEND_URL}/api`
export const REGISTER_URL = `${BASE_URL}/auth/register`
export const LOGIN_URL = `${BASE_URL}/auth/login`

export const CHEACK_CREDIITIONALS_URL = `${BASE_URL}/auth/cheak/credentials`

export const FORGET_PASSWORD_URL = `${BASE_URL}/auth/forget-password`

export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`
export const CLASH_URL = `${BASE_URL}/clash`
export const CLASH_ITEMS_URL = `${BASE_URL}/clash/items`



