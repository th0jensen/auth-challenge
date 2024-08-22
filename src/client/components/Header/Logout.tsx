import { useSetAtom } from 'jotai'
import { authToken, userId, userObj } from '../../atoms'

export default function Logout() {
    const setUserId = useSetAtom(userId)
    const setUserObj = useSetAtom(userObj)
    const setAuthToken = useSetAtom(authToken)

    const logout = () => {
        setUserId(null)
        setUserObj(null)
        setAuthToken(null)

        localStorage.removeItem('token')
    }

    return (
        <button
            className='btn btn-primary'
            onClick={() => {
                logout()
            }}
        >
            Log out
        </button>
    )
}
