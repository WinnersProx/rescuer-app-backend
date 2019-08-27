import User from '../models/user';
import userHelper from '../helpers/user_helper';

const authController = {
  signup : async (req, res) => {
    // for hashing the password
    req.body.password = userHelper.hashPassword(req.body.password);
    let user = await User.createUser(req.body, 'users');
    const { email, first_name, last_name, address, phone, role } = user;
    const token = userHelper.authenticateUser({email});
    userHelper.respond(res, 201, "success", "account created successfully", {
      email,
      first_name,
      last_name,
      address,
      phone,
      role,
      token
    });
  },
  signin : (req,res) => {
    const { email, first_name, last_name, address, phone, role } = req.user;
    const token = userHelper.authenticateUser({email});
    userHelper.respond(res, 200, "success", "signed in successfully", {
      email,
      first_name,
      last_name,
      address,
      phone,
      role,
      token
    });
  },
  alterRole : async (req, res) => {
    const { user_id } = req.params;
    const { role } = req.body;
    const newRole = await User.setUserRole(+(role), +(user_id));
    userHelper.respond(res, 200, "success", "user role altered successfully");
  },
  viewUserProfile : async (req, res) => {
    const { user_id } = req.params;
    const user = await User.findbyField("id", "users", +(user_id));
    const { email, first_name, last_name, phone, address, role } = user;
    userHelper.respond(res, 200, "success", undefined, {
      email,
      first_name,
      last_name,
      phone,
      address,
      role
    });
  },
  updateProfile : async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    const user = await User.updateUser(req.body, +(id));
    const { email, first_name, last_name, phone, address, role } = user;
    const token = userHelper.authenticateUser({email});
    userHelper.respond(res, 200, "success", "Profile updated successfully", {
      email,
      first_name,
      last_name,
      phone,
      address,
      role,
      token
    });
  },
  viewUsers : async (req, res) => {
    let users = await User.findAll("users");
    users = users.map(user => {
      user.password = undefined;
      return user;
    });
    userHelper.respond(res, 200, "success", undefined, users);
  }

}

export default authController
