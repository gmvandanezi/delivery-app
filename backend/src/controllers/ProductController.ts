import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export default {
    async createProduct(req: Request, res: Response) {
        try {
            const { name, description, price, imageUrl, categoryId } = req.body;

            const validCategory = await prisma.category.findUnique({
                where: { id: categoryId }
            });

            if(!validCategory){
                return res.json({
                    error: true,
                    message: 'Categoria inválida'
                });
            }

            const product = await prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    imageUrl,
                    categoryId
                }
            });

            return res.json({
                error: false,
                message: 'Produto cadastrado com sucesso',
                product
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getAllProducts(req: Request, res: Response) {
        try {

            const products = await prisma.product.findMany({
                include:{
                    category:{
                        select:{
                            name: true
                        }
                    }
                }
            });

            return res.json({
                products
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getProductById(req: Request, res: Response){
        try {
            
            const { id } = req.params;

            const product = await prisma.product.findUnique({
                where: {
                    id
                }
            });

            return res.json(product);

        } catch (error) {
            return res.json({ message: error.message });
        }
    }
};