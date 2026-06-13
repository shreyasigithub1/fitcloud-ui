import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import {
  getAllGymOwners,
  searchGymOwnersByStatus,
  getPendingGymOwners,
  approveGymOwner,
  rejectGymOwner,
  suspendGymOwner,
} from "../api/AdminApi";

// shared helper to avoid repetition
const invalidateOwnerQueries = (queryClient) => {
  queryClient.invalidateQueries({ queryKey: ["gymOwners"] });
  queryClient.invalidateQueries({ queryKey: ["pendingGymOwners"] });
  queryClient.invalidateQueries({ queryKey: ["gymOwnersByStatus"] });
};

// ── Get All Gym Owners ─────────────────────────────

export const useGetAllGymOwners = (
  page = 0,
  size = 10,
  sortBy = "createdAt"
) => {
  return useQuery({
    queryKey: ["gymOwners", page, size, sortBy],
    queryFn: () => getAllGymOwners({ page, size, sortBy }),
  });
};

// ── Search Gym Owners By Status ────────────────────

export const useSearchGymOwnersByStatus = (
  statuses,
  searchKey = "",
  page = 0,
  size = 10,
  sortBy = "createdAt",
  enabled = true
) => {
  return useQuery({
    queryKey: ["gymOwnersByStatus", statuses.join(","), searchKey,page, size, sortBy],
    queryFn: () =>
      searchGymOwnersByStatus({
        statuses,
        searchKey,
        page,
        size,
        sortBy,
      }),
      enabled,
  });
};

// ── Get Pending Gym Owners ─────────────────────────

export const useGetPendingGymOwners = (
  page = 0,
  size = 10,
  sortBy = "createdAt"
) => {
  return useQuery({
    queryKey: ["pendingGymOwners", page, size, sortBy],
    queryFn: () => getPendingGymOwners({ page, size, sortBy }),
  });
};

// ── Approve Gym Owner ──────────────────────────────

export const useApproveGymOwner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveGymOwner,

    onSuccess: () => invalidateOwnerQueries(queryClient),
    onError: (error) => {
      console.error("Approve Gym Owner error:", error.message);
    },
  });
};

// ── Reject Gym Owner ───────────────────────────────

export const useRejectGymOwner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectGymOwner,

    onSuccess: () => invalidateOwnerQueries(queryClient),
    onError: (error) => {
      console.error("Reject Gym Owner error:", error.message);
    },
  });
};

// ── Suspend Gym Owner ──────────────────────────────

export const useSuspendGymOwner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: suspendGymOwner,

    onSuccess: () => invalidateOwnerQueries(queryClient),

    onError: (error) => {
      console.error("Suspend Gym Owner error:", error.message);
    },
  });
};
