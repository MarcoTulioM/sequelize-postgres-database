const express = require('express');
const routes = express.Router();

const userController = require('./controllers/UserController');
const addressController = require('./controllers/addressController');
const techsController = require('./controllers/techsController');
const reportController = require('./controllers/reportController');

require('./database/connection');

routes.get('/users', userController.index );
routes.post('/users', userController.store );

routes.get('/users/:user_id/addresses', addressController.index);
routes.post('/users/:user_id/addresses', addressController.store);

routes.get('/users/:user_id/techs', techsController.index);
routes.post('/users/:user_id/techs', techsController.store);
routes.delete('/users/:user_id/techs', techsController.delete);

routes.get('/report', reportController.show);

module.exports = routes;