import { atom } from 'jotai'

// Display management
export const loginState = atom<'login' | 'signup'>('login')
export const displayForm = atom<boolean>(false)

// User creation and login
export const inputName = atom<string>('')
export const inputEmail = atom<string>('')
export const inputPassword = atom<string>('')
