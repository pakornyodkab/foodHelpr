import * as SecureStore from 'expo-secure-store';
import { MY_SECURE_AUTH_STATE_KEY } from "@env";

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, token);
  }

export const getToken = async () => {
    return await SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY) 
  }
