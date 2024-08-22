import { useAtom, useAtomValue } from 'jotai'
import { authToken, displayForm, userId, userObj } from './atoms'
import Form from './components/Form'
import Header from './components/Header/index'
import { useEffect } from 'react'
import axios from 'axios'
import _const from './const'

export default function App() {
    const displayState = useAtomValue(displayForm)
    const userID = useAtomValue(userId)
    const [user, setUser] = useAtom(userObj)
    const token = useAtomValue(authToken)

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId !== null) {
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
            {displayState ? <Form /> : <></>}
            <h1>{user ? user.name : 'Hello World!'}</h1>
        </div>
    )
}
