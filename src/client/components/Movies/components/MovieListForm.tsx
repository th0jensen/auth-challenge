import { useAtom } from 'jotai'
import {
    inputCover,
    inputDescription,
    inputRuntime,
    inputTitle,
} from '../../../atoms'

export default function MoviesListForm() {
    const [title, setTitle] = useAtom(inputTitle)
    const [description, setDescription] = useAtom(inputDescription)
    const [cover, setCover] = useAtom(inputCover)
    const [runtime, setRuntime] = useAtom(inputRuntime)

    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl relative'>
            <figure className='relative'>
                <img src={cover} alt={title} />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </figure>
            <form className='flex flex-col justify-end z-50 p-8 gap-2'>
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
                    onChange={(e) => setRuntime(parseInt(e.target.value))}
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
