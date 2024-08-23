import { Trash2, Pencil } from 'lucide-react'
import { Prisma } from '@prisma/client'

export default function MoviesListItem(props: {
    movie: Prisma.MovieUncheckedCreateInput
}) {
    const { movie } = props

    return (
        <div className='card bg-base-100 image-full w-96 shadow-xl relative'>
            <figure className='relative'>
                <img src={movie.cover} alt={movie.title} />
                <div className='absolute inset-0 bg-black opacity-50'></div>
            </figure>
            <div className='flex flex-col justify-end z-50 p-8 gap-2'>
                <h1 className='card-title'>{movie.title}</h1>
                <p className='font-bold'>Runtime: {movie.runtimeMins} mins</p>
                <p className='italic'>{movie.description}</p>
                {/* @ts-ignore */}
                <p className='text-sm'>Added by {movie.user.name}</p>
                <div className='card-actions justify-end'>
                    <button className='btn btn-ghost hover:text-orange-400 hover:fill-white'>
                        <Pencil />
                    </button>
                    <button className='btn btn-ghost hover:text-red-500'>
                        <Trash2 />
                    </button>
                </div>
            </div>
        </div>
    )
}
