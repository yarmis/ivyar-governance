import React, { useState } from 'react';
import {
  Home,
  Calendar,
  Pill,
  FileText,
  Settings,
  Bell,
  Menu,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle,
  User,
  Heart,
  Brain,
  Bone,
  Eye,
  Activity,
  Stethoscope,
  Video,
  Download,
  Search,
  Filter,
  Plus,
  RefreshCw,
  AlertCircle,
  X,
  Star,
  Building,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface Appointment {
  id: string;
  date: string;
  time: string;
  provider: string;
  specialty: string;
  location: string;
  room: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: 'in-person' | 'telemedicine';
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  quantity: number;
  remaining: number;
  refillDate: string;
  prescriber: string;
  status: 'active' | 'refill-needed' | 'expired';
}

interface LabResult {
  id: string;
  name: string;
  date: string;
  provider: string;
  status: 'normal' | 'attention' | 'critical';
  results: Array<{
    test: string;
    value: string;
    range: string;
    status: 'normal' | 'high' | 'low';
  }>;
}

interface HealthAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  action?: string;
  actionLabel?: string;
}

// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    date: '2025-01-05',
    time: '10:00',
    provider: 'Dr. Koval, Oleksandr',
    specialty: 'Cardiology',
    location: 'Clinic A',
    room: '201',
    status: 'confirmed',
    type: 'in-person',
  },
  {
    id: '2',
    date: '2025-01-12',
    time: '14:30',
    provider: 'Dr. Bondar, Tetiana',
    specialty: 'General Medicine',
    location: 'Clinic B',
    room: '105',
    status: 'scheduled',
    type: 'in-person',
  },
  {
    id: '3',
    date: '2025-01-20',
    time: '09:00',
    provider: 'Physical Therapy Team',
    specialty: 'Rehabilitation',
    location: 'Rehab Center',
    room: 'Gym A',
    status: 'scheduled',
    type: 'in-person',
  },
];

const sampleMedications: Medication[] = [
  {
    id: '1',
    name: 'Metformin',
    dosage: '500mg',
    instructions: '1 tablet twice daily with meals',
    quantity: 60,
    remaining: 39,
    refillDate: '2025-01-10',
    prescriber: 'Dr. Koval',
    status: 'refill-needed',
  },
  {
    id: '2',
    name: 'Lisinopril',
    dosage: '10mg',
    instructions: '1 tablet once daily in the morning',
    quantity: 30,
    remaining: 25,
    refillDate: '2025-01-25',
    prescriber: 'Dr. Koval',
    status: 'active',
  },
  {
    id: '3',
    name: 'Aspirin',
    dosage: '100mg',
    instructions: '1 tablet once daily with food',
    quantity: 30,
    remaining: 28,
    refillDate: '2025-02-01',
    prescriber: 'Dr. Koval',
    status: 'active',
  },
];

const sampleAlerts: HealthAlert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Blood Pressure Check Overdue',
    message: 'Your last blood pressure reading was 7 days ago.',
    action: '/appointments/new',
    actionLabel: 'Schedule Check-up',
  },
  {
    id: '2',
    type: 'info',
    title: 'Prescription Refill Reminder',
    message: 'Metformin refill needed in 5 days.',
    action: '/prescriptions/refill/1',
    actionLabel: 'Request Refill',
  },
  {
    id: '3',
    type: 'info',
    title: 'Annual Checkup Due',
    message: 'Your annual physical examination is due in 30 days.',
    action: '/appointments/new',
    actionLabel: 'Schedule',
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Header Component
const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">IVYAR Medical</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Петренко І.</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar: React.FC<{ isOpen: boolean; currentPage: string; onNavigate: (page: string) => void }> = ({
  isOpen,
  currentPage,
  onNavigate,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', labelUk: 'Головна', icon: Home },
    { id: 'appointments', label: 'Appointments', labelUk: 'Записи', icon: Calendar },
    { id: 'records', label: 'Medical Records', labelUk: 'Медкартка', icon: FileText },
    { id: 'prescriptions', label: 'Prescriptions', labelUk: 'Рецепти', icon: Pill },
    { id: 'programs', label: 'Programs', labelUk: 'Програми', icon: Activity },
    { id: 'disability', label: 'Disability', labelUk: 'Інвалідність', icon: Heart },
    { id: 'settings', label: 'Settings', labelUk: 'Налаштування', icon: Settings },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-4 lg:pt-6">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.labelUk}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
            <Phone className="w-4 h-4" />
            <span>Екстрена допомога</span>
          </div>
          <p className="text-2xl font-bold text-red-600">103</p>
          <p className="text-xs text-red-600 mt-1">Гаряча лінія 24/7</p>
        </div>
      </div>
    </aside>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel?: string;
  status?: 'normal' | 'warning' | 'critical';
  onClick?: () => void;
}> = ({ icon, label, value, sublabel, status = 'normal', onClick }) => {
  const statusColors = {
    normal: 'bg-green-50 text-green-600',
    warning: 'bg-amber-50 text-amber-600',
    critical: 'bg-red-50 text-red-600',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${statusColors[status]}`}>{icon}</div>
        {sublabel && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}>
            {sublabel}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

// Health Alert Component
const HealthAlertCard: React.FC<{ alert: HealthAlert; onDismiss: (id: string) => void }> = ({
  alert,
  onDismiss,
}) => {
  const typeStyles = {
    critical: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconStyles = {
    critical: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Bell className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className={`p-4 rounded-lg border ${typeStyles[alert.type]} flex items-start gap-3`}>
      {iconStyles[alert.type]}
      <div className="flex-1">
        <p className="font-medium">{alert.title}</p>
        <p className="text-sm mt-1 opacity-80">{alert.message}</p>
      </div>
      <div className="flex items-center gap-2">
        {alert.actionLabel && (
          <button className="text-sm font-medium underline hover:no-underline">
            {alert.actionLabel}
          </button>
        )}
        <button onClick={() => onDismiss(alert.id)} className="p-1 hover:bg-white/50 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Appointment Card Component
const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
  const date = new Date(appointment.date);
  const dayName = date.toLocaleDateString('uk-UA', { weekday: 'short' });
  const dayNum = date.getDate();
  const month = date.toLocaleDateString('uk-UA', { month: 'short' });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-14 text-center">
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xs text-blue-600 uppercase">{month}</p>
            <p className="text-xl font-bold text-blue-700">{dayNum}</p>
            <p className="text-xs text-blue-600">{appointment.time}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-900">{appointment.specialty}</p>
              <p className="text-sm text-gray-600">{appointment.provider}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                appointment.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {appointment.status === 'confirmed' ? 'Підтверджено' : 'Заплановано'}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {appointment.location}, к.{appointment.room}
            </span>
            {appointment.type === 'telemedicine' && (
              <span className="flex items-center gap-1 text-blue-600">
                <Video className="w-4 h-4" />
                Відеозв'язок
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="flex-1 text-sm text-gray-600 hover:text-gray-900 py-1.5">
          Перенести
        </button>
        <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-1.5 font-medium">
          Деталі
        </button>
      </div>
    </div>
  );
};

// Medication Card Component
const MedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => {
  const remainingPercent = Math.round((medication.remaining / medication.quantity) * 100);
  const daysLeft = Math.round(
    (new Date(medication.refillDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Pill className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {medication.name} {medication.dosage}
            </p>
            <p className="text-sm text-gray-500">{medication.instructions}</p>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            medication.status === 'active'
              ? 'bg-green-100 text-green-700'
              : medication.status === 'refill-needed'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {medication.status === 'active'
            ? 'Активний'
            : medication.status === 'refill-needed'
            ? 'Потрібен рецепт'
            : 'Закінчився'}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Залишок</span>
          <span className="text-gray-700">{remainingPercent}% ({daysLeft} днів)</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              remainingPercent > 50
                ? 'bg-green-500'
                : remainingPercent > 20
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${remainingPercent}%` }}
          ></div>
        </div>
      </div>

      {medication.status === 'refill-needed' && (
        <div className="mt-3 p-2 bg-amber-50 rounded-lg flex items-center gap-2 text-amber-700 text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Замовте до {new Date(medication.refillDate).toLocaleDateString('uk-UA')}</span>
        </div>
      )}

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="flex-1 text-sm text-gray-600 hover:text-gray-900 py-1.5">
          Інструкція
        </button>
        <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-1.5 font-medium flex items-center justify-center gap-1">
          <RefreshCw className="w-4 h-4" />
          Замовити
        </button>
      </div>
    </div>
  );
};

// Service Card for Appointment Booking
const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="p-3 bg-blue-50 rounded-lg w-fit group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </button>
  );
};

// ============================================================================
// MAIN PAGES
// ============================================================================

// Dashboard Page
const DashboardPage: React.FC = () => {
  const [alerts, setAlerts] = useState(sampleAlerts);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Доброго дня, Іване! 👋</h1>
        <p className="text-gray-500 mt-1">Ваш медичний кабінет</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Наступний запис"
          value="5 січня, 10:00"
          sublabel="Кардіологія"
          status="normal"
        />
        <StatCard
          icon={<Pill className="w-5 h-5" />}
          label="Активні ліки"
          value="3 препарати"
          sublabel="1 потребує"
          status="warning"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Нові результати"
          value="2 аналізи"
          sublabel="Норма"
          status="normal"
        />
      </div>

      {/* Health Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Сповіщення</h2>
          {alerts.map((alert) => (
            <HealthAlertCard key={alert.id} alert={alert} onDismiss={dismissAlert} />
          ))}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Найближчі записи</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Всі записи
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {sampleAppointments.slice(0, 2).map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
          <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Записатися на прийом
          </button>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Мої ліки</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Всі рецепти
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {sampleMedications.slice(0, 2).map((med) => (
            <MedicationCard key={med.id} medication={med} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold">Швидкі дії</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[
            { icon: <Calendar className="w-5 h-5" />, label: 'Новий запис' },
            { icon: <RefreshCw className="w-5 h-5" />, label: 'Замовити ліки' },
            { icon: <FileText className="w-5 h-5" />, label: 'Мої аналізи' },
            { icon: <Video className="w-5 h-5" />, label: 'Телемедицина' },
          ].map((action, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Appointments Page
const AppointmentsPage: React.FC = () => {
  const [view, setView] = useState<'upcoming' | 'past' | 'book'>('upcoming');

  const services = [
    { icon: <Stethoscope className="w-6 h-6 text-blue-600" />, title: 'Терапевт', description: 'Загальний огляд, консультація' },
    { icon: <Heart className="w-6 h-6 text-red-500" />, title: 'Кардіологія', description: 'Серце, тиск' },
    { icon: <Brain className="w-6 h-6 text-purple-500" />, title: 'Неврологія', description: 'Нервова система' },
    { icon: <Bone className="w-6 h-6 text-orange-500" />, title: 'Ортопедія', description: "Кістки, суглоби" },
    { icon: <Activity className="w-6 h-6 text-green-500" />, title: 'Реабілітація', description: 'Відновлення' },
    { icon: <Eye className="w-6 h-6 text-cyan-500" />, title: 'Офтальмологія', description: 'Зір' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Записи на прийом</h1>
        <button
          onClick={() => setView('book')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новий запис
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'upcoming', label: 'Майбутні' },
          { id: 'past', label: 'Минулі' },
          { id: 'book', label: 'Записатися' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id as any)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              view === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'book' ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Оберіть спеціальність</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                icon={service.icon}
                title={service.title}
                description={service.description}
                onClick={() => {}}
              />
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">Телемедицина</h3>
              <p className="text-sm text-blue-700">Відеоконсультації доступні для терапії та психології</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Записатися
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sampleAppointments
            .filter((a) => (view === 'upcoming' ? a.status !== 'completed' : a.status === 'completed'))
            .map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
        </div>
      )}
    </div>
  );
};

// Prescriptions Page
const PrescriptionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Мої рецепти</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'active', label: 'Активні (3)' },
          { id: 'refill', label: 'Потребують (1)', highlight: true },
          { id: 'history', label: 'Історія' },
        ].map((tab, i) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              i === 0
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.highlight && (
              <span className="ml-2 w-2 h-2 bg-amber-500 rounded-full inline-block"></span>
            )}
          </button>
        ))}
      </div>

      {/* Medications Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {sampleMedications.map((med) => (
          <MedicationCard key={med.id} medication={med} />
        ))}
      </div>

      {/* Pharmacy Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-3">Моя аптека</h3>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <Building className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Військова аптека №12</p>
            <p className="text-sm text-gray-500 mt-1">вул. Хрещатик, 15, Київ</p>
            <p className="text-sm text-gray-500">Пн-Пт: 8:00-20:00 | Сб: 9:00-18:00</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">Змінити</button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

const MedicalProgram: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'appointments':
        return <AppointmentsPage />;
      case 'prescriptions':
        return <PrescriptionsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            setSidebarOpen(false);
          }}
        />
        
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 max-w-6xl">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default MedicalProgram;
