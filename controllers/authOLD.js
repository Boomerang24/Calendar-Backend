const { response } = require('express'); // Para tener el autocompletado/ayuda

const crearUsuario = ( req, res = response ) => {

    const { name, email, password } = req.body;

    if ( name.length < 5 ) {
        return res.status(400).json({ // res.status(<number>), es para asignar un resp code explicito
            ok: false,
            msg: 'El nombre debe de ser de 5 letras'
        });
    }

    res.json({
        ok: true,
        msg: "registro",
        name, 
        email, 
        password
    })
}

const loginUsuario = ( req, res = response ) => {

    const { email, password } = req.body

    res.json({
        ok: true,
        msg: "login",
        email, 
        password
    })
}

const revalidarToken = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: "Token Validado"
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
