// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { check, validationResult, body } = require("express-validator");

//Multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/imgInstrumentos"));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var uploadProducts = multer({ storage: storage });

// ************ Controller Require ************
const productsController = require("../controllers/productsController");

// ************ Middlewares Require ************
const adminUser = require("../middlewares/adminUser");
const imageControlProducts = require("../middlewares/imgControlProducts");

/* PRODUCTS */
// Listado productos
router.get("/", productsController.list);
// Agregar productos
router.get("/create", adminUser, productsController.productAdd);

router.post(
    "/create",
    uploadProducts.any(),
    imageControlProducts,
    [
        check("name")
            .isLength({ min: 5 })
            .withMessage(
                "En nombre del producto debe tener mas de 5 caracteres y es obligatorio!"
            ),
        check("description")
            .isLength({ min: 20 })
            .withMessage(
                "La descripcion  del producto debe tener mas de 20 caracteres y es obligatoria!"
            ),

        body("files")
            .custom(function (value, { req }) {
                let boleanValue = 0;
                for (let i = 0; i < req.files.length; i++) {
                    if (
                        value[i].mimetype == "image/jpg" ||
                        value[i].mimetype == "image/jpeg" ||
                        value[i].mimetype == "image/png" ||
                        value[i].mimetype == "image/gif"
                    ) {
                        boleanValue = boleanValue + 1; //return true;
                    }
                }
                if (boleanValue == req.files.length) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Tipo de imagen invalida!"),
    ],
    productsController.add
);
// Detalle producto
router.get("/:id", productsController.detalle);
// Eliminar producto
router.delete("/delete/:id", productsController.delete);
// Editar productos
router.get("/:id/edit", productsController.editView);
router.put(
    "/:id/edit",
    uploadProducts.any(),
    imageControlProducts,
    [
        check("name")
            .isLength({ min: 5 })
            .withMessage(
                "En nombre del producto debe tener mas de 5 caracteres y es obligatorio!"
            ),
        check("description")
            .isLength({ min: 20 })
            .withMessage(
                "La descripcion  del producto debe tener mas de 20 caracteres y es obligatoria!"
            ),

        body("files")
            .custom(function (value, { req }) {
                let boleanValue = 0;
                for (let i = 0; i < req.files.length; i++) {
                    if (
                        value[i].mimetype == "image/jpg" ||
                        value[i].mimetype == "image/jpeg" ||
                        value[i].mimetype == "image/png" ||
                        value[i].mimetype == "image/gif"
                    ) {
                        boleanValue = boleanValue + 1; //return true;
                    }
                }
                if (boleanValue == req.files.length) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Tipo de imagen invalida!"),
    ],
    productsController.edit
);

module.exports = router;
