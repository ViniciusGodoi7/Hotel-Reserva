const router = require("express").Router();

const controller = require("../controllers/quarto.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.delete("/:id", controller.excluir);

module.exports = router;