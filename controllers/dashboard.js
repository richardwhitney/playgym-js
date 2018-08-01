'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const analytics = require('../utils/analytics');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const assessments = assessmentStore.getUserAssessments(loggedInUser.id);
    let bmi = 0;
    if (assessments.length > 0) {
      let latestAssessment = assessments[assessments.length - 1];
      bmi = analytics.calculateBMI(loggedInUser, latestAssessment);
    }
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessments,
      member: loggedInUser,
      bmi: bmi,
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
