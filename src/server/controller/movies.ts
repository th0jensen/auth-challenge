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

export const createMovie = async (req: Request, res: Response) => {
    const { title, runtimeMins, description, cover, userId } = req.body

    try {
        const result = await prisma.movie.create({
            data: {
                title: title,
                runtimeMins: parseInt(runtimeMins),
                description: description,
                cover: cover,
                userId: parseInt(userId),
            },
            include: {
                user: true,
            },
        })
        res.json({ movie: result })
    } catch (e: any) {
        res.json({ error: e.message })
    }
}
