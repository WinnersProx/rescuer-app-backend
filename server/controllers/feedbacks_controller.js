import Feedbacks from '../models/feedbacks';
import userHelper from '../helpers/user_helper';

const feedbacksController = {
  newFeedback : async (req, res) => {
    const { id } = req.user;
    const { message } = req.body;
    const feedback = await Feedbacks.newFeedback(id, message);
    userHelper.respond(res, 201, "success", "feedback created successfully", feedback);
  },
  viewFeedbacks : async (req, res) => {
  	const feedbacks = await Feedbacks.findAllAssoc();
  	userHelper.respond(res, 200, "success", undefined, feedbacks);
  }

}

export default feedbacksController;
