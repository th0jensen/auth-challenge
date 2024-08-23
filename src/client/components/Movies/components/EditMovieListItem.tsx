import { Prisma } from '@prisma/client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
    editTitleAtom,
    editDescriptionAtom,
    editCoverAtom,
    editRuntimeAtom,
    userIdAtom,
    tokenAtom,
    isEditingAtom,
    refreshAtom,
} from '../../../atoms'
import { API_MOVIES_URL } from '../../../const'
import axios from 'axios'
// import { useEffect } from 'react'

export default function EditMovieListItem(props: {
    movie: Prisma.MovieUncheckedCreateInput
}) {
    const [title, setTitle] = useAtom(editTitleAtom)
    const [description, setDescription] = useAtom(editDescriptionAtom)
    const [cover, setCover] = useAtom(editCoverAtom)
    const [runtime, setRuntime] = useAtom(editRuntimeAtom)
    const [refresh, setRefresh] = useAtom(refreshAtom)
    const setIsEditing = useSetAtom(isEditingAtom)
    const userId = useAtomValue(userIdAtom)
    const token = useAtomValue(tokenAtom)
    const { movie } = props

    // useEffect(() => {
    //     setTitle(movie.title)
    //     setDescription(movie.description)
    //     setCover(movie.cover)
    //     setRuntime(movie.runtimeMins.toString())
    // }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const updatedTitle = title || movie.title
        const updatedDescription = description || movie.description
        const updatedCover = cover || movie.cover
        const updatedRuntime = runtime || movie.runtimeMins.toString()

        axios
            .put(
                `${API_MOVIES_URL}/${movie.id}`,
                {
                    title: updatedTitle,
                    description: updatedDescription,
                    cover: updatedCover,
                    runtimeMins: updatedRuntime,
                    userId: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                setIsEditing(false)
                setRefresh(!refresh)
            })
            .catch((err) => {
                console.error('Error updating movie:', err)
            })
    }

    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl relative min-h-96'>
            <figure className='relative'>
                <img
                    className='h-72 w-full'
                    src={movie.cover}
                    alt={movie.title}
                />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </figure>
            <form
                className='flex flex-col justify-end z-40 p-8 gap-4'
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    className='input input-md'
                    placeholder={movie.title}
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className='input input-md'
                    placeholder={`${movie.runtimeMins} mins`}
                    type='number'
                    value={runtime}
                    onChange={(e) => setRuntime(e.target.value)}
                />
                <input
                    className='input input-md'
                    placeholder={`Movie Poster URL`}
                    type='url'
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                />
                <textarea
                    className='textarea textarea-md'
                    placeholder={`Description:\n${movie.description}`}
                    cols={20}
                    rows={7}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input className='btn btn-primary' type='submit' />
            </form>
        </div>
    )
}
