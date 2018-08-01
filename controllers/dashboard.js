'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessmentStore.getUserAssessments(loggedInUser.id),
      member: loggedInUser,
    };
    response.render('dashboard', viewData);
  },
  
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },
  
};



module.exports = dashboard;
