const { response } = require('express'); // Para tener el autocompletado/ayuda
const Usuario = require('../models/Usuario');

const crearUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    // Cuando se trabaja con DBs, lo recomendable es usar try/catch
    try {

        let usuario = await Usuario.findOne({ email })  // Usuario.findOne({ email: email })

        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya ha sido utilizado por otro usuario'
            });
        }

        usuario = new Usuario( req.body );

        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body

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
