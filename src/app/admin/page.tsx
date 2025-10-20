"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "lucide-react";
import { useMemo, useState } from "react";
import { FaBars } from "react-icons/fa";
import StatCard from "./components/DashboardCard";
import OrderDistributionCard from "./components/DistributionCard";
import TopSellingProductsCard from "./components/TopSellingProductsCard";

function AdminPage() {
  const categories = [
    "All Products",
    "Cake",
    "Quick Bread",
    "Cookies",
    "Fondant Cake",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [reportRange, setReportRange] = useState("Daily Report");

  const items = categories.map((label) => ({
    id: label.replace(/\s+/g, "-").toLowerCase(),
    label,
  }));
  const activeTabItem =
    items.find((it) => it.label === selectedCategory) ?? items[0];

  function handleTabClick(label: string) {
    setSelectedCategory(label);
  }

  // derive the data shown on the page based on the selected report range
  const { stats, orderStatuses, topProducts } = useMemo(() => {
    switch (reportRange) {
      case "Weekly Report":
        return {
          stats: {
            totalRevenue: "$10,450.00",
            activeOrders: "8",
            customRequests: "3",
            totalProducts: "14",
            subtextRevenue: "From 28 orders",
          },
          orderStatuses: [
            { label: "Pending", count: 12, color: "#FACC15" },
            { label: "Confirmed", count: 6, color: "#3B82F6" },
            { label: "In Progress", count: 5, color: "#D946EF" },
            { label: "Completed", count: 20, color: "#22C55E" },
            { label: "Cancelled", count: 2, color: "#EF4444" },
          ],
          topProducts: [
            { name: "Chocolate Cake", revenue: 4200 },
            { name: "Vanilla Cupcakes", revenue: 2200 },
            { name: "Red Velvet Cake", revenue: 1350 },
            { name: "Lemon Tart", revenue: 900 },
          ],
        };
      case "Annual Report":
        return {
          stats: {
            totalRevenue: "$128,200.00",
            activeOrders: "120",
            customRequests: "40",
            totalProducts: "18",
            subtextRevenue: "From 3,100 orders",
          },
          orderStatuses: [
            { label: "Pending", count: 40, color: "#FACC15" },
            { label: "Confirmed", count: 200, color: "#3B82F6" },
            { label: "In Progress", count: 60, color: "#D946EF" },
            { label: "Completed", count: 2800, color: "#22C55E" },
            { label: "Cancelled", count: 100, color: "#EF4444" },
          ],
          topProducts: [
            { name: "Chocolate Cake", revenue: 45200 },
            { name: "Vanilla Cupcakes", revenue: 31200 },
            { name: "Red Velvet Cake", revenue: 21000 },
            { name: "Assorted Cookies", revenue: 16000 },
          ],
        };
      case "Daily Report":
      default:
        return {
          stats: {
            totalRevenue: "$1,500.00",
            activeOrders: "2",
            customRequests: "1",
            totalProducts: "15",
            subtextRevenue: "From 6 orders",
          },
          orderStatuses: [
            { label: "Pending", count: 5, color: "#FACC15" },
            { label: "Confirmed", count: 2, color: "#3B82F6" },
            { label: "In Progress", count: 3, color: "#D946EF" },
            { label: "Completed", count: 4, color: "#22C55E" },
            { label: "Cancelled", count: 1, color: "#EF4444" },
          ],
          topProducts: [
            { name: "Chocolate Cake", revenue: 1500 },
            { name: "Vanilla Cupcakes", revenue: 1200 },
            { name: "Red Velvet Cake", revenue: 1000 },
          ],
        };
    }
  }, [reportRange]);

  return (
    <div>
      <div className="bg-pink-50 section-spacing text-center">
        <h1 className="text-4xl md:text-5xl font-kaushan italic mb-3 text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
          Manage your cake shop and track performance
        </p>
      </div>

      <div className="overview flex flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Overview</h1>
        <div className="flex items-center gap-4">
          <label htmlFor="report-range" className="sr-only">
            Report range
          </label>
          {/* Desktop: regular select (shown on sm and up) */}
          <label htmlFor="report-range" className="sr-only">
            Report range
          </label>

          <select
            id="report-range"
            value={reportRange}
            onChange={(e) => setReportRange(e.target.value)}
            className="hidden sm:inline-block px-3 py-2 bg-[#F8EFFA] border border-gray-200 rounded-md shadow-sm text-sm"
          >
            <option>Daily Report</option>
            <option>Weekly Report</option>
            <option>Annual Report</option>
          </select>

          {/* Mobile: hamburger dropdown (shown below sm) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Open report menu"
                className="inline-flex items-center gap-2 sm:hidden px-3 py-2 bg-[#F8EFFA] border border-gray-200 rounded-md shadow-sm text-sm"
              >
                <FaBars />
                <span className="truncate max-w-[8rem]">{reportRange}</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-44 bg-white rounded-md shadow-md p-1"
            >
              {["Daily Report", "Weekly Report", "Annual Report"].map((r) => (
                <DropdownMenuItem
                  key={r}
                  onClick={() => setReportRange(r)}
                  className={`cursor-pointer px-3 py-2 text-sm ${
                    reportRange === r ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {r}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-16 mb-8">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          subtext={stats.subtextRevenue}
          iconType="revenue"
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          subtext="Needs attention"
          iconType="orders"
        />
        <StatCard
          title="Custom Requests"
          value={stats.customRequests}
          subtext="Pending Requests"
          iconType="requests"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtext={`${stats.totalProducts} in stock`}
          iconType="products"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-16 mb-8">
        <OrderDistributionCard statuses={orderStatuses} />
        <TopSellingProductsCard products={topProducts} />
      </div>
    </div>
  );
}

export default AdminPage;
