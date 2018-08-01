'use strict';

const analytics = {
  
  calculateBMI(member, assessment) {
    return (assessment.weight / (member.height * member.height)).toFixed(2);
  }
  
};

module.exports = analytics;