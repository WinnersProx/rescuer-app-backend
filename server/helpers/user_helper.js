import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const hashPassword = password => bcrypt.hashSync(password, 10);
const comparePasswords = (plain, encrypted) => {
  return bcrypt.compareSync(plain, encrypted) ? true : false;
}
const authenticateUser = ({email}) => {
  const { SECRET } = process.env;
  return jwt.sign({
    email
  },
  SECRET,
  { expiresIn : (3600 * 24) * 365}) // expires in a year
}
const respond = (res, statusCode, statusText, message, data = undefined) => {
  return statusText !== "error" 
    ? res.status(statusCode).send({
      status : statusCode,
      message,
      data
    })
    : res.status(statusCode).send({
      status : statusCode,
      error : message
    })
}
const formatDate = d => {
  d = new Date(d);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
const dateIsPassed = d => {
  const today = new Date();
  d = new Date(d);
  return (d.getFullYear() < today.getFullYear()) 
  ? true
  : (d.getFullYear() === today.getFullYear()) && (d.getMonth() < today.getMonth())
  ? true : false;
}

export default { hashPassword, comparePasswords, authenticateUser, respond, dateIsPassed, formatDate };
