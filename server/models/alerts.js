import Model from '../models/index';
import pool from '../config/db.config';
class AlertsModel extends Model{
  constructor(){
    super();
  }
  async trigger(datas, userId){
    const { type, user_location } = datas;
    const queryString = {
      text: `INSERT INTO emergencies
            (user_id, type, user_location)
            VALUES($1, $2, $3) RETURNING*;`,
      values: [userId, +(type), user_location]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async findAllAssoc(){
    const queryString = {
      text: `SELECT e.id, e.type, e.user_location, e.status, e.user_id, et.type_name, u.first_name, u.last_name, u.email, u.address, u.phone, u.role, e.created_on FROM emergencies e LEFT JOIN users u ON e.user_id=u.id LEFT JOIN emergency_types et ON e.type=et.id ORDER BY e.status,e.id DESC;`,
      values: []
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  async alterStatus(status, alertId){
    const queryString = {
      text: `UPDATE emergencies SET status=$1 WHERE id=$2;`,
      values: [status, +(alertId)]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  
}

export default new AlertsModel();