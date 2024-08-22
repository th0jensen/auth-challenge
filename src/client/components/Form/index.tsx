import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
    displayForm,
    inputEmail,
    inputName,
    inputPassword,
    loginState,
} from '../../atoms'
import Input from './components/Input'
import axios from 'axios'
import { hash } from 'bcryptjs'

const API_URL = 'http://localhost:3030/users'

export default function Form() {
    const login = useAtomValue(loginState)
    const setDisplay = useSetAtom(displayForm)
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

    const handleSubmit = async (e: React.FormEvent<Element>) => {
        e.preventDefault()
        switch (login) {
            case 'login':
                axios
                    .post(API_URL + '/login', {
                        email: email,
                        password: password,
                    })
                    .then((res) => console.log(res.data))

                break

            case 'signup':
                axios
                    .post(API_URL + '/register', {
                        name: name,
                        email: email,
                        password: password,
                    })
                    .then((res) => console.log(res.data))

                break
        }
        setDisplay(false)
    }

    return (
        <div className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center pl-24 pt-24 backdrop-blur-sm'>
            <div className='card bg-base-300 rounded-2xl p-4'>
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
                    className='flex flex-col w-96 gap-8'
                >
                    {loginSwitch() ? (
                        <></>
                    ) : (
                        <Input
                            label='name'
                            type='text'
                            inputChange={(e) => setName(e.target.value)}
                            inputValue={name}
                        />
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
                </form>
            </div>
        </div>
    )
}
