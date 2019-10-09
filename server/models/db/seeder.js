import pool from '../../config/db.config';
import userHelper from '../../helpers/user_helper';

const role1 = `INSERT INTO roles(role_name, description) 
  VALUES('user', 'standard users of the application');`;
const role2 = `INSERT INTO roles(role_name, description) 
  VALUES('admin', 'admin users who can acknowledge emergencies');`;
const role3 = `INSERT INTO roles(role_name, description) 
  VALUES('super-admin', 'super admin users who can add other admins');`;

const etype1 = `INSERT INTO emergency_types(type_name, description) 
  VALUES('fire', 'emergencies related to fire');`;
const etype2 = `INSERT INTO emergency_types(type_name, description) 
  VALUES('accident', 'emergencies related to accidents');`;
const etype3 = `INSERT INTO emergency_types(type_name, description) 
  VALUES('sickness', 'emergencies related to sickness');`;

const queryString = `
${role1}
${role2}
${role3}
${etype1}
${etype2}
${etype3}
`;

(async () => {
  try {
    await pool.query(queryString);
  } 
  catch (error) {
    console.log(error);
  }
})();
