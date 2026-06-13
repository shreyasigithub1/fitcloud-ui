import { apiRequest } from "./CommonApiRequest";

// GET /admin/gym-owners
export const getAllGymOwners = ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
}) => {
  return apiRequest({
    endpoint: `/admin/gym-owners?page=${page}&size=${size}&sortBy=${sortBy}`,
    method: "GET",
  });
};

// GET /admin/gym-owners/filter
export const searchGymOwnersByStatus = ({
  statuses,
  searchKey = "",
  page = 0,
  size = 10,
  sortBy = "createdAt",
}) => {
  return apiRequest({
    endpoint: `/admin/gym-owners/filter?statuses=${statuses.join(
      ","
    )}&searchKey=${encodeURIComponent(
      searchKey
    )}&page=${page}&size=${size}&sortBy=${sortBy}`,
    method: "GET",
  });
};

// GET /admin/pending-owners
export const getPendingGymOwners = ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
}) => {
  return apiRequest({
    endpoint: `/admin/pending-owners?page=${page}&size=${size}&sortBy=${sortBy}`,
    method: "GET",
  });
};

// POST /admin/approve/{userId}
export const approveGymOwner = (userId) => {
  return apiRequest({
    endpoint: `/admin/approve/${userId}`,
    method: "POST",
  });
};

// POST /admin/reject/{userId}
export const rejectGymOwner = (userId) => {
  return apiRequest({
    endpoint: `/admin/reject/${userId}`,
    method: "POST",
  });
};

// POST /admin/suspend/{userId}
export const suspendGymOwner = (userId) => {
  return apiRequest({
    endpoint: `/admin/suspend/${userId}`,
    method: "POST",
  });
};