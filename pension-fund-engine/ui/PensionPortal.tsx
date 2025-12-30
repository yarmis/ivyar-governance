import React, { useState } from 'react';
import { 
  Wallet, CreditCard, Calendar, TrendingUp, FileText, Download, 
  ChevronRight, User, Settings, HelpCircle, Home, Bell, Menu,
  CheckCircle, AlertCircle, Info, X
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface PensionData {
  basePension: number;
  combatBonus: number;
  disabilityBonus: number;
  dependentsBonus: number;
  awardsBonus: number;
  totalPension: number;
  indexationRate: number;
  nextPaymentDate: string;
  rank: string;
  serviceYears: number;
  combatYears: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
}

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
  primary: '#0057B8',
  primaryLight: '#E3F2FD',
  secondary: '#FFD700',
  success: '#4CAF50',
  successLight: '#E8F5E9',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  error: '#F44336',
  errorLight: '#FFEBEE',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray500: '#9E9E9E',
  gray700: '#616161',
  gray900: '#212121',
  white: '#FFFFFF',
};

// ============================================================================
// PENSIONER DASHBOARD
// ============================================================================

const PensionPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const pensionData: PensionData = {
    basePension: 35000,
    combatBonus: 5200,
    disabilityBonus: 10500,
    dependentsBonus: 530,
    awardsBonus: 0,
    totalPension: 51230,
    indexationRate: 5.2,
    nextPaymentDate: '2025-01-05',
    rank: 'Полковник',
    serviceYears: 28,
    combatYears: 6,
  };

  const recentPayments: Payment[] = [
    { id: '1', date: '2024-12-05', amount: 45230, method: 'Bank Transfer', status: 'completed' },
    { id: '2', date: '2024-11-05', amount: 43076, method: 'Bank Transfer', status: 'completed' },
    { id: '3', date: '2024-10-05', amount: 43076, method: 'Bank Transfer', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <Dashboard pensionData={pensionData} payments={recentPayments} />
          )}
          {activeTab === 'pension' && (
            <PensionDetails pensionData={pensionData} />
          )}
          {activeTab === 'payments' && (
            <PaymentHistory payments={recentPayments} />
          )}
        </main>
      </div>
    </div>
  );
};

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="bg-blue-700 text-white h-16 flex items-center px-6 shadow-lg">
    <button onClick={onMenuClick} className="mr-4 p-2 hover:bg-blue-600 rounded-lg">
      <Menu size={24} />
    </button>
    
    <div className="flex items-center gap-2">
      <span className="text-2xl">🇺🇦</span>
      <span className="text-xl font-bold">IVYAR</span>
      <span className="text-sm opacity-80 ml-2">Pension Portal</span>
    </div>
    
    <div className="flex-1" />
    
    <div className="flex items-center gap-4">
      <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded text-sm">
        <span>UA</span>
        <span className="opacity-60">|</span>
        <span className="opacity-60">EN</span>
      </button>
      
      <button className="relative p-2 hover:bg-blue-600 rounded-lg">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
      </button>
      
      <div className="flex items-center gap-2 pl-4 border-l border-blue-500">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User size={18} />
        </div>
        <span className="text-sm">Іван Петренко</span>
      </div>
    </div>
  </header>
);

// ============================================================================
// SIDEBAR COMPONENT
// ============================================================================

const Sidebar = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'pension', icon: Wallet, label: 'My Pension' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <aside className="w-60 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
              ${activeTab === item.id 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Quick Actions</h4>
        <QuickActionButton icon={Download} label="Download Statement" />
        <QuickActionButton icon={CreditCard} label="Update Bank Details" />
        <QuickActionButton icon={HelpCircle} label="Contact Support" />
      </div>
    </aside>
  );
};

const QuickActionButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg mb-1">
    <Icon size={16} />
    <span>{label}</span>
  </button>
);

// ============================================================================
// DASHBOARD
// ============================================================================

const Dashboard = ({ pensionData, payments }: { pensionData: PensionData; payments: Payment[] }) => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Good morning, Іван! 👋</h1>
      <p className="text-gray-500">Here's your pension overview</p>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={Wallet}
        label="Current Pension"
        value={`${pensionData.totalPension.toLocaleString()} ₴`}
        trend={`+${pensionData.indexationRate}%`}
        trendUp
      />
      <StatCard
        icon={Calendar}
        label="Next Payment"
        value={new Date(pensionData.nextPaymentDate).toLocaleDateString('uk-UA', { 
          month: 'long', 
          day: 'numeric' 
        })}
      />
      <StatCard
        icon={TrendingUp}
        label="Indexation This Year"
        value={`+${pensionData.indexationRate}%`}
        trendUp
      />
    </div>

    {/* Pension Breakdown */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PensionBreakdownCard pensionData={pensionData} />
      <RecentActivityCard payments={payments} />
    </div>
  </div>
);

// ============================================================================
// STAT CARD
// ============================================================================

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  trend?: string; 
  trendUp?: boolean;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend} {trendUp ? '↑' : '↓'}
          </p>
        )}
      </div>
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
        <Icon className="text-blue-600" size={24} />
      </div>
    </div>
  </div>
);

// ============================================================================
// PENSION BREAKDOWN CARD
// ============================================================================

const PensionBreakdownCard = ({ pensionData }: { pensionData: PensionData }) => {
  const items = [
    { label: 'Base Pension', value: pensionData.basePension, color: 'bg-blue-500' },
    { label: 'Combat Bonus', value: pensionData.combatBonus, color: 'bg-green-500' },
    { label: 'Disability Bonus', value: pensionData.disabilityBonus, color: 'bg-orange-500' },
    { label: 'Dependents', value: pensionData.dependentsBonus, color: 'bg-purple-500' },
  ];

  const total = pensionData.totalPension;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">📊 Pension Breakdown</h3>
        <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
          View Details <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium">{item.value.toLocaleString()} ₴</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} rounded-full transition-all`}
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total Pension</span>
          <span className="text-2xl font-bold text-blue-600">
            {total.toLocaleString()} ₴
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Tax exempt (Military pension)</p>
      </div>
    </div>
  );
};

// ============================================================================
// RECENT ACTIVITY CARD
// ============================================================================

const RecentActivityCard = ({ payments }: { payments: Payment[] }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">📋 Recent Activity</h3>
      <button className="text-blue-600 text-sm hover:underline">View All</button>
    </div>

    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Payment received</p>
            <p className="text-sm text-gray-500">
              {new Date(payment.date).toLocaleDateString('uk-UA', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <span className="font-semibold text-green-600">
            +{payment.amount.toLocaleString()} ₴
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// PENSION DETAILS PAGE
// ============================================================================

const PensionDetails = ({ pensionData }: { pensionData: PensionData }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">💰 Pension Calculation</h1>
        <p className="text-gray-500">Detailed breakdown of your pension</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Download size={18} />
        Download PDF
      </button>
    </div>

    {/* Service Information */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <InfoItem label="Rank at Retirement" value={pensionData.rank} />
        <InfoItem label="Base Salary" value={`65,000 ₴`} />
        <InfoItem label="Total Service" value={`${pensionData.serviceYears} years`} />
        <InfoItem label="Combat Service" value={`${pensionData.combatYears} years`} />
      </div>
    </div>

    {/* Calculation Steps */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Breakdown</h3>
      
      <div className="space-y-4">
        <CalculationStep 
          step={1}
          title="Effective Years"
          formula={`${pensionData.serviceYears} + (${pensionData.combatYears} × 2) = ${pensionData.serviceYears + pensionData.combatYears * 2} years`}
          description="Combat years count 3× (2 bonus years per combat year)"
        />
        
        <CalculationStep 
          step={2}
          title="Pension Percentage"
          formula={`50% + (${Math.min(20, pensionData.serviceYears + pensionData.combatYears * 2 - 20)} × 2%) = 90% (max)`}
          description="Base 50% + 2% per year over 20, capped at 90%"
        />
        
        <CalculationStep 
          step={3}
          title="Base Pension"
          formula={`65,000 ₴ × 90% = 58,500 ₴`}
          description="Base salary × pension percentage"
        />
        
        <CalculationStep 
          step={4}
          title="Rank Coefficient"
          formula={`58,500 ₴ × 1.70 = 99,450 ₴`}
          description="Colonel rank coefficient: 1.70"
        />
      </div>
    </div>

    {/* Final Result */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Final Result</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-blue-100 text-sm">Gross Pension</p>
          <p className="text-2xl font-bold">{pensionData.totalPension.toLocaleString()} ₴</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Tax</p>
          <p className="text-2xl font-bold">0 ₴</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Net Pension</p>
          <p className="text-2xl font-bold">{pensionData.totalPension.toLocaleString()} ₴</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Per Year</p>
          <p className="text-2xl font-bold">{(pensionData.totalPension * 12).toLocaleString()} ₴</p>
        </div>
      </div>
    </div>
  </div>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);

const CalculationStep = ({ 
  step, 
  title, 
  formula, 
  description 
}: { 
  step: number; 
  title: string; 
  formula: string; 
  description: string;
}) => (
  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
      {step}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <div className="mt-1 px-3 py-2 bg-white rounded border border-gray-200 font-mono text-sm">
        {formula}
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);

// ============================================================================
// PAYMENT HISTORY PAGE
// ============================================================================

const PaymentHistory = ({ payments }: { payments: Payment[] }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">💳 Payment History</h1>
        <p className="text-gray-500">Track all your pension payments</p>
      </div>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Search payments..." 
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Filter
        </button>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Method</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, idx) => (
            <tr key={payment.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4">
                {new Date(payment.date).toLocaleDateString('uk-UA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td className="px-6 py-4 font-semibold">{payment.amount.toLocaleString()} ₴</td>
              <td className="px-6 py-4">{payment.method}</td>
              <td className="px-6 py-4">
                <StatusBadge status={payment.status} />
              </td>
              <td className="px-6 py-4">
                <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
                  <FileText size={16} />
                  Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <span>Showing 1-3 of 36 payments</span>
      <div className="flex gap-2">
        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Previous</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
  };

  const icons = {
    completed: CheckCircle,
    pending: Info,
    failed: AlertCircle,
  };

  const Icon = icons[status as keyof typeof icons];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
      <Icon size={12} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ============================================================================
// ALERT COMPONENT
// ============================================================================

const Alert = ({ 
  type, 
  message, 
  onClose 
}: { 
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}) => {
  const styles = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: CheckCircle },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: AlertCircle },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: AlertCircle },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Info },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${style.bg} ${style.border}`}>
      <Icon className={style.text} size={20} />
      <span className={`flex-1 ${style.text}`}>{message}</span>
      {onClose && (
        <button onClick={onClose} className={`${style.text} hover:opacity-70`}>
          <X size={18} />
        </button>
      )}
    </div>
  );
};

// ============================================================================
// EXPORT
// ============================================================================

export default PensionPortal;
