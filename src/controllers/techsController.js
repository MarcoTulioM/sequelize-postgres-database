const Tech = require('../models/Tech');
const User = require('../models/User')
module.exports = {
    async index ( req, res ) {
        const { user_id } = req.params;

        const user = await User.findByPk( user_id, {
            include: {
                association: 'techs',
                attributes: ['name'],
                through: {
                    attributes: [] 
                } 
            }
        });

        return res.json(user.techs);
    },
    async store ( req, res ) {
        const { user_id } = req.params;
        const { name } = req.body;

        const userFound = await User.findByPk( user_id );

        if( !userFound ) {
            return res.status(400).json({ erro: 'user not found' });
        }

        const [ tech ] = await Tech.findOrCreate({ 
            where: { name } 
        });

        await userFound.addTech( tech );

        return res.json( tech );
    },

    async delete ( req, res ) {
        const { user_id } = req.params;
        const { name } = req.body;

        const userFound = await User.findByPk( user_id );

        if( !userFound ) {
            return res.status(400).json({ erro: 'user not found' });
        }

        const tech = await Tech.findOne({
            where: { name }
        });

        await userFound.removeTech( tech );

        return res.json();
    }
};