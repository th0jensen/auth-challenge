import { Prisma } from '@prisma/client'
import { atom } from 'jotai'

// Display Management
export const loginState = atom<'login' | 'signup'>('login')
export const displayForm = atom<boolean>(false)

// User Creation and Login
export const inputName = atom<string>('')
export const inputEmail = atom<string>('')
export const inputPassword = atom<string>('')

// User Data Store
export const authToken = atom<string | null>(null)
export const userId = atom<number | null>(null)
export const userObj = atom<Prisma.UserUncheckedCreateInput | null>(null)

// Movies
export const moviesArray = atom<Prisma.MovieUncheckedCreateInput[] | null>(null)
export const addingMovie = atom<boolean>(false)

// Movie Creation
export const inputTitle = atom<string>('')
export const inputDescription = atom<string>('')
export const inputCover = atom<string>('')
export const inputRuntime = atom<number>(0)
