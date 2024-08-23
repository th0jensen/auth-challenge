import { Prisma } from '@prisma/client'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Display Management
export const loginStateAtom = atom<'login' | 'signup'>('login')
export const modalAtom = atom<boolean>(false)
export const refreshAtom = atom<boolean>(false)
export const showProfileMenuAtom = atom<boolean>(false)

// User Creation and Login
export const inputNameAtom = atom<string>('')
export const inputEmailAtom = atom<string>('')
export const inputPasswordAtom = atom<string>('')

// User Data Store
export const tokenAtom = atomWithStorage<string | null>('token', null)
export const userIdAtom = atomWithStorage<number | null>('userId', null)
export const userDataAtom = atom<Prisma.UserUncheckedCreateInput | null>(null)

// Movies
export const moviesArray = atom<Prisma.MovieUncheckedCreateInput[] | null>(null)
export const addingMovie = atom<boolean>(false)

// Movie Creation
export const inputTitleAtom = atom<string>('')
export const inputDescriptionAtom = atom<string>('')
export const inputCoverAtom = atom<string>('')
export const inputRuntimeAtom = atom<string>('')

// Movie Editing
export const isEditingAtom = atom<boolean>(false)
export const editTitleAtom = atom<string>('')
export const editDescriptionAtom = atom<string>('')
export const editCoverAtom = atom<string>('')
export const editRuntimeAtom = atom<string>('')
