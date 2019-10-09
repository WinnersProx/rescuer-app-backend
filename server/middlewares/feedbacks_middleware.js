import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';

export default  {
  
  validateFeedback : (req, res, next) => {
    const { message } = req.body;
    const validate = Joi.string().required().validate(message);
    let {error} = validate;
    if(error){
    	error = error.details[0].message;
      return userHelper.respond(res, 400, "error", error);
    }
    next();
  }
  
}