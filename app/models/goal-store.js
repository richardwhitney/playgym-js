'use strict';

const _ = require('lodash');
const logger = require('../utils/logger');
const JsonStore = require('./json-store');

const goalStore = {

  store: new JsonStore('./models/goal-store.json', {goalCollection: []}),
  collection: 'goalCollection',

  getAllGoals() {
    return this.store.findAll(this.collection);
  },

  getGoal(id) {
    return this.store.findOneBy(this.collection, {id: id});
  },

  addGoal(goal) {
    this.store.add(this.collection, goal);
    this.store.save();
  },

  removeGoal(id) {
    const goal = this.getGoal(id);
    this.store.remove(this.collection, goal);
    this.store.save();
  },

  removeAllGoals() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  getUserGoals(userid) {
    const userGoals = this.store.findBy(this.collection, {userid: userid});
    return userGoals;
  }
};

module.exports = goalStore;