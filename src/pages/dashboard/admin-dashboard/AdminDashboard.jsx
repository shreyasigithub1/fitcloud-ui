import { useState } from "react";
import {
  Shield,
  Dumbbell,
  Search,
  Download,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInactivityLogout } from "@/hooks/userInactivityLogout";
import Pagination from "@/components/shared/Pagination";

import {
  useGetAllGymOwners,
  useSearchGymOwnersByStatus,
  useGetPendingGymOwners,
  useApproveGymOwner,
  useRejectGymOwner,
  useSuspendGymOwner,
} from "../../../hooks/useAdmin";

const AVATAR_COLORS = {
  pending: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
  active: { bg: "bg-green-500/15", text: "text-green-400" },
  suspended: { bg: "bg-red-500/15", text: "text-red-400" },
  rejected: { bg: "bg-white/5", text: "text-white/35" },
};

const STATUS_PILL = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25",
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  suspended: "bg-red-500/10 text-red-400 border border-red-500/20",
  rejected: "bg-white/5 text-white/35 border border-white/10",
};

const DOT_COLOR = {
  pending: "bg-yellow-400",
  active: "bg-green-400",
  suspended: "bg-red-400",
  rejected: "bg-white/30",
};

export default function AdminDashboard() {
  useInactivityLogout();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(0);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  const STATUS_MAP = {
    all: ["ACTIVE", "PENDING", "REJECTED", "SUSPENDED"],

    pending: ["PENDING"],

    active: ["ACTIVE"],

    suspended: ["SUSPENDED"],
  };
  const ACTIVE_STATUSES = ["ACTIVE"];
  const SUSPENDED_STATUSES = ["SUSPENDED"];

  const PAGE_SIZE = 10;

  const { data: allOwners } = useGetAllGymOwners(page, PAGE_SIZE);

  const { data: pendingOwners } = useGetPendingGymOwners(page, PAGE_SIZE);

  const { data: activeOwners } = useSearchGymOwnersByStatus(
    ACTIVE_STATUSES,
    page,
    PAGE_SIZE
  );

  const { data: suspendedOwners } = useSearchGymOwnersByStatus(
    SUSPENDED_STATUSES,
    page,
    PAGE_SIZE
  );
  const { data: searchedOwners } = useSearchGymOwnersByStatus(
    STATUS_MAP[activeTab],
    searchKey,
    page,
    PAGE_SIZE,
    "createdAt",
    !!searchKey.trim()
  );
  const defaultData =
    activeTab === "pending"
      ? pendingOwners
      : activeTab === "active"
      ? activeOwners
      : activeTab === "suspended"
      ? suspendedOwners
      : allOwners;

  const currentData = searchKey.trim() ? searchedOwners : defaultData;
  const ownersData = currentData?.content || [];
  const filteredOwners = ownersData.filter((owner) => {
    return (
      !search ||
      owner.name?.toLowerCase().includes(search.toLowerCase()) ||
      owner.email?.toLowerCase().includes(search.toLowerCase()) ||
      owner.businessName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const TABS = [
    { key: "all", label: "All owners", badge: allOwners?.totalElements },
    {
      key: "pending",
      label: "Pending",
      badge: pendingOwners?.totalElements,
      dot: "bg-yellow-400",
    },
    { key: "active", label: "Active", dot: "bg-green-400" },
    { key: "suspended", label: "Suspended", dot: "bg-red-400" },
  ];
  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6 font-sans text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase opacity-60">
            FitCloud
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Admin Badge */}
          <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-white/40 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            <Shield className="w-3 h-3" />
            Admin
          </span>

          <div className="w-px h-5 bg-white/8" />

          {/* User + Logout as one unified pill */}
          <div className="flex items-center gap-0 bg-white/[0.05] border border-white/[0.09] rounded-xl overflow-hidden">
            {/* User Info */}
            <div className="flex items-center gap-2.5 px-3 py-1.5">
              <div className="w-[30px] h-[30px] rounded-lg bg-orange-500 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                {user.userName?.slice(0, 2).toUpperCase()}
              </div>
              <div className="leading-tight">
                <p className="text-[12.5px] font-medium text-white">
                  {user.userName}
                </p>
                <p className="text-[10.5px] text-white/35">{user.email}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/[0.08]" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center px-3 h-full text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Total owners",
            value: allOwners?.totalElements ?? "—",
            color: "text-orange-300",
          },
          {
            label: "Pending review",
            value: pendingOwners?.totalElements ?? "—",
            color: "text-yellow-400",
          },
          {
            label: "Active",
            value: activeOwners?.totalElements ?? "—",
            color: "text-green-400",
          },
          {
            label: "Suspended",
            value: suspendedOwners?.totalElements ?? "—",
            color: "text-red-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4"
          >
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1.5">
              {s.label}
            </p>
            <p className={`text-2xl font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-[#141414] border border-white/[0.06] rounded-2xl overflow-hidden">
        {/* Search + Filters */}
        <div className="p-5 pb-0">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
              <input
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);

                  if (!value.trim()) {
                    setSearchKey("");
                    setPage(0);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchKey(search);
                    setPage(0);
                  }
                }}
                placeholder="Search by name, email, or business..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-orange-500/40"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0.5 bg-white/[0.03] rounded-xl p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setPage(0);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all
                  ${
                    activeTab === tab.key
                      ? "bg-orange-500/15 text-orange-300 border border-orange-500/25"
                      : "text-white/35 hover:text-white/55 hover:bg-white/[0.03]"
                  }`}
              >
                {tab.dot && (
                  <span className={`w-1.5 h-1.5 rounded-full ${tab.dot}`} />
                )}
                {tab.label}
                {tab.badge && (
                  <span className="bg-orange-500/25 text-orange-300 text-[10px] px-1.5 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-1">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Owner", "Contact", "Status", "Joined", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[11px] font-medium text-white/30 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredOwners.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-white/25 text-sm"
                  >
                    No owners found
                  </td>
                </tr>
              ) : (
                filteredOwners.map((owner) => {
                  const status = owner.status.toLowerCase();

                  const avatarStyle =
                    AVATAR_COLORS[status] || AVATAR_COLORS.pending;

                  return (
                    <tr
                      key={owner.id}
                      className="border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors"
                    >
                      {/* Owner */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${avatarStyle.bg} ${avatarStyle.text}`}
                          >
                            {owner.name
                              ?.split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              {owner.name}
                            </p>
                            <p className="text-[11px] text-white/35">
                              {owner.businessName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-3.5 text-white/45">
                        {owner.email}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_PILL[status]}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${DOT_COLOR[status]}`}
                          />
                          {owner.status}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-3.5 text-white/35 text-xs">
                        {new Date(owner.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {status === "pending" && (
                            <>
                              <button className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/25">
                                Approve
                              </button>

                              <button className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/25">
                                Reject
                              </button>
                            </>
                          )}

                          {status === "active" && (
                            <button className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/25">
                              Suspend
                            </button>
                          )}

                          {status === "suspended" && (
                            <button className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/25">
                              Unsuspend
                            </button>
                          )}

                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/30 flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          onPageChange={setPage}
          totalElements={currentData?.totalElements ?? 0}
          totalPages={currentData?.totalPages ?? 0}
          size={currentData?.size ?? PAGE_SIZE}
          last={currentData?.last ?? true}
          label="owners"
        />
      </div>
    </div>
  );
}
