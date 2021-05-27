const router = require("express").Router();
const companyController = require("../contollers/companyController");

router.get("/v1/company", companyController.getAll);
router.get("/v1/company/:id", companyController.get);
router.post("/v1/company", companyController.insert);
router.put("/v1/company/:id", companyController.update);
router.delete("/v1/company/:id", companyController.delete);

module.exports = router;
