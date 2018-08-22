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
    /*let bmi = 0;
    if (assessments.length > 0) {
      const latestAssessment = assessments[assessments.length - 1];
      bmi = analytics.calculateBMI(loggedInUser, latestAssessment);
    }*/
    const memberStats = analytics.generateMemberStats(loggedInUser);
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessments,
      member: loggedInUser,
      memberStats: memberStats,
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
      date: new Date(),
    };
    if (newAssessment.weight === "") {
      newAssessment.weight = 0;
    }
    if (newAssessment.chest === "") {
      newAssessment.chest = 0;
    }
    if (newAssessment.thigh === "") {
      newAssessment.thigh = 0;
    }
    if (newAssessment.upperArm === "") {
      newAssessment.upperArm = 0;
    }
    if (newAssessment.waist === "") {
      newAssessment.waist = 0;
    }
    if (newAssessment.hips === "") {
      newAssessment.hips = 0;
    }
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },

  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
  },
  
};



module.exports = dashboard;
