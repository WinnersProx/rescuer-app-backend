import Notifications from '../models/notifications';
import userHelper from '../helpers/user_helper';

const notificationsController = {
  viewNotifications : async (req, res) => {
    const { id } = req.user;
    const notifications = await Notifications.userNotifications(id);
    userHelper.respond(res, 200, "success", undefined, notifications);
  },
  countNotifications : async (req, res) => {
  	const { id } = req.user;
  	const number = await Notifications.countForUnreads(id);
  	userHelper.respond(res, 200, "success", undefined, number);
  }

}

export default notificationsController;