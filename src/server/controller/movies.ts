import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const result = await prisma.movie.findMany({
            include: {
                user: true,
            },
        })
        res.json({ movies: result })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}
