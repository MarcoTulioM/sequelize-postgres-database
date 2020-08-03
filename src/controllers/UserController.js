const User = require('../models/User');

module.exports = {
    async index ( req, res ) {
        await User.findAll()
        .then( resp => res.json( resp ));
    },
    async store ( req, res ) {
        const { name, email } = req.body;

        const user = await User.create({
            name, 
            email: email
        });

        return res.json( user );
    }
};