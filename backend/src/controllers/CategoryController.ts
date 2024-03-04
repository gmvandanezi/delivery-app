import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export default {
    async createCategory(req: Request, res: Response) {
        try {
            const { name } = req.body;

            const categoryExists = await prisma.category.findUnique({
                where: { name }
            });

            if(categoryExists){
                return res.json({
                    error: true,
                    message: 'Categoria já cadastrada'
                });
            }

            const category = await prisma.category.create({
                data: {
                    name
                }
            });

            return res.json({
                error: false,
                message: 'Categoria cadastrada com sucesso',
                category
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getAllCategories(req: Request, res: Response) {
        try {

            const categories = await prisma.category.findMany();

            return res.json({
                categories
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getCategoryById(req: Request, res: Response) {
        try {

            const { id } = req.params; 

            const category = await prisma.category.findUnique({
                where: {
                    id
                }
            });

            return res.json({
                category
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },
};