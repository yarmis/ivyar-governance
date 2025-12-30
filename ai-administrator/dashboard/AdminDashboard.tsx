/**
 * AI Admin Dashboard
 */

import React, { useState, useEffect } from 'react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch('/api/ai/usage').then(r => r.json()).then(d => setStats(d.data));
    fetch('/api/ai/health').then(r => r.json()).then(setHealth);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">AI Administrator</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">System Health</h2>
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${health?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="capitalize">{health?.status || 'Loading...'}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Requests" value={stats?.totalRequests?.toLocaleString() || '0'} />
        <StatCard title="Tokens" value={stats?.totalTokens?.toLocaleString() || '0'} />
        <StatCard title="Cost" value={`$${stats?.totalCost?.toFixed(2) || '0.00'}`} />
        <StatCard title="Avg Latency" value={`${stats?.avgLatencyMs?.toFixed(0) || 0}ms`} />
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="text-sm text-gray-600">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default AdminDashboard;
