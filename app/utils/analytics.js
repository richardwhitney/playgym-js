'use strict';

const assessmentStore = require('../models/assessment-store.js');
const conversion = require('./conversion.js');
const logger = require('./logger.js');

const analytics = {
  
  calculateBMI(member, weight) {
    return (weight / (member.height * member.height)).toFixed(2);
  },
  
  determineBMICategory(bmiValue) {
    if (bmiValue < 16) {
      return "SEVERELY UNDERWEIGHT";
    }
    else if (bmiValue >= 16 && bmiValue < 18.5) {
      return "UNDERWEIGHT";
    }
    else if (bmiValue >= 18.5 && bmiValue < 25) {
      return "NORMAL";
    }
    else if (bmiValue >= 25 && bmiValue < 30) {
      return "OVERWEIGHT";
    }
    else if (bmiValue >= 30 && bmiValue < 35) {
      return "MODERATELY OBESE";
    }
    else {
      return "SERVERELY OBESE";
    }
  },
  
  isIdealBodyWeight(member, weight) {
    const fiveFeet = 60.0;
    let idealBodyWeight;
    
    const inches = conversion.convertMetresToInches(member.height, 2);
    
    if (inches <= fiveFeet) {
      if (member.gender === "Male") {
        idealBodyWeight = 50;
      }
      else {
        idealBodyWeight = 45.5;
      }
    }
    else {
      if (member.gender === "Male") {
        idealBodyWeight = 50 + ((inches - fiveFeet) * 2.3);
      }
      else {
        idealBodyWeight = 45.5 + ((inches - fiveFeet) * 2.3);
      }
    }
    logger.info("Ideal weight: " + idealBodyWeight);
    return ((idealBodyWeight <= (weight + 2.0)) && (idealBodyWeight >= (weight - 2.0)));
  },
  
  generateMemberStats(member) {
    let weight = member.startWeight;
    const assessments = assessmentStore.getUserAssessments(member.id);
    if (assessments.length > 0) {
      const latestAssessment = assessments[assessments.length - 1];
      weight = latestAssessment.weight;
    }
    const bmi = this.calculateBMI(member, weight);
    const bmiCategory = this.determineBMICategory(bmi);
    const isIdealBodyWeight = this.isIdealBodyWeight(member, weight);
    const stats = {
      bmi: bmi,
      bmiCategory: bmiCategory,
      isIdealBodyWeight: isIdealBodyWeight,
    };
    return stats;
  }
  
};

module.exports = analytics;