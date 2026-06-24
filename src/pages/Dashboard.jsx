import {
  RiBuildingLine,
  RiUserLine,
  RiFlashlightLine,
  RiEyeLine,
  RiUserAddLine,
  RiAlertLine,
  RiCheckLine,
  RiPriceTagLine as RiTagLine,
  RiStarLine,
} from "react-icons/ri";
import StatCard from "../components/StatCard";
import Avatar from "../components/Avatar";
import { mockStats, mockActivityFeed, mockUsers, mockTopGyms } from "../data/mockData";

const ACTIVITY_ICON = {
  join: { icon: RiUserAddLine, color: "#22C55E" },
  view: { icon: RiEyeLine, color: "#D9FF00" },
  suspend: { icon: RiAlertLine, color: "#FF4444" },
  category: { icon: RiTagLine, color: "#A855F7" },
  activate: { icon: RiCheckLine, color: "#22C55E" },
};

export default function Dashboard() {
  const recentUsers = mockUsers.slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-5xl tracking-wide">Dashboard</h2>
        <p className="text-[#8A8A94] text-sm mt-1">Platform overview and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Gyms" value={mockStats.totalGyms} trend={mockStats.totalGymsTrend} icon={RiBuildingLine} />
        <StatCard label="Total Users" value={mockStats.totalUsers} trend={mockStats.totalUsersTrend} icon={RiUserLine} accent="#A855F7" />
        <StatCard label="Active Users" value={mockStats.activeUsers} trend={mockStats.activeUsersTrend} icon={RiFlashlightLine} accent="#22C55E" />
        <StatCard label="Top Gym Views" value={mockStats.mostViewedGym} trend={mockStats.mostViewedTrend} icon={RiEyeLine} accent="#FF6B35" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-xl tracking-wide">Recent Users</h3>
            <span className="text-[#8A8A94] text-xs">Last 6 joined</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#2A2A30]">
                  {["User", "Email", "Status", "Joined"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-[#8A8A94] uppercase tracking-widest py-2 px-3 first:pl-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-[#2A2A30] hover:bg-[#1E1E22] transition-colors">
                    <td className="py-3 px-3 first:pl-0">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={u.avatar} size={30} />
                        <span className="text-sm font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-[#8A8A94]">{u.email}</td>
                    <td className="py-3 px-3">
                      <span className={`badge badge-${u.status}`}>{u.status}</span>
                    </td>
                    <td className="py-3 px-3 text-sm text-[#8A8A94]">{u.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card p-6">
          <h3 className="font-heading text-xl tracking-wide mb-5">Activity Feed</h3>
          <div className="flex flex-col gap-4">
            {mockActivityFeed.map((item) => {
              const config = ACTIVITY_ICON[item.icon] || ACTIVITY_ICON.view;
              const IconComp = config.icon;
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ backgroundColor: `${config.color}18`, color: config.color }}
                  >
                    <IconComp />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-snug">{item.message}</p>
                    <p className="text-[#64646C] text-xs mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Gyms */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading text-xl tracking-wide">Most Viewed Gyms</h3>
          <RiStarLine className="text-[#D9FF00]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A30]">
                {["#", "Gym Name", "Category", "Views", "Rating"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-[#8A8A94] uppercase tracking-widest py-2 px-3 first:pl-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTopGyms.map((gym, i) => (
                <tr key={gym.id} className="border-b border-[#2A2A30] hover:bg-[#1E1E22] transition-colors">
                  <td className="py-3 px-3 first:pl-0 text-[#64646C] text-sm font-mono">{String(i + 1).padStart(2, "0")}</td>
                  <td className="py-3 px-3 text-sm font-medium">{gym.name}</td>
                  <td className="py-3 px-3 text-sm text-[#8A8A94]">{gym.category}</td>
                  <td className="py-3 px-3 text-sm font-semibold text-[#D9FF00]">{gym.views.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 text-sm">
                      <RiStarLine className="text-[#F59E0B] text-xs" />
                      <span>{gym.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
