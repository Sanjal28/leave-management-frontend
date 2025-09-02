import React, { useEffect, useState } from "react";
import apiService from "../../api/apiService";
import Spinner from "../../components/Spinner";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { DashboardShimmer } from "../../components/Shimmer";

const StatCard = ({ title, value, icon, color }) => {
  const Icon = icon;
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
          <Icon className="h-8 w-8 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

const ManagerDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiService.get("/manager/analytics");
        setAnalytics(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <DashboardShimmer />;

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
      {analytics ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Pending Requests"
            value={analytics.pending}
            icon={ClockIcon}
            color="border-yellow-500"
          />
          <StatCard
            title="Approved"
            value={analytics.approved}
            icon={CheckCircleIcon}
            color="border-green-500"
          />
          <StatCard
            title="Rejected"
            value={analytics.rejected}
            icon={XCircleIcon}
            color="border-red-500"
          />
          <StatCard
            title="Total Requests"
            value={analytics.total}
            icon={ListBulletIcon}
            color="border-indigo-500"
          />
        </div>
      ) : (
        <p>Could not load analytics data.</p>
      )}

      {/* You could add more components here, like recent requests or team summary */}
    </div>
  );
};

export default ManagerDashboard;
