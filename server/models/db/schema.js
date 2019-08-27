import pool from '../../config/db.config';

const emergenciesTable = `
DROP TABLE IF EXISTS emergencies CASCADE;
CREATE TABLE emergencies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type INTEGER NOT NULL,
  user_location VARCHAR(200) NOT NULL,
  status INTEGER NOT NULL DEFAULT 0,
  created_on DATE DEFAULT NOW()
);
`;

const emergencyTypesTable = `
DROP TABLE IF EXISTS emergency_types CASCADE;
CREATE TABLE emergency_types (
  id SERIAL PRIMARY KEY,
  type_name VARCHAR(100) NOT NULL,
  description VARCHAR(200) NOT NULL
);
`;

const feedbacksTable = `
DROP TABLE IF EXISTS feedbacks CASCADE;
CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message text NOT NULL,
  created_on DATE DEFAULT NOW()
);
`;

const notificationsTable = `
DROP TABLE IF EXISTS notifications CASCADE;
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message VARCHAR(200) NOT NULL,
  status INTEGER NOT NULL DEFAULT 0,
  created_on DATE DEFAULT NOW()
);
`;

const relievesTable = `
DROP TABLE IF EXISTS relieves CASCADE;
CREATE TABLE relieves (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  emergency INTEGER NOT NULL,
  created_on DATE DEFAULT NOW()
);
`;

const rolesTable = `
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL
);
`;

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  address VARCHAR(200) NOT NULL,
  role INTEGER NOT NULL DEFAULT 1,
  phone VARCHAR(20) DEFAULT NULL,
  created_on DATE DEFAULT NOW()
);
`;

const constraints = `
ALTER TABLE emergencies
  ADD CONSTRAINT efk1 FOREIGN KEY(user_id) REFERENCES users(id),
  ADD CONSTRAINT efk2 FOREIGN KEY(type) REFERENCES emergency_types(id);

ALTER TABLE feedbacks
  ADD CONSTRAINT ffk1 FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE notifications
  ADD CONSTRAINT nfk1 FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE relieves
  ADD CONSTRAINT rfk1 FOREIGN KEY(user_id) REFERENCES users(id),
  ADD CONSTRAINT rfk2 FOREIGN KEY(emergency) REFERENCES emergencies(id);

ALTER TABLE users
  ADD CONSTRAINT ufk1 FOREIGN KEY(role) REFERENCES roles(id);    
`;
const queryString = `
${emergenciesTable}
${emergencyTypesTable}
${feedbacksTable}
${notificationsTable}
${relievesTable}
${rolesTable}
${usersTable}
${constraints}
`;

(async () => {
  try {
    await pool.query(queryString);
  } catch (error) {
    if (error) console.log(error);
  }
})();
