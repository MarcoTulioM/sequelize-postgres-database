const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {
    async index ( req, res ) {
        const { user_id } = req.params;
        const user = await User.findByPk( user_id, {
            include: {
                association: 'addresses'
            }
        });
        
        return res.json( user.addresses );
    },

    async store ( req, res ) {
        const { user_id } = req.params;

        const found = await User.findByPk( user_id );

        if( !found ) {
            return res.status(400).json({ erro: 'user not found' });
        }
        
        const { zipcode, street, number } = req.body;

        const address = await Address.create({
            user_id,
            zipcode,
            street,
            number 
        });

        return res.status(200).json( address );

    }
};