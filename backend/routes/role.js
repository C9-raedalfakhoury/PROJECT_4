const express = require('express');
const roleRouter = express.Router();
  
const {createNewRole} = require('../controllers/role')

roleRouter.post("/roles",createNewRole)
module.exports = roleRouter;