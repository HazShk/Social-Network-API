//internal imports
const {
   getUsers,
   addUser,
   getUserByID,
   updateUser,
   deleteUser,
   addFriend,
} = require('../../controllers/user-controller');

//dependencies
const express = require('express');

const router = express.Router();

//Get and add user
router.route('/').get(getUsers).post(addUser);

//Get update and delete user by id
router.route('/:id').get(getUserByID).put(updateUser).delete(deleteUser);

// Add friend
router.post('/:userId/friends/:friendId', addFriend);

module.exports = router;
