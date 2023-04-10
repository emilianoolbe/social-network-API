const guest = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        return res.status.json({
            status: 'Error',
            message: 'Usuario ya logueado'
        });
    }
    next();
};

module.exports = guest;