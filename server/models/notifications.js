import Model from '../models/index';
import pool from '../config/db.config';
class NotificationsModel extends Model{
  constructor(){
    super();
  }
  async notify(user, message){
    const queryString = {
      text: `INSERT INTO notifications
            (user_id, message)
            VALUES($1, $2) RETURNING*;`,
      values: [+(user), message]
    };
    const { rows } = await pool.query(queryString);
    return  rows[0];
  }
  async userNotifications(userId){
    await this.setRead(userId)
    const queryString = {
      text: `SELECT *FROM notifications WHERE user_id=$1;`,
      values: [userId]
    };
    const { rows } = await pool.query(queryString);
    return  rows;
  }
  async setRead(userId){
    const queryString = {
      text: `UPDATE notifications SET status=$1 WHERE user_id=$2;`,
      values: [1, userId]
    };
    const { rows } = await pool.query(queryString);
    return  rows;
  }
  async countForUnreads(userId){
    const queryString = {
      text: `SELECT id FROM notifications WHERE user_id=$1 AND status=$2;`,
      values: [userId, 0]
    };
    const { rows } = await pool.query(queryString);
    return  rows.length;
  }
  
}

export default new NotificationsModel();
