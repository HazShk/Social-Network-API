const {
   getThoughts,
   getThoughtByID,
   addThought,
   updateThought,
   deleteThought,
   addReaction,
   deleteReaction,
} = require('../../controllers/thought-controller');

//dependencies
const express = require('express');

//initialise the router
const router = express.Router();

//Get and add thoughts
router.get('/', getThoughts);
router.post('/', addThought);

//Get, update, delete routes with id
router.route('/:id').get(getThoughtByID).put(updateThought).delete(deleteThought);

//Add and delete reactions route
router.post('/:id/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

//export the router
module.exports = router;
