const { Router } = require('express');

const validators = require('./validators');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', validators.validateOngsCreate, OngController.create);

routes.get('/incidents', validators.validateIncidentsIndex, IncidentController.index);
routes.post('/incidents', validators.validateIncidentsCreate, IncidentController.create);
routes.delete('/incidents/:id', validators.validateIncidentsDelete, IncidentController.delete);

routes.get('/profile', validators.validateProfileIndex, ProfileController.index);

routes.post('/sessions', validators.validateSessionsCreate, SessionController.create);

module.exports = routes;
