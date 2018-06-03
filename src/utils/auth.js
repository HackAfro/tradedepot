import { db } from './firebase';

const store = localStorage;

export const authenticate = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const value = JSON.stringify(data);
      store.setItem('user', value);
      resolve();
    } catch (e) {
      console.error("Data couldn't be stored");
      reject(e);
    }
  });
};

export const saveToDb = (ref, data) => {
  return db.ref(ref).set(data);
};

export const getUser = () =>
  new Promise((resolve, reject) => {
    try {
      const user = store.getItem('user');
      if (user) {
        resolve(JSON.parse(user));
      } else {
        reject();
      }
    } catch (e) {
      reject(e);
      return null;
    }
  });

export const isAuthenticated = () => !!store.getItem('user');

export const unAuthenticate = () =>
  new Promise((resolve, reject) => {
    try {
      store.removeItem('user');
      resolve();
    } catch (e) {
      reject(e);
      return false;
    }
  });
