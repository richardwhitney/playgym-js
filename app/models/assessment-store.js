'use strict';

const _ = require('lodash');
const logger = require('../utils/logger');
const JsonStore = require('./json-store');

const assessmentStore = {
  
  store: new JsonStore('./models/assessment-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',
  
  getAllAssessments() {
    return this.store.findAll(this.collection);
  },
  
  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id});
  },
  
  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },
  
  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
  
  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  getUserAssessments(userid) {
    const userAssessments = this.store.findAll(this.collection, {userid: userid});
    userAssessments.sort(function compare(a, b) {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });
    return userAssessments;
    //return this.store.findAll(this.collection, { userid: userid});
  },
  
};

module.exports = assessmentStore;