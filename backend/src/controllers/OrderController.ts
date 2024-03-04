import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export default {
    async createOrder(req: Request, res: Response) {
        try {
            const { totalValue, addressId, clientId, payment, products } = req.body;

            const transformDataForCreateMany = (products) => {
                return products.map((product) => ({
                    productId: product.productId,
                    amount: product.amount
                }));
            };

            const transformedData = transformDataForCreateMany(products);

            const order = await prisma.order.create({
                data: {
                    totalValue,
                    addressId,
                    clientId,
                    payment,
                    products: {
                        createMany: {
                            data: transformedData
                        }
                    }
                }
            });

            return res.json({
                error: false,
                message: 'Pedido cadastrado com sucesso',
                order
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getAllOrders(req: Request, res: Response) {
        try {

            const orders = await prisma.order.findMany({
                include: {
                    products: {
                        select: {
                            product: {
                                select: {
                                    name: true
                                }
                            },
                            amount: true,
                        }
                    }
                }
            });

            return res.json({
                orders
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    }
};