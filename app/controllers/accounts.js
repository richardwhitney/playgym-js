'use strict';

const userstore = require('../models/user-store');
const trainerStore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {
  
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },
  
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  logout(request, response) {
    response.cookie('playgym', '');
    response.redirect('/');
  },
  
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },
  
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('playgym', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    }
    else {
      const trainer = trainerStore.getTrainerByEmail(request.body.email);
      if (trainer && trainer.password === request.body.password) {
        response.cookie('playgym', trainer.email);
        logger.info(`logging in ${trainer.email}`);
        response.redirect('/trainerdashboard');
      }
      else {
        response.redirect('/login');
      }
    }
  },
  
  getCurrentUser(request) {
    const userEmail = request.cookies.playgym;
    return userstore.getUserByEmail(userEmail);
  },
  
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.playgym;
    return trainerStore.getTrainerByEmail(trainerEmail);
  },
  
};

module.exports = accounts;