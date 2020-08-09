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
const imageControlProd = require("../middlewares/imgControlProd");

/* PRODUCTS */
// Buscar
router.get("/search", productsController.search);

// Listado productos
router.get("/list/:id?", productsController.list);
// Agregar productos
router.get("/create", adminUser, productsController.productAdd);

router.post(
    "/create",
    uploadProducts.any(),
    imageControlProd,
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
                //console.log(req.files);
                // console.log(value);
                let boleanValue = 0;
                for (let i = 0; i < req.files.length; i++) {
                    if (
                        req.files[i].mimetype == "image/jpg" ||
                        req.files[i].mimetype == "image/jpeg" ||
                        req.files[i].mimetype == "image/png" ||
                        req.files[i].mimetype == "image/gif"
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
    imageControlProd,
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
                        req.files[i].mimetype == "image/jpg" ||
                        req.files[i].mimetype == "image/jpeg" ||
                        req.files[i].mimetype == "image/png" ||
                        req.files[i].mimetype == "image/gif"
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
