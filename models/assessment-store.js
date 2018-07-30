'use strict';

const _ = require('lodash');

const assessmentStore = {
  
  assessmentCollection: require('./assessment-store.json').assessmentCollection,
  
  getAllAssessments() {
    return this.assessmentCollection;
  },
  
  getAssessment(id) {
    return _.find(this.assessmentCollection, {id:id});
  },
  
  addAssessment(assessment) {
    this.assessmentCollection.push(assessment);
  },
  
};




module.exports = assessmentStore;