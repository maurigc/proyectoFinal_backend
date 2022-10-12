const admin = false;

const autenticacion = (req, res, next) => {
    admin ? next() : res.status(400).json({msjError: `Ruta "/productos${req.path}", método "${req.method}" no autorizada.`});
}

module.exports = autenticacion;