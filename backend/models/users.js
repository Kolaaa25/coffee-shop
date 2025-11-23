import { userDB } from '../database/db.js';

export const findUserByEmail = (email) => {
  return userDB.findByEmail(email);
};

export const findUserById = (id) => {
  return userDB.findById(id);
};

export const createUser = (userData) => {
  const result = userDB.create(userData.name, userData.email, userData.password);
  return {
    id: result.lastInsertRowid,
    name: userData.name,
    email: userData.email,
    createdAt: new Date().toISOString()
  };
};

export const getAllUsers = () => {
  return userDB.getAll();
};
