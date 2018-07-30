'use strict';



const assessmentStore = {
  
  assessmentCollection: require('./assessment-store.json').assessmentCollection,
  
  getAllAssessments() {
    return this.assessmentCollection;
  },
  
  getAssessment(id) {
    let foundAssessment = null;
    for (let assessment of this.assessmentCollection) {
      if (id===assessment.id) {
        foundAssessment = assessment;
      }
    }
    return foundAssessment;
  },
  
};




module.exports = assessmentStore;