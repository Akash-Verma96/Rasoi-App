import React, { useState } from "react";
import { Users, Store, ClipboardList, IndianRupee, Menu } from "lucide-react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: "Users", value: 1200, icon: <Users /> },
    { title: "Restaurants", value: 85, icon: <Store /> },
    { title: "Orders", value: 5400, icon: <ClipboardList /> },
    { title: "Revenue", value: "₹1,25,000", icon: <IndianRupee /> },
  ];

  const orders = [
    { id: "1021", user: "Rahul", meal: "Paneer", status: "Delivered" },
    { id: "1022", user: "Aman", meal: "Biryani", status: "Preparing" },
    { id: "1023", user: "Sneha", meal: "Dosa", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      
      {/* Sidebar */}
      <div className={`bg-[#0f0f0f] w-64 p-5 fixed md:relative z-50 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <h1 className="text-2xl font-bold text-orange-500 mb-8">RASOI ADMIN</h1>

        <nav className="space-y-4">
          {["dashboard", "users", "restaurants", "orders"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-4 py-2 rounded-lg capitalize ${
                activeTab === tab
                  ? "bg-orange-500 text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {tab}
            </div>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 md:ml-0 w-full">
        
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>

          <h2 className="text-xl font-semibold capitalize">
            {activeTab}
          </h2>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#111] p-5 rounded-xl shadow-lg border border-gray-800 hover:border-orange-500 transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-gray-400">{item.title}</h3>
                    <span className="text-orange-500">{item.icon}</span>
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Orders */}
            <div className="bg-[#111] p-6 rounded-xl shadow-lg border border-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="py-2">ID</th>
                      <th>User</th>
                      <th>Meal</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-gray-800 hover:bg-gray-900">
                        <td className="py-2">#{o.id}</td>
                        <td>{o.user}</td>
                        <td>{o.meal}</td>
                        <td
                          className={`font-semibold ${
                            o.status === "Delivered"
                              ? "text-green-500"
                              : o.status === "Preparing"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {o.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-4 text-lg font-semibold">User Management</h3>
            <p className="text-gray-400">View, block or manage users</p>
          </div>
        )}

        {/* Restaurants */}
        {activeTab === "restaurants" && (
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-4 text-lg font-semibold">
              Restaurant Approval
            </h3>

            <div className="flex gap-3">
              <button className="bg-green-600 px-4 py-2 rounded-lg">
                Approve
              </button>
              <button className="bg-red-600 px-4 py-2 rounded-lg">
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
            <h3 className="mb-4 text-lg font-semibold">All Orders</h3>
            <p className="text-gray-400">Manage all platform orders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;