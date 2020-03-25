const express =  require('express');

const OngController = require('./controllers/OngController');
const IncidenceController = require('./controllers/IncidenceController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);
 

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidence', IncidenceController.index);
routes.post('/incidence', IncidenceController.create);
routes.delete('/incidence/:id', IncidenceController.delete);

module.exports = routes; 