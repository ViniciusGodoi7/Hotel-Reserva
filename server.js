require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const quartoRoutes = require("./src/routes/quarto.routes");
const reservaRoutes = require("./src/routes/reserva.routes");

app.use("/quartos", quartoRoutes);
app.use("/reservas", reservaRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API Hotel Reservas funcionando!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});