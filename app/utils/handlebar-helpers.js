const assessmentStore = require('../models/assessment-store.js');
const accounts = require('../controllers/accounts.js');

module.exports = {
  numOfAssessments: function(member) {
    const assessments = assessmentStore.getUserAssessments(member.id);
    return assessments.length;
  }
}