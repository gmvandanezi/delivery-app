import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export default {
    async createAddress(req: Request, res: Response) {
        try {
            const { cep, street, number, complement, neighborhood, city, state, clientId } = req.body;

            const address = await prisma.address.create({
                data: {
                    cep,
                    street,
                    number,
                    complement,
                    neighborhood,
                    city,
                    state,
                    clientId
                }
            });

            return res.json({
                error: false,
                message: 'Endereço cadastrado com sucesso',
                address
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async updateAddress(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const { cep, street, number, complement, neighborhood, city, state } = req.body;

            const address = await prisma.address.update({
                where: {
                    id
                },
                data: {
                    cep,
                    street,
                    number,
                    complement,
                    neighborhood,
                    city,
                    state
                }
            });

            return res.json({
                error: false,
                message: 'Endereço atualizado com sucesso',
                address
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async deleteAddress(req: Request, res: Response) {
        try {

            const { id } = req.params;

            await prisma.address.delete({
                where: {
                    id
                }
            });

            return res.json({
                error: false,
                message: 'Endereço excluido com sucesso'
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getAllAddresses(req: Request, res: Response) {
        try {

            const adresses = await prisma.address.findMany({
                include: {
                    client: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            return res.json({
                adresses
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getAddressById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const address = await prisma.address.findUnique({
                where: {
                    id
                },
                include: {
                    client: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            return res.json({
                address
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },
};