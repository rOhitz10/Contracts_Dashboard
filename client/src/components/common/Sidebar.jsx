import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  BarChart3,
  FileBarChart,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contextApi/AuthContext";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {user,logout} = useAuth()
  
  // Define routes (you'll need to adjust these based on your app)
  const ROUTES = {
    // DASHBOARD: "/dashboard",
    CONTRACTS: "/dashboard",
    INSIGHTS: "/dashboard/insights",
    REPORTS: "/dashboard/reports",
    SETTINGS: "/dashboard/settings",
    LOGIN: "/login"
  };

  const items = [
    // {
    //   name: "Dashboard",
    //   icon: Home,
    //   path: ROUTES.DASHBOARD,
    //   role: "user"
    // },
    {
      name: "Contracts",
      icon: FileText,
      path: ROUTES.CONTRACTS,
      role: "user"
    },
    {
      name: "Insights",
      icon: BarChart3,
      path: ROUTES.INSIGHTS,
      role: "user"
    },
    {
      name: "Reports",
      icon: FileBarChart,
      path: ROUTES.REPORTS,
      role: "user"
    },
    {
      name: "Settings",
      icon: Settings,
      path: ROUTES.SETTINGS,
      role: "user"
    },
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 flex flex-col transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FileText size={30} className="text-blue-400" />
            {!isCollapsed && (
              <span className="text-xl font-bold">ContractHub</span>
            )}
          </motion.div>
          <button
            className="p-1 rounded-md hover:bg-gray-800 transition-colors"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Profile */}
        <motion.div
          className="flex items-center p-4 border-b border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold">
            {user.charAt(0)?.toUpperCase() || <User size={20} />}
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <h4 className="font-medium text-sm truncate">
                {user || "User"}
              </h4>
             
            </div>
          )}
        </motion.div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {items.map((item, index) => {
            if (item.role === "admin" && user?.role !== "admin") return null;

            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg mb-1 transition-colors relative
                    ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute left-0 inset-y-0 w-1 bg-white rounded-r"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </a>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div
          className="p-4 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </motion.div>
      </motion.div>

      {/* Main content offset for sidebar */}
      <div className={`${isCollapsed ? "lg:ml-20" : "lg:ml-64"} transition-margin duration-300`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
};