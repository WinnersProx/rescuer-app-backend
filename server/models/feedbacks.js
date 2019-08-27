import Model from '../models/index';
import pool from '../config/db.config';
class FeedbacksModel extends Model{
  constructor(){
    super();
  }
  async newFeedback(user, message){
    const queryString = {
      text: `INSERT INTO feedbacks
            (user_id, message)
            VALUES($1, $2) RETURNING*;`,
      values: [+(user), message]
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async findAllAssoc(){
    const queryString = {
      text: `SELECT f.id, f.user_id, f.message, u.first_name, u.last_name, u.email, f.created_on FROM feedbacks f LEFT JOIN users u ON f.user_id=u.id;`,
      values: []
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  
}

export default new FeedbacksModel();