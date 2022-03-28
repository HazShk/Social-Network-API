const Thought = require('../models/Thought');
const User = require('../models/User');

exports.getUsers = async (req, res) => {
   try {
      const users = await User.find({});
      res.json({ status: 'success', message: 'Users fetched successfully.', users });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.getUserByID = async ({ params }, res) => {
   try {
      const user = await User.findOne({ _id: params.id });
      if (!user) return res.status(404).json({ status: 'fail', message: 'No user found with this ID' });
      res.json({ status: 'success', message: 'User fetched successfully.', user });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.addUser = async ({ body }, res) => {
   try {
      const newUser = await User.create(body);
      res.json({ status: 'success', message: 'User added successfully.', user: newUser });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.updateUser = async ({ params, body }, res) => {
   try {
      const user = await User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
      if (!user) return res.status(404).json({ status: 'fail', message: 'No user found with this ID' });
      res.json({ status: 'success', message: 'User updated successfully.', user });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.deleteUser = async ({ params }, res) => {
   try {
      //delete the user
      const user = await User.findOneAndDelete({ _id: params.id });
      if (!user) return res.status(404).json({ status: 'fail', message: 'No user found with this ID' });

      //delete all the associated thoughts of this user
      await Thought.deleteMany({ username: user.username });

      //send success response
      res.json({ status: 'success', message: 'User deleted successfully.' });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.addFriend = async ({ params }, res) => {
   try {
      const user = await User.findOneAndUpdate(
         { _id: params.userId },
         { $push: { friends: params.friendId } },
         { runValidators: true, new: true }
      );
      if (!user) return res.status(404).json({ status: 'fail', message: 'No user found with this ID' });
      res.json({ status: 'success', message: 'Friend added successfully.', user });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};
