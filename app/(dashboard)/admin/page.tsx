import StatsCard from "@/components/dashboard/StatsCard";

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Seller Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="My Medicines" value={32} />
        <StatsCard title="Pending Orders" value={7} />
        <StatsCard title="Stock Low" value={3} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="My Medicines" value={32} />
        <StatsCard title="Pending Orders" value={7} />
        <StatsCard title="Stock Low" value={3} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="My Medicines" value={32} />
        <StatsCard title="Pending Orders" value={7} />
        <StatsCard title="Stock Low" value={3} />
      </div>
    </div>
  );
}
