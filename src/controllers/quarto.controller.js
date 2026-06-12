const prisma = require("../data/prisma");


const listar = async (req, res) => {
    try {
        const quartos = await prisma.quarto.findMany({
            include: {
                reservas: true
            }
        });

        res.status(200).json(quartos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar quartos" });
    }
};


const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const quarto = await prisma.quarto.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                reservas: true
            }
        });

        if (!quarto) {
            return res.status(404).json({ erro: "Quarto não encontrado" });
        }

        res.status(200).json(quarto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar quarto" });
    }
};


const criar = async (req, res) => {
    try {
        const { numero, tipo } = req.body;

        const quarto = await prisma.quarto.create({
            data: {
                numero,
                tipo
            }
        });

        res.status(201).json(quarto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar quarto" });
    }
};


const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.quarto.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao excluir quarto" });
    }
};

module.exports = {
    listar,
    buscar,
    criar,
    excluir
};