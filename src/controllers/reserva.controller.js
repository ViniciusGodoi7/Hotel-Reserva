const prisma = require("../data/prisma");

// Listar reservas
const listar = async (req, res) => {
    try {
        const reservas = await prisma.reserva.findMany({
            include: {
                quarto: true
            }
        });

        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar reservas" });
    }
};

// Listar reservas por quarto
const listarPorQuarto = async (req, res) => {
    try {
        const { quarto_id } = req.params;

        const reservas = await prisma.reserva.findMany({
            where: {
                quarto_id: Number(quarto_id)
            }
        });

        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar reservas do quarto" });
    }
};

// Criar reserva
const criar = async (req, res) => {
    try {
        const {
            hospede,
            data_entrada,
            data_saida,
            quarto_id
        } = req.body;

        const reserva = await prisma.reserva.create({
            data: {
                hospede,
                data_entrada: new Date(data_entrada),
                data_saida: new Date(data_saida),
                quarto_id: Number(quarto_id)
            }
        });

        res.status(201).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar reserva" });
    }
};

// Excluir reserva
const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.reserva.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao excluir reserva" });
    }
};

module.exports = {
    listar,
    listarPorQuarto,
    criar,
    excluir
};