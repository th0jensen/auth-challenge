import { useAtomValue, useSetAtom } from 'jotai'
import { loginState, displayForm, userObj } from '../../atoms'
import Logout from './Logout'

export default function Header() {
    const setLogin = useSetAtom(loginState)
    const setDisplay = useSetAtom(displayForm)
    const user = useAtomValue(userObj)

    return (
        <header className='navbar fixed bg-base-300 p-4'>
            <div className='navbar-start'>
                <h1 className='font-bold text-xl btn btn-ghost'>
                    Movie Manager
                </h1>
            </div>
            <div className='navbar-end gap-4'>
                {user !== null ? (
                    <>
                        <p className='font-bold btn btn-ghost'>{user.name}</p>
                        <Logout />
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </header>
    )
}
