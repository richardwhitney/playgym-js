'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');
const goalStore = require('../models/goal-store.js');
const accounts = require('./accounts.js');
const userStore = require('../models/user-store.js');
const analytics = require('../utils/analytics');
const uuid = require('uuid');

const trainerDashboard = {
  
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
      title: 'Play Gym Trainer Dashboard',
      trainer: loggedInTrainer,
      members: userStore.getAllUsers(),
    };
    response.render('trainerdashboard', viewData);
  },
  
  deleteMember(request, response) {
    const member = userStore.getUserById(request.params.id);
    logger.debug(`Deleting User ${member.id}`);
    userStore.removeUser(member.id);
    response.redirect('/trainerdashboard');
  },
  
  trainerAssessment(request, response) {
    const member = userStore.getUserById(request.params.id);
    const assessments = assessmentStore.getUserAssessments(member.id);
    const goals = goalStore.getUserGoals(member.id);
    const memberStats = analytics.generateMemberStats(member);
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessments,
      goals: goals,
      member: member,
      memberStats: memberStats,
    };
    response.render('trainerassessment', viewData);
  },
  
  editComment(request, response) {
    const assessmentId = request.params.id;
    const assessment = assessmentStore.getAssessment(assessmentId);
    assessment.comment = request.body.comment;
    response.redirect('/trainerdashboard');
  },

  addGoal(request, response) {
    const member = userStore.getUserById(request.params.id);
    const targetDate = new Date(request.body.date);
    const newGoal = {
      id: uuid(),
      userid: member.id,
      date: targetDate,
      weight: request.body.weight,
    }
    goalStore.addGoal(newGoal);
    response.redirect('/trainerdashboard');
  },
  
};

module.exports = trainerDashboard;