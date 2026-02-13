import axios from "axios";
import { API_BASE_URL } from "./consts";
// import { toast } from "sonner";
// import { useToken, useCurrentUser } from "./store";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTljMDkzYS05NDcxLTczMzctOTdkNC0xNDc4OWRiNzhiY2MiLCJqdGkiOiI1YTU1MjYxNjRhYTA3ODFkNDQ0ZmE3ZGE3YTBmNGFhMTBiYmNhNmFlNTY3YzViMGJkYzE2ZDNmNTNkZGU0NDRjNzFlMDE3NWVhM2Y1MDE5OSIsImlhdCI6MTc3MDgwNzY2OC42MDM5OTgsIm5iZiI6MTc3MDgwNzY2OC42MDQwMDEsImV4cCI6MTc3MTA2Njg2OC41OTI2NDIsInN1YiI6IjgyIiwic2NvcGVzIjpbXX0.HOA0bJV9soqC3jKEl3lOi1Ejg2m6kni1kynyEGWQs6Dfqoyd2YaPoPBqBtSOvCr2pizUp20h5A8pm3_2YRDOQLKBACCmcXhyxiR9DHhJxWyd0qibn8CiGUsSQ06eE-4LgLr81FEhSW4AQGc6GLTnYh4qyVhK4XyVeicK88zTM8wGjLNKpBFvazlCADKc_HSJONU2rwtXDqLDfs06PWV8XmAsf_NvRlZY0wFr-U5NmnkI3GE6XmqlT2im0DOxYJNjGz2Q6zpO8Penc1-BgurpyeXhqLZKRF_RiA7_8IWxqAN6srLbIZPavzTHX7f2hw4QiKG63FLgYdPorhlz-1h-xAXl6-oVYioZsF0RtfEqQumBEByOZDS6nKL-X_p21kXs2IWzfipZAYeVCpZWb7ICKBkwfTgpLngKxPie5HSIwBsT1wYX0Dcay4vzychWZ1_N4Kv08tRQzPvfaUDxDj67AWDiuE4FyvqfgasAgeASxylna562AdOAvLRK58_HlPduegWmjM8bQXos5CRKQZbBhX5LY8YoC7DLDaWlBqcCSRJEop2D8qnBkokEV5AhVOq_F6QRfrpbSEFWrURSZ-Sw9JY5NizYxE05IvTgDPiwoqXLMZ6bPnhvQD_okz7P-OW59_Mw3Af8XuUAJF3EwsXtXCDrxqkozf_eOoFar7Id4M0";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  // const { token } = useToken.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // useToken.getState().setToken(null);
      // useCurrentUser.getState().clearUser();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      // toast.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  },
);
