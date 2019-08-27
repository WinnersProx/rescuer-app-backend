import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
let pool;
const { 
	NODE_ENV, 
	DATABASE_URL, 
	DATABASE_USER, 
	USER_PASSWORD,
	DATABASE_TEST
} = process.env;
if(NODE_ENV === 'production'){
  const connectionString = DATABASE_URL;
  pool = new Pool({ connectionString });
}
else{
  pool = new Pool({
    user: DATABASE_USER,
    host: 'localhost',
    database: DATABASE_TEST,
    password: USER_PASSWORD,
    port: 5432
  })
}


export default pool;
