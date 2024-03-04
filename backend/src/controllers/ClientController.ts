import { Request, Response } from 'express';
import { prisma } from '../database/prisma';

export default {
    async createClient(req: Request, res: Response) {
        try {
            const { name, phoneNumber } = req.body;

            const clientExists = await prisma.client.findUnique({
                where: {
                    phoneNumber
                }
            });

            if (clientExists) {
                return res.json({
                    error: true,
                    message: 'Erro: Cliente já está cadastrado',
                });
            }

            const client = await prisma.client.create({
                data: {
                    name,
                    phoneNumber
                }
            });

            return res.json({
                error: false,
                message: 'Cliente cadastrado com sucesso',
                client
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async updateClient(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, phoneNumber } = req.body;

            const client = await prisma.client.update({
                where: {
                    id
                },
                data: {
                    name,
                    phoneNumber
                }
            });

            return res.json({
                error: false,
                message: 'Cliente atualizado com sucesso',
                client
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getAllClients(req: Request, res: Response) {
        try {

            const clients = await prisma.client.findMany({
                include: {
                    addresses: {
                        select: {
                            id: true,
                            cep: true,
                            street: true,
                            neighborhood: true,
                            number: true,
                            complement: true,
                            city: true,
                            state: true
                        }
                    }
                }
            });

            return res.json({
                clients
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },

    async getClientByPhoneNumber(req: Request, res: Response) {
        try {

            const { phoneNumber } = req.params;

            const client = await prisma.client.findUnique({
                where: {
                    phoneNumber
                },
                include: {
                    addresses: {
                        select: {
                            id: true,
                            cep: true,
                            street: true,
                            neighborhood: true,
                            number: true,
                            complement: true,
                            city: true,
                            state: true
                        }
                    }
                }
            });

            return res.json({
                client
            });
        } catch (error) {
            return res.json({ message: error.message });
        }
    },
};