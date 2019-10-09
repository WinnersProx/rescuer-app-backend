import Alert from '../models/alerts';
import Notifications from '../models/notifications';
import userHelper from '../helpers/user_helper';

const alertsController = {
  triggerAlert : async (req, res) => {
    const { id } = req.user;
    const alert = await Alert.trigger(req.body, id);
    userHelper.respond(res, 201, "success", "your emergency alert has been triggered we're coming to you!");
  },
  viewAlerts : async (req, res) => {
    const alerts = await Alert.findAllAssoc();
    userHelper.respond(res, 200, "success", undefined, alerts);
  },
  acknowledge : async (req, res) => {
    const { alert_id } = req.params;
    const { user_id } = await Alert.findbyField('id', 'emergencies', +(alert_id));
    const acknowledgeAlert = await Alert.alterStatus(1, alert_id);
    await Notifications.notify(user_id, "Your emergency alert has been acknowledged, hold on as you're about to be rescued!")
    userHelper.respond(res, 200, "success", "The emergency alert has been acknowledged");
  },
  disapprove : async (req, res) => {
    const { alert_id } = req.params;
    const { user_id } = await Alert.findbyField('id', 'emergencies', +(alert_id));
    const disapproveAlert = await Alert.alterStatus(2, alert_id);
    await Notifications.notify(user_id, "Your emergency alert has been disapproved due to some restrictions, we'll get back to you!")
    userHelper.respond(res, 200, "success", "The emergency alert has been disapproved");
  }

}

export default alertsController;
