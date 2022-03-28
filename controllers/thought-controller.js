const User = require('../models/User');
const Thought = require('../models/Thought');

exports.getThoughts = async (req, res) => {
   try {
      const thoughts = await Thought.find({});
      res.json({ status: 'success', message: 'All thoughts fetched successfully', thoughts });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.getThoughtByID = async ({ params }, res) => {
   try {
      const thought = await Thought.findById(params.id);
      if (!thought) return res.status(404).json({ status: 'fail', message: 'No thought found with this id.' });
      res.json({ status: 'success', message: 'Thought fetched successfully', thought });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.addThought = async ({ body }, res) => {
   try {
      //destruct the id from created thought
      const { _id } = await Thought.create({ thoughtText: body.thoughtText, username: body.username });

      //update the user
      const user = await User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });

      if (!user) return res.json({ status: 'fail', message: 'Wrong thought data' });

      res.json({ status: 'sucess', message: 'Thought added successfully to the user', user });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.updateThought = async ({ params, body }, res) => {
   try {
      const thought = await Thought.findByIdAndUpdate(params.id, body, {
         runValidators: true,
         new: true,
      });
      if (!thought) return res.status(404).json({ status: 'fail', message: 'No thought found with this id.' });
      res.json({ status: 'success', message: 'Thought updated successfully', thought });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.deleteThought = async ({ params }, res) => {
   try {
      const thought = await Thought.findByIdAndDelete(params.id);
      if (!thought) return res.status(404).json({ status: 'fail', message: 'No thought found with this id.' });
      res.json({ status: 'success', message: 'Thought deleted successfully.' });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.addReaction = async ({ params, body }, res) => {
   try {
      const thought = await Thought.findByIdAndUpdate(
         params.id,
         { $push: { reactions: body } },
         { new: true, runValidators: true }
      );
      if (!thought) return res.status(400).json({ status: 'fail', message: 'Invalid reaction data.' });
      res.json({ status: 'success', message: 'Reaction added successfully to the thought.', thought });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};

exports.deleteReaction = async ({ params }, res) => {
   try {
      const thought = await Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: { reactionId: params.reactionId } } },
         { new: true, runValidators: true }
      );
      if (!thought) return res.status(404).json({ status: 'fail', message: 'No reaction or thought found.' });
      res.json({ status: 'success', message: 'Reaction deleted deleted successfully.' });
   } catch (error) {
      console.log(error);
      res.json(error);
   }
};
