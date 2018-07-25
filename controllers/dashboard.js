'use strict';

const logger = require('../utils/logger');
const assessmentCollection = require('../models/assessment.store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Play Gym Dashboard',
      assessments: assessment
    };
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
