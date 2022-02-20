const express = require('express')
const reviewRouter = express.Router();
const {protectRoute} = require('../Controller/authController');
const {getAllReviews,getPlanReviews,updateReview,deleteReview,createReview,top3} = require('../Controller/reviewController')
reviewRouter
.route('/allreviews')
.get(getAllReviews)

reviewRouter
.route('/top3reviews')
.get(top3)

reviewRouter
.route('/:id')
.get(getPlanReviews)

reviewRouter.use(protectRoute)
reviewRouter
.route('/create')
.post(createReview)

reviewRouter
.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports = reviewRouter;


