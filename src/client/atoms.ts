import { atom } from 'jotai'

// Display Management
export const loginState = atom<'login' | 'signup'>('login')
export const displayForm = atom<boolean>(false)

// User Creation and Login
export const inputName = atom<string>('')
export const inputEmail = atom<string>('')
export const inputPassword = atom<string>('')

// User Data Store
export const loggedIn = atom<boolean>(false)
export const authToken = atom<string | null>(null)
export const userId = atom<number | null>(null)
