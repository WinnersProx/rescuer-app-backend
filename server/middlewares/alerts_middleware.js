import passport from 'passport';
import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';
import Alert from '../models/alerts';

const alertSchema = Joi.object().keys({
  id : Joi.number().integer(),
  user : Joi.number().integer(),
  type : Joi.number().integer().required(),
  user_location : Joi.string().required(),
  status : Joi.number().integer(),
  created_on : Joi.date()
});

export default  {
  validateAlert : (req, res, next) =>{
    const validate = alertSchema.validate(req.body);
    let {error} = validate;

    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error",error);
    }
    next();
  },
  isValid : async (req, res, next) => {
    const { alert_id } = req.params;
    const validate = Joi.number().integer().required().validate(alert_id);  
    let {error} = validate;
    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error",error);
    }
    else{
      const alert = await Alert.findbyField('id', 'emergencies', +(alert_id));
      if(!alert){
        return userHelper.respond(res, 404, "error","Invalid emergency alert");
      }
    }
    next();
  }
  
}
