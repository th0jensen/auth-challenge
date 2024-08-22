import { useSetAtom } from 'jotai'
import { loginState, displayForm } from '../atoms'

export default function Header() {
    const setLogin = useSetAtom(loginState)
    const setDisplay = useSetAtom(displayForm)

    return (
        <header className='navbar'>
            <div className='navbar-start'>
                <h1 className='font-bold btn btn-ghost'>Movie Manager</h1>
            </div>
            <div className='navbar-end gap-4'>
                <button
                    className='btn btn-ghost'
                    onClick={() => {
                        setLogin('signup')
                        setDisplay(true)
                    }}
                >
                    Sign up
                </button>
                <button
                    className='btn btn-primary'
                    onClick={() => {
                        setLogin('login')
                        setDisplay(true)
                    }}
                >
                    Log in
                </button>
            </div>
        </header>
    )
}
