const assessmentStore = require('../models/assessment-store.js');
const accounts = require('../controllers/accounts.js');
const logger = require('../utils/logger');

module.exports = {
  numOfAssessments: function(member) {
    const assessments = assessmentStore.getUserAssessments(member.id);
    return assessments.length;
  },

  dateString: function (string) {
    if (string) {
      const date = new Date(string);
      return date.toLocaleString();
    }
  }
}