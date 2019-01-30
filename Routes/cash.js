const express = require('express')
const api = express.Router()
const Flows = require('../Controllers/InOutFlowCtrl')

api.post('/in',Flows.addInflow)
api.get('/in',Flows.getIN)
api.get('/out',Flows.getOUT)
api.post('/out',Flows.addOutFlow)
module.exports =api