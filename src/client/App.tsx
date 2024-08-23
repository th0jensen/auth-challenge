import axios from 'axios'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { authToken, displayForm, userId, userObj } from './atoms'
import Form from './components/Form'
import Header from './components/Header/index'
import _const from './const'
import Movies from './components/Movies'

export default function App() {
    const displayState = useAtomValue(displayForm)
    const userID = useAtomValue(userId)
    const [user, setUser] = useAtom(userObj)
    const token = useAtomValue(authToken)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if (![token, userId].includes(null)) {
            axios
                .get(`${_const.API_BASE_URL}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => {
                    setUser(res.data.user)
                    console.log(res)
                })
                .catch((err) => {
                    console.error('Error fetching user data:', err)
                })
        }
    }, [userID, token, setUser])

    return (
        <div>
            <Header />
            <main className='h-screen flex justify-center pt-24'>
                <div>
                    {displayState ? <Form /> : <></>}
                    {user ? (
                        <Movies />
                    ) : (
                        <span className='loading loading-spinner'></span>
                    )}
                </div>
            </main>
        </div>
    )
}
