'use strict'

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const userstore = require('../models/user-store');

const settings = {
  index(request, response) {
    logger.info('settings redering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Play Gym Settings',
      member: loggedInUser,
    };
    response.render('settings', viewData);
  },
  
  editMember(request, response) {
    const member = accounts.getCurrentUser(request);
    member.firstName = request.body.firstName;
    member.lastName = request.body.lastName;
    member.email = request.body.email;
    member.gender = request.body.gender;
    member.password = request.body.password;
    member.address = request.body.address;
    member.height = Number(request.body.height);
    member.startWeight = Number(request.body.startWeight);
    logger.info(`Updating user settings for ${member.firstName}`);
    userstore.store.save();
    response.redirect('/dashboard');
  },
};

module.exports = settings;