const { response } = require('express'); // Para tener el autocompletado/ayuda
const { validationResult } = require('express-validator');

const crearUsuario = ( req, res = response ) => {

    const { name, email, password } = req.body;

    // Manejo de errores
    const errors = validationResult( req );
    
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name, 
        email, 
        password
    })
}

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body

    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        email, 
        password
    })
}

const revalidarToken = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'Token Validado'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
