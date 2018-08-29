'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');
const goalStore = require('../models/goal-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const analytics = require('../utils/analytics');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const memberStats = analytics.generateMemberStats(loggedInUser);
    const assessments = assessmentStore.getUserAssessments(loggedInUser.id);
    const goals = goalStore.getUserGoals(loggedInUser.id);
    logger.debug(assessments);
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessments,
      goals: goals,
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

  addGoal(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const targetDate = new Date(request.body.date);
    const newGoal = {
      id: uuid(),
      userid: loggedInUser.id,
      date: targetDate,
      weight: request.body.weight,
    }
    goalStore.addGoal(newGoal);
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
