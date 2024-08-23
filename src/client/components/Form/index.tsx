import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import {
    authToken,
    displayForm,
    inputEmail,
    inputName,
    inputPassword,
    loginState,
    userId,
} from '../../atoms'
import Input from './components/Input'
import _const from '../../const'

export default function Form() {
    const [errorMessage, setErrorMessage] = useState('')
    const login = useAtomValue(loginState)
    const setDisplay = useSetAtom(displayForm)
    const setToken = useSetAtom(authToken)
    const [name, setName] = useAtom(inputName)
    const [email, setEmail] = useAtom(inputEmail)
    const [password, setPassword] = useAtom(inputPassword)

    const loginSwitch = (): boolean => {
        switch (login) {
            case 'login':
                return true
            case 'signup':
                return false
        }
    }

    const loginToState = (res: AxiosResponse) => {
        console.log(res)
        localStorage.setItem('userId', res.data.user.id)
        localStorage.setItem('token', res.data.token)
        setToken(localStorage.getItem('token'))
        setDisplay(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            let res: AxiosResponse | void

            switch (login) {
                case 'login':
                    res = await axios
                        .post(_const.API_LOGIN_URL, {
                            email,
                            password,
                        })
                        .then((res) => loginToState(res))
                    break

                case 'signup':
                    res = await axios
                        .post(_const.API_REGISTER_URL, {
                            name,
                            email,
                            password,
                        })
                        .then((res) => loginToState(res))
                    break
            }
        } catch (error: any) {
            console.error('ERROR: Authentication failed: ', error)
            setErrorMessage(error.message)
            setDisplay(true)
        }
    }

    return (
        <div className='fixed left-0 top-0 z-10 flex size-full items-center justify-center pl-24 pt-24 backdrop-blur-sm'>
            <div className='card rounded-2xl bg-base-300 p-4'>
                <div className='flex justify-between pb-4'>
                    <h1 className='card-title'>
                        {loginSwitch()
                            ? 'Log in to your user'
                            : 'Create a new user'}
                    </h1>
                    <button
                        className='btn rounded-full'
                        onClick={() => setDisplay(false)}
                    >
                        X
                    </button>
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='flex w-96 flex-col gap-8'
                >
                    {!loginSwitch() ? (
                        <Input
                            label='name'
                            type='text'
                            inputChange={(e) => setName(e.target.value)}
                            inputValue={name}
                        />
                    ) : (
                        <></>
                    )}
                    <Input
                        label='email'
                        type='text'
                        inputChange={(e) => setEmail(e.target.value)}
                        inputValue={email}
                    />
                    <Input
                        label='password'
                        type='password'
                        inputChange={(e) => setPassword(e.target.value)}
                        inputValue={password}
                    />
                    <input type='submit' className='btn' />
                    <p className='text-center text-error'>{errorMessage}</p>
                </form>
            </div>
        </div>
    )
}
