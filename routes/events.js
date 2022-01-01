/* 
    Rutas de Usuarios / Events
    host + /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldValidator } = require("../middlewares/field-validator");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Aplica la validacion a todas las routes
router.use( validarJWT ); 

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        fieldValidator
    ],
    crearEvento 
);


// Actualizar evento
router.put('/:id', fieldValidator, actualizarEvento );

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;
