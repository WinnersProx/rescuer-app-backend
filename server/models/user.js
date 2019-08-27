import Model from '../models/index';
import comparePassword from '../helpers/user_helper';
import pool from '../config/db.config';
class UserModel extends Model{
  constructor(){
    super();
  }
  async createUser(datas, model){
    const { email, first_name, last_name, password, address, phone } = datas;
    const queryString = {
      text: `INSERT INTO users
            (email, first_name, last_name, password, address, phone)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING*;`,
      values: [email, first_name, last_name, password, address, phone]
    };
    const { rows } = await pool.query(queryString);
    const firstUser = await this.first();
    return firstUser.id === rows[0].id ? this.setUserRole(3, rows[0].id) : rows[0];
  }
  async first(){
    const queryString = {
      text: `SELECT id,email FROM users LIMIT 1;`,
      values: []
    };
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async setUserRole(role, userId){
    const queryString = {
      text : `UPDATE users SET role=$1 WHERE id=$2 RETURNING*`,
      values : [role, userId]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async userExists(email){
    const queryString = {
      text : `SELECT email FROM users WHERE email=$1`,
      values : [email]
    }
    const { rows } = await pool.query(queryString);
    return rows.length;
  }
  async updateUser(datas, userId){
    const { email, first_name, last_name, address, phone } = datas;
    const queryString = {
      text : `UPDATE users SET email=$1,first_name=$2, last_name=$3, address=$4, phone=$5 WHERE id=$6 RETURNING*`,
      values : [email,first_name,last_name,address,phone,userId]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
}

export default new UserModel();

