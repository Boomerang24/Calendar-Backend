const { response } = require('express'); // Para tener el autocompletado/ayuda
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    // Cuando se trabaja con DBs, lo recomendable es usar try/catch
    try {

        let usuario = await Usuario.findOne({ email });  // Usuario.findOne({ email: email })

        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya ha sido utilizado por otro usuario'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync(); // 10 by default
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();
        
        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token       // token: token
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // General nuestro JWT (JsonWebToken)
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const revalidarToken = async( req, res = response ) => {

    const { uid, name } = req;

    // Generar un nuevo JWT y retornarlo en la peticion
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
