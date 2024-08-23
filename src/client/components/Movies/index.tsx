import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { addingMovie, moviesArray, userObj } from '../../atoms'
import Error from '../../Error'
import { useEffect } from 'react'
import axios from 'axios'
import _const from '../../const'
import MoviesListItem from './components/MovieListItem'
import MoviesListForm from './components/MovieListForm'

export default function Movies() {
    const [addingMov, setAddingMov] = useAtom(addingMovie)
    const user = useAtomValue(userObj)
    const [movies, setMovies] = useAtom(moviesArray)

    useEffect(() => {
        axios
            .get(_const.API_MOVIES_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => setMovies(res.data.movies))
    }, [])

    if (!user) return <Error />
    if (!movies)
        return (
            <div>
                <span className='loading loading-spinner'></span>
            </div>
        )

    return (
        <div className='flex flex-col gap-4 place-content-start'>
            <div className='flex flex-row justify-end'>
                <button
                    className='btn btn-primary'
                    onClick={() => setAddingMov(!addingMov)}
                >
                    Add movie
                </button>
            </div>
            {addingMov ? <MoviesListForm /> : <></>}
            {movies.map((movie) => (
                <MoviesListItem key={movie.id} movie={movie} />
            ))}
        </div>
    )
}
