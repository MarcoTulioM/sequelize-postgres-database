const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show ( req, res ) {

        const usersFound = await User.findAll({
            attributes: [ 'name', 'email' ],

            where: {
                email: {
                    [ Op.iLike ]: '%@email.com.r' 
                }
            },

            include: [
                {
                    association: 'addresses',   // INNER JOIN
                    where: { street: 'Rua Exemplo' }
                },

                {
                    association: 'techs',
                    required: false,            // LEFT OUTER JOIN
                    where: { 
                        name: { 
                            [ Op.iLike ]: 'react%' 
                        } 
                    }
                }
            ]
        });

        return res.json( usersFound );
    }
};
