'use strict';

const assessmentStore = {
  
  assessmentCollection: require('./assessment-store.json').assessmentCollection,
  
  getAllAssessments() {
    return this.assessmentCollection;
  },
  
  getAssessment(id) {
    let foundAssessment = null;
    for (let asse




module.exports = assessmentCollection;