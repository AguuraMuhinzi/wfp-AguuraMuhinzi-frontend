import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  GraduationCap,
  FileBarChart,
  UserCog,
  Globe,
  Bell,
  Search,
  Settings,
  Shield,
  Building2,
  Users,
  BarChart3,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { FiMessageCircle } from "react-icons/fi";

const menuItems = [
    {
        title: "Overview",
        icon: Building2,
        href: "/admin/overview",
        badge: "24",
        // description: "Manage agricultural cooperatives",
      },
  // Removed Cooperatives and Academy menu items
  {
    title: "User Management",
    icon: UserCog,
    href: "/admin-dashboard/users",
    badge: null,
    // description: "System users & permissions",
  },
  {
    title: "Price Management",
    icon: Package,
    href: "/admin-dashboard/price",
    badge: null,
    // description: "Upload and manage reference prices",
  },
  {
    title: "Analytics",
    icon: FileBarChart,
    href: "/admin-dashboard/analytics",
    badge: null,
    description: "Analytics & reporting",
  },

  {
    title: "Messages",
    icon: FiMessageCircle,
    href: "/admin-dashboard/list_messages",
    badge: null,
    description: "Read and answer messages from users",
  },
];

// Badge component
const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Button component
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    outline: "border border-gray-300 bg-white hover:bg-gray-50"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Input component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Avatar component
const Avatar = ({ children, className = "" }) => {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  );
};

const AvatarImage = ({ src, alt, className = "" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full ${className}`}
    />
  );
};

const AvatarFallback = ({ children, className = "" }) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}>
      {children}
    </div>
  );
};

// Dropdown components
const DropdownMenu = ({ children }) => <div className="relative">{children}</div>;
const DropdownMenuTrigger = ({ children, asChild, ...props }) => {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <button {...props}>{children}</button>;
};
const DropdownMenuContent = ({ children, align = "left", className = "" }) => (
  <div className={`absolute ${align === "end" ? "right-0" : "left-0"} top-full mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg z-50 ${className}`}>
    {children}
  </div>
);
const DropdownMenuLabel = ({ children, className = "" }) => (
  <div className={`px-3 py-2 text-sm font-semibold text-gray-900 ${className}`}>{children}</div>
);
const DropdownMenuItem = ({ children, className = "", ...props }) => (
  <button className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 ${className}`} {...props}>
    {children}
  </button>
);
const DropdownMenuSeparator = () => <div className="border-t border-gray-200 my-1" />;

function AppSidebar() {
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <img
            src={process.env.PUBLIC_URL + '/imgs/plant.png'}
            alt="Leaf Icon"
            className="w-8 h-8 text-green-500"
          />
          <div>
            <h1 className="text-xl font-bold text-green-600 flex items-center space-x-1">
              AguuraMuhinzi
            </h1>
            <p className="text-xs text-gray-500">World Food Programme</p>
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 py-6 flex flex-col justify-between">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 h-14 px-4 rounded-lg transition-colors ${
                location.pathname.startsWith(item.href)
                  ? 'bg-green-600 text-white shadow-md'
                  : 'hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs opacity-70">{item.description}</span>
              </div>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className="ml-auto h-5 w-5 rounded-full p-0 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// Dashboard Stats Cards
const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </p>
        )}
              </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
                </div>
              </div>
                </div>
);

// Recent Activity Component
const RecentActivity = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {[
        { type: 'success', message: 'New cooperative registered', time: '2 minutes ago', icon: CheckCircle },
        { type: 'info', message: 'Price data uploaded', time: '5 minutes ago', icon: Package },
        { type: 'warning', message: 'System maintenance scheduled', time: '1 hour ago', icon: AlertCircle },
        { type: 'info', message: 'Report generated', time: '2 hours ago', icon: FileBarChart }
      ].map((activity, index) => (
        <div key={index} className="flex items-center gap-3">
          <activity.icon className={`h-5 w-5 ${
            activity.type === 'success' ? 'text-green-600' :
            activity.type === 'warning' ? 'text-yellow-600' :
            'text-blue-600'
          }`} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
        </div>
      </div>
);

export default function AdminDashboard() {
  const location = useLocation();

  // Get admin username from localStorage
  const username = localStorage.getItem('username') || 'Admin';

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
              <p className="text-sm text-gray-600">Welcome back, {username}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

          {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard content here */}
          <Outlet />
          </main>
        </div>
      </div>
  );
}
  