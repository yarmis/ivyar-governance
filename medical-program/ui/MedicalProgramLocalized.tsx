import React, { useState, createContext, useContext } from 'react';
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
  Globe,
} from 'lucide-react';

// ============================================================================
// LOCALIZATION
// ============================================================================

type Language = 'en' | 'uk';

interface Translations {
  // Header
  medicalProgram: string;
  notifications: string;
  
  // Navigation
  dashboard: string;
  appointments: string;
  medicalRecords: string;
  prescriptions: string;
  programs: string;
  disability: string;
  settings: string;
  
  // Emergency
  emergency: string;
  emergencyNumber: string;
  hotline24: string;
  
  // Dashboard
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  yourMedicalCabinet: string;
  nextAppointment: string;
  activeMedications: string;
  medications: string;
  newResults: string;
  tests: string;
  needsRefill: string;
  normal: string;
  
  // Alerts
  alertsTitle: string;
  bloodPressureOverdue: string;
  bloodPressureMessage: string;
  scheduleCheckup: string;
  refillReminder: string;
  refillMessage: string;
  requestRefill: string;
  annualCheckupDue: string;
  annualCheckupMessage: string;
  schedule: string;
  
  // Appointments
  upcomingAppointments: string;
  allAppointments: string;
  bookAppointment: string;
  newAppointment: string;
  upcoming: string;
  past: string;
  book: string;
  confirmed: string;
  scheduled: string;
  reschedule: string;
  details: string;
  selectSpecialty: string;
  telemedicine: string;
  telemedicineDesc: string;
  videoCall: string;
  
  // Specialties
  primaryCare: string;
  primaryCareDesc: string;
  cardiology: string;
  cardiologyDesc: string;
  neurology: string;
  neurologyDesc: string;
  orthopedics: string;
  orthopedicsDesc: string;
  rehabilitation: string;
  rehabilitationDesc: string;
  ophthalmology: string;
  ophthalmologyDesc: string;
  mentalHealth: string;
  mentalHealthDesc: string;
  dental: string;
  dentalDesc: string;
  laboratory: string;
  laboratoryDesc: string;
  
  // Prescriptions
  myPrescriptions: string;
  active: string;
  needsRefillTab: string;
  history: string;
  instructions: string;
  orderRefill: string;
  remaining: string;
  daysLeft: string;
  orderBy: string;
  myPharmacy: string;
  changePharmacy: string;
  
  // Medications
  tabletTwiceDaily: string;
  tabletOnceDaily: string;
  withMeals: string;
  inMorning: string;
  withFood: string;
  
  // Quick Actions
  quickActions: string;
  newAppointmentAction: string;
  orderMedication: string;
  myTests: string;
  
  // Common
  viewAll: string;
  view: string;
  cancel: string;
  room: string;
  clinic: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Header
    medicalProgram: 'IVYAR Medical',
    notifications: 'Notifications',
    
    // Navigation
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    medicalRecords: 'Medical Records',
    prescriptions: 'Prescriptions',
    programs: 'Programs',
    disability: 'Disability',
    settings: 'Settings',
    
    // Emergency
    emergency: 'Emergency',
    emergencyNumber: '103',
    hotline24: '24/7 Hotline',
    
    // Dashboard
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    yourMedicalCabinet: 'Your medical dashboard',
    nextAppointment: 'Next Appointment',
    activeMedications: 'Active Medications',
    medications: 'medications',
    newResults: 'New Results',
    tests: 'tests',
    needsRefill: 'needs refill',
    normal: 'Normal',
    
    // Alerts
    alertsTitle: 'Notifications',
    bloodPressureOverdue: 'Blood Pressure Check Overdue',
    bloodPressureMessage: 'Your last blood pressure reading was 7 days ago.',
    scheduleCheckup: 'Schedule Check-up',
    refillReminder: 'Prescription Refill Reminder',
    refillMessage: 'Metformin refill needed in 5 days.',
    requestRefill: 'Request Refill',
    annualCheckupDue: 'Annual Checkup Due',
    annualCheckupMessage: 'Your annual physical examination is due in 30 days.',
    schedule: 'Schedule',
    
    // Appointments
    upcomingAppointments: 'Upcoming Appointments',
    allAppointments: 'All Appointments',
    bookAppointment: 'Book an appointment',
    newAppointment: 'New Appointment',
    upcoming: 'Upcoming',
    past: 'Past',
    book: 'Book',
    confirmed: 'Confirmed',
    scheduled: 'Scheduled',
    reschedule: 'Reschedule',
    details: 'Details',
    selectSpecialty: 'Select Specialty',
    telemedicine: 'Telemedicine',
    telemedicineDesc: 'Video consultations available for primary care and mental health',
    videoCall: 'Video Call',
    
    // Specialties
    primaryCare: 'Primary Care',
    primaryCareDesc: 'General checkup, consultation',
    cardiology: 'Cardiology',
    cardiologyDesc: 'Heart, blood pressure',
    neurology: 'Neurology',
    neurologyDesc: 'Nervous system',
    orthopedics: 'Orthopedics',
    orthopedicsDesc: 'Bones, joints',
    rehabilitation: 'Rehabilitation',
    rehabilitationDesc: 'Recovery',
    ophthalmology: 'Ophthalmology',
    ophthalmologyDesc: 'Vision',
    mentalHealth: 'Mental Health',
    mentalHealthDesc: 'Counseling, PTSD',
    dental: 'Dental',
    dentalDesc: 'Oral health',
    laboratory: 'Laboratory',
    laboratoryDesc: 'Blood tests, diagnostics',
    
    // Prescriptions
    myPrescriptions: 'My Prescriptions',
    active: 'Active',
    needsRefillTab: 'Needs Refill',
    history: 'History',
    instructions: 'Instructions',
    orderRefill: 'Order Refill',
    remaining: 'Remaining',
    daysLeft: 'days left',
    orderBy: 'Order by',
    myPharmacy: 'My Pharmacy',
    changePharmacy: 'Change',
    
    // Medications
    tabletTwiceDaily: '1 tablet twice daily',
    tabletOnceDaily: '1 tablet once daily',
    withMeals: 'with meals',
    inMorning: 'in the morning',
    withFood: 'with food',
    
    // Quick Actions
    quickActions: 'Quick Actions',
    newAppointmentAction: 'New Appointment',
    orderMedication: 'Order Medication',
    myTests: 'My Tests',
    
    // Common
    viewAll: 'View All',
    view: 'View',
    cancel: 'Cancel',
    room: 'Room',
    clinic: 'Clinic',
  },
  
  uk: {
    // Header
    medicalProgram: 'IVYAR Медицина',
    notifications: 'Сповіщення',
    
    // Navigation
    dashboard: 'Головна',
    appointments: 'Записи',
    medicalRecords: 'Медкартка',
    prescriptions: 'Рецепти',
    programs: 'Програми',
    disability: 'Інвалідність',
    settings: 'Налаштування',
    
    // Emergency
    emergency: 'Екстрена допомога',
    emergencyNumber: '103',
    hotline24: 'Гаряча лінія 24/7',
    
    // Dashboard
    goodMorning: 'Доброго ранку',
    goodAfternoon: 'Доброго дня',
    goodEvening: 'Доброго вечора',
    yourMedicalCabinet: 'Ваш медичний кабінет',
    nextAppointment: 'Наступний запис',
    activeMedications: 'Активні ліки',
    medications: 'препаратів',
    newResults: 'Нові результати',
    tests: 'аналізи',
    needsRefill: 'потребує',
    normal: 'Норма',
    
    // Alerts
    alertsTitle: 'Сповіщення',
    bloodPressureOverdue: 'Перевірка тиску прострочена',
    bloodPressureMessage: 'Останній вимір тиску був 7 днів тому.',
    scheduleCheckup: 'Записатися',
    refillReminder: 'Нагадування про рецепт',
    refillMessage: 'Метформін потрібно замовити через 5 днів.',
    requestRefill: 'Замовити',
    annualCheckupDue: 'Час на огляд',
    annualCheckupMessage: 'Ваш щорічний огляд заплановано через 30 днів.',
    schedule: 'Записатися',
    
    // Appointments
    upcomingAppointments: 'Найближчі записи',
    allAppointments: 'Всі записи',
    bookAppointment: 'Записатися на прийом',
    newAppointment: 'Новий запис',
    upcoming: 'Майбутні',
    past: 'Минулі',
    book: 'Записатися',
    confirmed: 'Підтверджено',
    scheduled: 'Заплановано',
    reschedule: 'Перенести',
    details: 'Деталі',
    selectSpecialty: 'Оберіть спеціальність',
    telemedicine: 'Телемедицина',
    telemedicineDesc: 'Відеоконсультації доступні для терапії та психології',
    videoCall: 'Відеозв\'язок',
    
    // Specialties
    primaryCare: 'Терапевт',
    primaryCareDesc: 'Загальний огляд, консультація',
    cardiology: 'Кардіологія',
    cardiologyDesc: 'Серце, тиск',
    neurology: 'Неврологія',
    neurologyDesc: 'Нервова система',
    orthopedics: 'Ортопедія',
    orthopedicsDesc: 'Кістки, суглоби',
    rehabilitation: 'Реабілітація',
    rehabilitationDesc: 'Відновлення',
    ophthalmology: 'Офтальмологія',
    ophthalmologyDesc: 'Зір',
    mentalHealth: 'Психологія',
    mentalHealthDesc: 'Консультування, ПТСР',
    dental: 'Стоматологія',
    dentalDesc: 'Здоров\'я зубів',
    laboratory: 'Лабораторія',
    laboratoryDesc: 'Аналізи, діагностика',
    
    // Prescriptions
    myPrescriptions: 'Мої рецепти',
    active: 'Активні',
    needsRefillTab: 'Потребують',
    history: 'Історія',
    instructions: 'Інструкція',
    orderRefill: 'Замовити',
    remaining: 'Залишок',
    daysLeft: 'днів',
    orderBy: 'Замовте до',
    myPharmacy: 'Моя аптека',
    changePharmacy: 'Змінити',
    
    // Medications
    tabletTwiceDaily: '1 таблетка двічі на день',
    tabletOnceDaily: '1 таблетка раз на день',
    withMeals: 'під час їжі',
    inMorning: 'вранці',
    withFood: 'з їжею',
    
    // Quick Actions
    quickActions: 'Швидкі дії',
    newAppointmentAction: 'Новий запис',
    orderMedication: 'Замовити ліки',
    myTests: 'Мої аналізи',
    
    // Common
    viewAll: 'Всі',
    view: 'Переглянути',
    cancel: 'Скасувати',
    room: 'к.',
    clinic: 'Клініка',
  },
};

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'uk',
  setLanguage: () => {},
  t: translations.uk,
});

const useLanguage = () => useContext(LanguageContext);

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

interface HealthAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  titleKey: keyof Translations;
  messageKey: keyof Translations;
  actionLabelKey?: keyof Translations;
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
    specialty: 'cardiology',
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
    specialty: 'primaryCare',
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
    specialty: 'rehabilitation',
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
    instructions: 'tabletTwiceDaily',
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
    instructions: 'tabletOnceDaily',
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
    instructions: 'tabletOnceDaily',
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
    titleKey: 'bloodPressureOverdue',
    messageKey: 'bloodPressureMessage',
    actionLabelKey: 'scheduleCheckup',
  },
  {
    id: '2',
    type: 'info',
    titleKey: 'refillReminder',
    messageKey: 'refillMessage',
    actionLabelKey: 'requestRefill',
  },
  {
    id: '3',
    type: 'info',
    titleKey: 'annualCheckupDue',
    messageKey: 'annualCheckupMessage',
    actionLabelKey: 'schedule',
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Language Switcher
const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
          language === 'en'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('uk')}
        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
          language === 'uk'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        UA
      </button>
    </div>
  );
};

// Header Component
const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { t } = useLanguage();

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
          <span className="font-semibold text-gray-900">{t.medicalProgram}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Petrenko I.</span>
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
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', labelKey: 'dashboard' as keyof Translations, icon: Home },
    { id: 'appointments', labelKey: 'appointments' as keyof Translations, icon: Calendar },
    { id: 'records', labelKey: 'medicalRecords' as keyof Translations, icon: FileText },
    { id: 'prescriptions', labelKey: 'prescriptions' as keyof Translations, icon: Pill },
    { id: 'programs', labelKey: 'programs' as keyof Translations, icon: Activity },
    { id: 'disability', labelKey: 'disability' as keyof Translations, icon: Heart },
    { id: 'settings', labelKey: 'settings' as keyof Translations, icon: Settings },
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
              <span className="font-medium">{t[item.labelKey]}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
            <Phone className="w-4 h-4" />
            <span>{t.emergency}</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{t.emergencyNumber}</p>
          <p className="text-xs text-red-600 mt-1">{t.hotline24}</p>
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
  const { t } = useLanguage();

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
        <p className="font-medium">{t[alert.titleKey]}</p>
        <p className="text-sm mt-1 opacity-80">{t[alert.messageKey]}</p>
      </div>
      <div className="flex items-center gap-2">
        {alert.actionLabelKey && (
          <button className="text-sm font-medium underline hover:no-underline">
            {t[alert.actionLabelKey]}
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
  const { t, language } = useLanguage();
  const date = new Date(appointment.date);
  const locale = language === 'uk' ? 'uk-UA' : 'en-US';
  const dayNum = date.getDate();
  const month = date.toLocaleDateString(locale, { month: 'short' });
  
  const specialtyKey = appointment.specialty as keyof Translations;

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
              <p className="font-semibold text-gray-900">{t[specialtyKey] || appointment.specialty}</p>
              <p className="text-sm text-gray-600">{appointment.provider}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                appointment.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {appointment.status === 'confirmed' ? t.confirmed : t.scheduled}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {appointment.location}, {t.room}{appointment.room}
            </span>
            {appointment.type === 'telemedicine' && (
              <span className="flex items-center gap-1 text-blue-600">
                <Video className="w-4 h-4" />
                {t.videoCall}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="flex-1 text-sm text-gray-600 hover:text-gray-900 py-1.5">
          {t.reschedule}
        </button>
        <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-1.5 font-medium">
          {t.details}
        </button>
      </div>
    </div>
  );
};

// Medication Card Component
const MedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => {
  const { t, language } = useLanguage();
  const remainingPercent = Math.round((medication.remaining / medication.quantity) * 100);
  const daysLeft = Math.round(
    (new Date(medication.refillDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const locale = language === 'uk' ? 'uk-UA' : 'en-US';

  const instructionKey = medication.instructions as keyof Translations;

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
            <p className="text-sm text-gray-500">{t[instructionKey] || medication.instructions}</p>
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
            ? t.active
            : medication.status === 'refill-needed'
            ? t.needsRefillTab
            : 'Expired'}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">{t.remaining}</span>
          <span className="text-gray-700">{remainingPercent}% ({daysLeft} {t.daysLeft})</span>
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
          <span>{t.orderBy} {new Date(medication.refillDate).toLocaleDateString(locale)}</span>
        </div>
      )}

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="flex-1 text-sm text-gray-600 hover:text-gray-900 py-1.5">
          {t.instructions}
        </button>
        <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 py-1.5 font-medium flex items-center justify-center gap-1">
          <RefreshCw className="w-4 h-4" />
          {t.orderRefill}
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
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState(sampleAlerts);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, Ivan! 👋</h1>
        <p className="text-gray-500 mt-1">{t.yourMedicalCabinet}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label={t.nextAppointment}
          value="Jan 5, 10:00"
          sublabel={t.cardiology}
          status="normal"
        />
        <StatCard
          icon={<Pill className="w-5 h-5" />}
          label={t.activeMedications}
          value={`3 ${t.medications}`}
          sublabel={`1 ${t.needsRefill}`}
          status="warning"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label={t.newResults}
          value={`2 ${t.tests}`}
          sublabel={t.normal}
          status="normal"
        />
      </div>

      {/* Health Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">{t.alertsTitle}</h2>
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
            <h2 className="text-lg font-semibold text-gray-900">{t.upcomingAppointments}</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              {t.allAppointments}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {sampleAppointments.slice(0, 2).map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
          <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            {t.bookAppointment}
          </button>
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{t.prescriptions}</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              {t.viewAll}
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
        <h2 className="text-lg font-semibold">{t.quickActions}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[
            { icon: <Calendar className="w-5 h-5" />, labelKey: 'newAppointmentAction' as keyof Translations },
            { icon: <RefreshCw className="w-5 h-5" />, labelKey: 'orderMedication' as keyof Translations },
            { icon: <FileText className="w-5 h-5" />, labelKey: 'myTests' as keyof Translations },
            { icon: <Video className="w-5 h-5" />, labelKey: 'telemedicine' as keyof Translations },
          ].map((action, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              {action.icon}
              <span className="text-sm">{t[action.labelKey]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Appointments Page
const AppointmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<'upcoming' | 'past' | 'book'>('upcoming');

  const services = [
    { icon: <Stethoscope className="w-6 h-6 text-blue-600" />, titleKey: 'primaryCare' as keyof Translations, descKey: 'primaryCareDesc' as keyof Translations },
    { icon: <Heart className="w-6 h-6 text-red-500" />, titleKey: 'cardiology' as keyof Translations, descKey: 'cardiologyDesc' as keyof Translations },
    { icon: <Brain className="w-6 h-6 text-purple-500" />, titleKey: 'neurology' as keyof Translations, descKey: 'neurologyDesc' as keyof Translations },
    { icon: <Bone className="w-6 h-6 text-orange-500" />, titleKey: 'orthopedics' as keyof Translations, descKey: 'orthopedicsDesc' as keyof Translations },
    { icon: <Activity className="w-6 h-6 text-green-500" />, titleKey: 'rehabilitation' as keyof Translations, descKey: 'rehabilitationDesc' as keyof Translations },
    { icon: <Eye className="w-6 h-6 text-cyan-500" />, titleKey: 'ophthalmology' as keyof Translations, descKey: 'ophthalmologyDesc' as keyof Translations },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t.appointments}</h1>
        <button
          onClick={() => setView('book')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t.newAppointment}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'upcoming', labelKey: 'upcoming' as keyof Translations },
          { id: 'past', labelKey: 'past' as keyof Translations },
          { id: 'book', labelKey: 'book' as keyof Translations },
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
            {t[tab.labelKey]}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'book' ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.selectSpecialty}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <ServiceCard
                key={i}
                icon={service.icon}
                title={t[service.titleKey]}
                description={t[service.descKey]}
                onClick={() => {}}
              />
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">{t.telemedicine}</h3>
              <p className="text-sm text-blue-700">{t.telemedicineDesc}</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t.book}
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
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t.myPrescriptions}</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'active', label: `${t.active} (3)` },
          { id: 'refill', label: `${t.needsRefillTab} (1)`, highlight: true },
          { id: 'history', label: t.history },
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
        <h3 className="font-semibold text-gray-900 mb-3">{t.myPharmacy}</h3>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg border border-gray-200">
            <Building className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Military Pharmacy #12</p>
            <p className="text-sm text-gray-500 mt-1">15 Khreshchatyk St., Kyiv</p>
            <p className="text-sm text-gray-500">Mon-Fri: 8:00-20:00 | Sat: 9:00-18:00</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">{t.changePharmacy}</button>
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
  const [language, setLanguage] = useState<Language>('en');

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
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
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
    </LanguageContext.Provider>
  );
};

export default MedicalProgram;
