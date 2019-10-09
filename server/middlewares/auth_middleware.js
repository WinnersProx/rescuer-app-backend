import passport from 'passport';
import Joi from '@hapi/joi';
import userHelper from '../helpers/user_helper';
import User from '../models/user';

const userSchema = Joi.object().keys({
  id : Joi.number().integer(),
  email : Joi.string().email({minDomainSegments : 2}).required(),
  first_name : Joi.string().min(6).max(20).required(),
  last_name  : Joi.string().min(6).max(20).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,24}$/).required(),
  role: Joi.number().integer(),
  address : Joi.string().min(4).max(20).required(),
  phone : Joi.string().min(10).max(20).required(),
  created_on : Joi.date()
});

export default  {
  validateUser : (req, res, next) =>{
    const validateMe = userSchema.validate(req.body);
    let { error } = validateMe;
    if(error){
      error = error.details[0].message
      return userHelper.respond(res, 400, "error", error);
    }
    next();
  },
  validateSignin : async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
      return userHelper.respond(res, 400, "error", 'All fields are required "(email and password)"');
    }
    else{
      let user = await User.findbyField('email', 'users', email);
      if(!user){
        return userHelper.respond(res, 404, "error", "user not found");
      }
      else{
        if(!userHelper.comparePasswords(password, user.password)){
          return userHelper.respond(res, 400, "error","your password is invalid");
        }
        req.user = user;
      }
    }
    next();
  },
  checkUserToken: async (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      // user informations can be accessed on req object as req.user
      req.user = user;
      if (err) {
        return userHelper.respond(res, 520, "error", err.message);
      }
      // check whether the token is in headers
      if (!user) {
        return userHelper.respond(res, 401, "error", 'No provided token or invalid one provided');
      }
      next();
    })(req, res, next);
  },
  exists : async (req, res, next) => {
    const { email } = req.body;
    const user = await User.userExists(email);
    if(user){
      return userHelper.respond(res, 400, "error",  "Email already taken");
    }
    next();
  },
  isAdmin : (req,res,next) => {
    const { role } = req.user;
    if(role !== 2){
      return userHelper.respond(res, 403, "error", "Only admins can perform this action");
    }
    next();
  },
  isSuperAdmin : (req, res, next) => {
    const { role } = req.user;
    if(role !== 3){
      return userHelper.respond(res, 403, "error", "Only Super admins can perform this action");
    }
    next();
  },
  isAdminOrSuper : (req, res, next) => {
    const { role } = req.user;
    if(role === 1){
      return userHelper.respond(res, 403, "error","Access forbidden(Only admins)");
    }
    next();
  },
  validateRole : (req, res, next) => {
    const { role } = req.body;
    const { user_id } = req.params;
    const roleSchema =  Joi.object().keys({
      user_id : Joi.number().integer().required(), 
      role    : Joi.number().integer().required()
    });
    const validate = roleSchema.validate({ user_id, role});
    let { error } = validate;
    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error", "", error);
    }
    next();
  },
  ValidateUserId : async (req, res, next) => {
    const { user_id } = req.params;
    const validate = Joi.number().integer().required().validate(user_id);
    let {error} = validate;
    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error", error);
    }
    else{
      const user = await User.findbyField("id", "users", +(user_id));
      if(!user){
        return userHelper.respond(res, 404, "error","user does not exist");
      }
    }
    next();
  },
  validateProfileUpdate : (req, res, next) => {
    const profileSchema = Joi.object().keys({
      id : Joi.number().integer(),
      email : Joi.string().email({minDomainSegments : 2}).required(),
      first_name : Joi.string().min(6).max(20).required(),
      last_name  : Joi.string().min(6).max(20).required(),
      role: Joi.number().integer(),
      address : Joi.string().min(4).max(20).required(),
      phone : Joi.string().min(10).max(20).required(),
      created_on : Joi.date() 
    });
    const validate = profileSchema.validate(req.body);
    let {error} = validate;
    if(error){
      error = error.details[0].message;
      return userHelper.respond(res, 400, "error", error);
    }
    next();
  }
}
