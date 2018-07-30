'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessmentStore.getAllAssessments(),
    };
    response.render('dashboard', viewData);
  },
};

addAssessment(request, response) {
  const newAssessment = {
    weight: request.body.weight,
    chest: request.body.chest,
    thigh: request.body.thigh,
    upperArm: request.body.upperArm,
    waist: request.body.waist,
    hips: request.body.hips,
  };
  assessmentStore.addAssessment(newAssessment);
  response.redirect('/dashboard');

module.exports = dashboard;
