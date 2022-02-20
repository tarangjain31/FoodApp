const express = require('express');
const { route } = require('./userRouter2');
const planRouter = express.Router();
const {protectRoute, isAuthorized} = require('../Controller/authController');
const {createPlan,updatePlan,deletePlan,getAllPlans,getPlan,top3Plans} = require('../Controller/planController');
planRouter
.route('/allPlans')
.get(getAllPlans)

planRouter
.route('/top3')
.get(top3Plans)

//own plan
planRouter.use(protectRoute)
//logged in necessary to access getPlan
planRouter
.route('/:id')
.get(getPlan)

planRouter.use(isAuthorized(['admin','restaurantOwner']))
planRouter
.route('/crudPlan')
.post(createPlan)
.delete(deletePlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)



module.exports = planRouter;



