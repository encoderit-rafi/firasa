import axios from "axios";
import { API_BASE_URL } from "./consts";
import { getSession, signOut } from "next-auth/react";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.error === "RefreshTokenError") {
    await signOut({ callbackUrl: "/sign-in" });
    return Promise.reject(new Error("Session expired"));
  }

  const accessToken = session?.token?.access_token;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ callbackUrl: "/sign-in" });
    }
    return Promise.reject(error);
  }
);