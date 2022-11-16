import * as SecureStore from "expo-secure-store";
import IUser from "../models/User";

const MY_USER_KEY = "myUser";

export const saveUser = async (userData: IUser) => {
  await SecureStore.setItemAsync(MY_USER_KEY, JSON.stringify(userData));
};

export const getUser = async (): Promise<IUser> => {
  const userData = await SecureStore.getItemAsync(MY_USER_KEY);
  return JSON.parse(userData);
};
