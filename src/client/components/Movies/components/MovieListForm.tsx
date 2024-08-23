import { useAtom, useSetAtom } from 'jotai'
import {
    addingMovie,
    inputCover,
    inputDescription,
    inputRuntime,
    inputTitle,
} from '../../../atoms'
import axios from 'axios'
import _const from '../../../const'

export default function MoviesListForm() {
    const [title, setTitle] = useAtom(inputTitle)
    const [description, setDescription] = useAtom(inputDescription)
    const [cover, setCover] = useAtom(inputCover)
    const [runtime, setRuntime] = useAtom(inputRuntime)
    const setIsAdding = useSetAtom(addingMovie)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios
            .post(
                _const.API_MOVIES_URL,
                {
                    title: title,
                    description: description,
                    cover: cover,
                    runtimeMins: runtime,
                    userId: localStorage.getItem('userId'),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                setIsAdding(false)
            })
            .catch((err) => {
                console.error('Error creating movie:', err)
            })
    }

    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl relative'>
            <figure className='relative'>
                <img src={cover} alt={title} />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </figure>
            <form
                className='flex flex-col justify-end z-40 p-8 gap-2'
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    className='input input-md'
                    placeholder='Title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className='input input-md'
                    placeholder='Runtime Mins'
                    type='number'
                    value={runtime}
                    onChange={(e) => setRuntime(e.target.value)}
                />
                <input
                    className='input input-md'
                    placeholder='Movie Poster'
                    type='url'
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                />
                <textarea
                    className='input input-md'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {/* @ts-ignore */}
                <input className='btn btn-ghost' type='submit' />
            </form>
        </div>
    )
}
