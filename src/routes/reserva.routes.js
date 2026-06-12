const router = require("express").Router();

const controller = require("../controllers/reserva.controller");

router.get("/", controller.listar);
router.get("/quarto/:quarto_id", controller.listarPorQuarto);
router.post("/cadastrar", controller.criar);
router.delete("/:id", controller.excluir);

module.exports = router;