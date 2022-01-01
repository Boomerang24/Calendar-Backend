const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find()     
                                .populate('user','name');

    return res.status(200).json({
        ok: true,
        msg: 'Aqui estan tus eventos',
        eventos
    });
}

const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        return res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
}

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese ID'
            });
        }

        if ( evento.user.toString() !== uid ){
            
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        // Se desestructura el evento del "req" y adicionalmente se agrega el userID
        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        // Se busca el id del evento y se actualiza por la informacion del "nuevoEvento"
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); // new: true es para que regrese los datos actualizados

        return res.json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese ID'
            });
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de borrar este evento'
            });
        }

        const eventoActual = await Evento.findByIdAndDelete( eventoId, { new: true });

        return res.status(200).json({
            ok: true,
            eventoEliminado: eventoActual.title
        })
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
