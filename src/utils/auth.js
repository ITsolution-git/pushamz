

import { AsyncStorage } from "react-native";

const user = null;

export const USER_KEY = "user-obj";
export const onSignIn = (obj) => {
  user = obj.customer;
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(obj));
};

export const onSignOut = () => {
  AsyncStorage.removeItem(USER_KEY);
  user = null;
};  

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

export const getUser = () => {
  return user;
};