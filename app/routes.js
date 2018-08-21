'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const trainerdashboard = require('./controllers/trainer-dashboard.js');
const about = require('./controllers/about.js');
const accounts = require('./controllers/accounts.js');
const settings = require('./controllers/settings.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/settings', settings.index);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.post('/dashboard/addassessment', dashboard.addAssessment);
router.post('/settings/editmember', settings.editMember);

router.get('/trainerdashboard', trainerdashboard.index);
router.get('/trainerassessment/:id', trainerdashboard.trainerAssessment);
router.post('/editcomment/:id', trainerdashboard.editComment);

module.exports = router;
