import { apiRequest } from "./CommonApiRequest";

export const registerGymMemberApi = (userData) => {
  return apiRequest({
    endpoint: "/auth/register/member",
    method: "POST",
    body: userData,
  });
};
export const registerGymOwnerApi = (userData) => {
  return apiRequest({
    endpoint: "/auth/register/gym-owner",
    method: "POST",
    body: userData,
  });
};
export const loginAPI = (credentials) => {
  return apiRequest({
    endpoint: "/auth/login",
    method: "POST",
    body: credentials,
  });
};