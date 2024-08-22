import { useAtomValue } from 'jotai'
import { displayForm } from './atoms'
import Form from './components/Form'
import Header from './components/Header'

export default function App() {
    const displayState = useAtomValue(displayForm)

    return (
        <div>
            <Header />
            {displayState ? <Form /> : <></>}
            <h1>Hello World!</h1>
        </div>
    )
}
